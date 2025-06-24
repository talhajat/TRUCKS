/**
 * TRUCK DOMAIN DTOs
 * 
 * These DTOs are used for communication between the application layer
 * and the domain layer. They represent the data structures needed
 * for domain operations.
 */

/**
 * Data transfer object for creating trucks in the domain
 */
export interface CreateTruckData {
  // Required fields
  vehicleId: string;
  vin: string;
  make: string;
  model: string;
  year: number;

  // Optional fields
  color?: string;
  engineMake?: string;
  engineModel?: string;
  horsepower?: number;
  transmissionType?: string;
  numGears?: number;
  ownershipType?: string;
  purchaseDate?: Date;
  leaseEndDate?: Date;
  purchasePrice?: number;
  licensePlate?: string;
  issuingState?: string;
  registrationExp?: Date;
  insurancePolicy?: string;
  insuranceExp?: Date;
  jurisdiction?: string;
  gvwr?: number;
  gcwr?: number;
  dotNumber?: string;
  status?: string;
  currentLocation?: string;
  assignedYardId?: string;
  odometer?: number;
  odometerUnit?: string;
  engineHours?: number;
  currentDriverId?: string;
  attachedTrailerId?: string;
  currentLoadId?: string;
}

/**
 * Data transfer object for creating truck documents
 */
export interface CreateDocumentData {
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
export interface TruckAttentionReport {
  trucksInMaintenance: any[];
  trucksOutOfService: any[];
  trucksMissingDocuments: any[];
  trucksWithHighMileage: any[];
}