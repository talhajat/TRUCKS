/**
 * TRUCK AGGREGATE ROOT - SIMPLIFIED FOR TRUCKS-SERVICE
 *
 * This entity supports EXACTLY TWO FEATURES:
 * 1. Truck Creation (form → database)
 * 2. Truck Display (database → table)
 *
 * Field mapping for table display:
 * - vehicleId → ID/UNIT column
 * - make + model → MAKE & MODEL column
 * - year → YEAR column
 * - vin → VIN column
 * - status → STATUS column
 * - "N/A" → CURRENT DRIVER column (always)
 * - attachedTrailerId → ATTACHED TRAILER column (show "None" if null)
 * - currentLocation → CURRENT LOCATION column
 * - odometer → ODOMETER/ENG HRS column (format: "X mi/NA")
 */

import { VehicleId } from '../value-objects/vehicle-id.vo';
import { VIN } from '../value-objects/vin.vo';
import { TruckDocument } from './truck-document.entity';

export interface TruckProps {
  // Identification & Basic Details (Required for table display)
  vehicleId: VehicleId;        // → ID/UNIT column
  name?: string;               // User-friendly name
  vin: VIN;                    // → VIN column
  make: string;                // → MAKE & MODEL column (part 1)
  model: string;               // → MAKE & MODEL column (part 2)
  year: number;                // → YEAR column
  color?: string;              // From form

  // Engine & Powertrain (from form)
  engineMake?: string;
  engineModel?: string;
  horsepower?: number;
  transmissionType: string;    // manual, automatic, automated_manual
  numGears?: number;

  // Ownership & Financials (from form)
  ownershipType: string;       // owned, leased, rented
  purchaseDate?: Date;
  leaseEndDate?: Date;
  purchasePrice?: number;

  // Registration & Compliance (from form)
  licensePlate?: string;
  issuingState?: string;
  registrationExp?: Date;
  insurancePolicy?: string;
  insuranceExp?: Date;
  jurisdiction: string;        // Default: IFTA
  gvwr?: number;              // Gross Vehicle Weight Rating (lbs)
  gcwr?: number;              // Gross Combined Weight Rating (lbs)
  dotNumber?: string;

  // Status & Location (Required for table display)
  status: string;             // → STATUS column (available, maintenance, out_of_service)
  currentLocation?: string;   // → CURRENT LOCATION column
  assignedYardId?: string;    // Simple ID reference (no foreign key)

  // Operational Data (Required for table display)
  odometer?: number;          // → ODOMETER/ENG HRS column (part 1)
  odometerUnit: string;       // miles, kilometers
  engineHours?: number;       // Always displayed as "NA" in table

  // Simple Trailer Reference (Required for table display)
  attachedTrailerId?: string; // → ATTACHED TRAILER column (show "None" if null)

  // Documents (from form uploads)
  documents?: TruckDocument[];

  // Audit
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdated: Date;
}

export class Truck {
  private constructor(
    private readonly _id: string,
    private _props: TruckProps,
  ) {}

  /**
   * FACTORY METHOD - Create new truck
   * This is the primary way to create a truck with business validation
   */
  public static create(props: TruckProps, id?: string): Truck {
    // Apply business defaults
    const truckProps: TruckProps = {
      ...props,
      status: props.status || 'available',
      transmissionType: props.transmissionType || 'manual',
      ownershipType: props.ownershipType || 'owned',
      odometerUnit: props.odometerUnit || 'miles',
      jurisdiction: props.jurisdiction || 'IFTA',
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      lastUpdated: props.lastUpdated || new Date(),
    };

    const truck = new Truck(id || Truck.generateId(), truckProps);
    
    // Validate business rules
    truck.validate();
    
    return truck;
  }

  /**
   * FACTORY METHOD - Reconstitute from persistence
   * Used when loading from database
   */
  public static fromPersistence(id: string, props: TruckProps): Truck {
    return new Truck(id, props);
  }

