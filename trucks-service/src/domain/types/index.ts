/**
 * DOMAIN TYPES
 * 
 * These types are used within the domain layer and represent
 * domain concepts. They should not depend on any other layer.
 */

import { TruckStatus, TransmissionType, OwnershipType, OdometerUnit, Jurisdiction } from '../enums';

/**
 * Data required to create a truck in the domain
 */
export interface TruckCreationData {
  // Required fields
  vehicleId: string;
  vin: string;
  make: string;
  model: string;
  year: number;

  // Optional fields
  name?: string;
  color?: string;
  engineMake?: string;
  engineModel?: string;
  horsepower?: number;
  transmissionType?: TransmissionType;
  numGears?: number;
  ownershipType?: OwnershipType;
  purchaseDate?: Date;
  leaseEndDate?: Date;
  purchasePrice?: number;
  licensePlate?: string;
  issuingState?: string;
  registrationExp?: Date;
  insurancePolicy?: string;
  insuranceExp?: Date;
  jurisdiction?: Jurisdiction;
  gvwr?: number;
  gcwr?: number;
  dotNumber?: string;
  status?: TruckStatus;
  currentLocation?: string;
  assignedYardId?: string;
  odometer?: number;
  odometerUnit?: OdometerUnit;
  engineHours?: number;
  attachedTrailerId?: string;
}

/**
 * Data required to create a truck document
 */
export interface DocumentCreationData {
  documentType: string;
  fileName: string;
  filePath: string;
  fileSize?: number;
  mimeType?: string;
  description?: string;
  uploadedBy?: string;
}

/**
 * Report of trucks that need attention
 */
export interface TruckMaintenanceReport {
  trucksInMaintenance: any[];
  trucksOutOfService: any[];
  trucksMissingDocuments: any[];
  trucksWithHighMileage: any[];
}