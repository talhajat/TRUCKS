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
}