  /**
   * BUSINESS VALIDATION
   * Ensures all business invariants are maintained
   */
  private validate(): void {
    // Required fields validation - value objects handle their own validation
    if (!this._props.vehicleId) {
      throw new Error('Vehicle ID is required');
    }
    
    if (!this._props.vin) {
      throw new Error('VIN is required');
    }
    
    if (!this._props.make?.trim()) {
      throw new Error('Make is required');
    }
    
    if (!this._props.model?.trim()) {
      throw new Error('Model is required');
    }
    
    if (!this._props.year || this._props.year < 1900 || this._props.year > new Date().getFullYear() + 2) {
      throw new Error('Year must be between 1900 and 2 years in the future');
    }

    // VIN validation is handled by the VIN value object

    // Business rule: Lease end date must be after purchase date
    if (this._props.ownershipType === 'leased' && this._props.purchaseDate && this._props.leaseEndDate) {
      if (this._props.leaseEndDate <= this._props.purchaseDate) {
        throw new Error('Lease end date must be after purchase date');
      }
    }

    // Business rule: Odometer cannot be negative
    if (this._props.odometer !== undefined && this._props.odometer < 0) {
      throw new Error('Odometer cannot be negative');
    }

    // Business rule: Engine hours cannot be negative
    if (this._props.engineHours !== undefined && this._props.engineHours < 0) {
      throw new Error('Engine hours cannot be negative');
    }

    // Status validation
    const validStatuses = ['available', 'maintenance', 'out_of_service'];
    if (!validStatuses.includes(this._props.status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Transmission type validation
    const validTransmissions = ['manual', 'automatic', 'automated_manual'];
    if (!validTransmissions.includes(this._props.transmissionType)) {
      throw new Error(`Invalid transmission type. Must be one of: ${validTransmissions.join(', ')}`);
    }

    // Ownership type validation
    const validOwnership = ['owned', 'leased', 'rented'];
    if (!validOwnership.includes(this._props.ownershipType)) {
      throw new Error(`Invalid ownership type. Must be one of: ${validOwnership.join(', ')}`);
    }
  }

  /**
   * BUSINESS METHODS - SIMPLIFIED FOR TWO CORE FEATURES
   */

  /**
   * Attach trailer to truck (for default assigned trailer)
   */
  public attachTrailer(trailerId: string): void {
    if (this._props.status === 'maintenance' || this._props.status === 'out_of_service') {
      throw new Error('Cannot attach trailer to truck in maintenance or out of service');
    }
    
    this._props.attachedTrailerId = trailerId;
    this.updateTimestamp();
  }

  /**
   * Detach trailer from truck
   */
  public detachTrailer(): void {
    this._props.attachedTrailerId = undefined;
    this.updateTimestamp();
  }

  /**
   * Update odometer reading
   */
  public updateOdometer(newReading: number): void {
    if (newReading < 0) {
      throw new Error('Odometer reading cannot be negative');
    }
    
    if (this._props.odometer && newReading < this._props.odometer) {
      throw new Error('Odometer reading cannot decrease');
    }
    
    this._props.odometer = newReading;
    this.updateTimestamp();
  }

  /**
   * Change truck status
   */
  public changeStatus(newStatus: string): void {
    const validStatuses = ['available', 'maintenance', 'out_of_service'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    this._props.status = newStatus;
    this.updateTimestamp();
  }

  /**
   * Update truck's current location
   * This is like updating where the truck is parked or currently located
   */
  public updateLocation(location: string, yardId?: string): void {
    this._props.currentLocation = location;
    if (yardId) {
      this._props.assignedYardId = yardId;
    }
    this.updateTimestamp();
  }

  /**
   * DOCUMENT MANAGEMENT METHODS
   * These methods help manage paperwork and documents for each truck
   * (like title, registration, insurance papers, etc.)
   */

  /**
   * Add a new document to this truck
   * Think of this like filing a new piece of paperwork in the truck's folder
   */
  public addDocument(document: TruckDocument): void {
    // Create the documents folder if it doesn't exist yet
    if (!this._props.documents) {
      this._props.documents = [];
    }

    // Some documents should only have one copy (like vehicle title)
    // Check if we already have this type of document
    const uniqueDocTypes = ['vehicle_title', 'registration', 'insurance_certificate'];
    if (uniqueDocTypes.includes(document.documentType)) {
      const existingDoc = this._props.documents.find(d => d.documentType === document.documentType);
      if (existingDoc) {
        throw new Error(`This truck already has a ${document.getDocumentTypeName()}. Please remove the old one first.`);
      }
    }

    // Add the new document to the truck's file
    this._props.documents.push(document);
    this.updateTimestamp();
  }

  /**
   * Remove a document from this truck
   * Like taking a piece of paperwork out of the truck's folder
   */
  public removeDocument(documentId: string): void {
    // Check if truck has any documents
    if (!this._props.documents) {
      return;
    }

    // Find the document we want to remove
    const index = this._props.documents.findIndex(d => d.id === documentId);
    if (index === -1) {
      throw new Error('Cannot find that document in this truck\'s files');
    }

    // Remove the document from the truck's file
    this._props.documents.splice(index, 1);
    this.updateTimestamp();
  }

  /**
   * Get all documents of a specific type
   * Like asking "show me all the inspection reports for this truck"
   */
  public getDocumentsByType(documentType: string): TruckDocument[] {
    if (!this._props.documents) {
      return [];
    }
    return this._props.documents.filter(d => d.documentType === documentType);
  }

  /**
   * Get all documents for this truck
   * Like opening the truck's complete file folder
   */
  public getDocuments(): TruckDocument[] {
    return this._props.documents || [];
  }

  /**
   * Check if truck has all the required legal documents
   * Every truck needs: title, registration, and insurance to operate legally
   */
  public hasRequiredDocuments(): boolean {
    const requiredDocs = ['vehicle_title', 'registration', 'insurance_certificate'];
    if (!this._props.documents) {
      return false;
    }

    // Check that we have at least one document of each required type
    return requiredDocs.every(docType =>
      this._props.documents!.some(d => d.documentType === docType)
    );
  }

  /**
   * Check if truck is ready for operation
   * A truck is ready if it has all required documents and is in good status
   */
  public isReadyForOperation(): boolean {
    return this.hasRequiredDocuments() &&
           (this._props.status === 'available' || this._props.status === 'assigned');
  }

  /**
   * GETTERS - Public interface to access truck data
   */
  get id(): string {
    return this._id;
  }

  get vehicleId(): VehicleId {
    return this._props.vehicleId;
  }

  get vehicleIdValue(): string {
    return this._props.vehicleId.value;
  }

  get name(): string | undefined {
    return this._props.name;
  }

  get vin(): VIN {
    return this._props.vin;
  }

  get vinValue(): string {
    return this._props.vin.value;
  }

  get make(): string {
    return this._props.make;
  }

  get model(): string {
    return this._props.model;
  }

  get year(): number {
    return this._props.year;
  }

  get color(): string | undefined {
    return this._props.color;
  }

  get status(): string {
    return this._props.status;
  }

  get currentLocation(): string | undefined {
    return this._props.currentLocation;
  }

  get odometer(): number | undefined {
    return this._props.odometer;
  }

  get engineHours(): number | undefined {
    return this._props.engineHours;
  }

  get attachedTrailerId(): string | undefined {
    return this._props.attachedTrailerId;
  }

  get lastUpdated(): Date {
    return this._props.lastUpdated;
  }

  /**
   * Get all properties (for persistence)
   */
  get props(): TruckProps {
    return { ...this._props };
  }

  /**
   * PRIVATE HELPER METHODS
   */
  private updateTimestamp(): void {
    this._props.lastUpdated = new Date();
    this._props.updatedAt = new Date();
  }

  private static generateId(): string {
    return `truck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if truck is available
   */
  public isAvailable(): boolean {
    return this._props.status === 'available';
  }

  /**
   * Check if truck is in maintenance
   */
  public isInMaintenance(): boolean {
    return this._props.status === 'maintenance';
  }

  /**
   * Check if truck is out of service
   */
  public isOutOfService(): boolean {
    return this._props.status === 'out_of_service';
  }
}