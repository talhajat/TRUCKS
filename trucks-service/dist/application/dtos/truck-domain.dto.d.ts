export interface CreateTruckData {
    vehicleId: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    name?: string;
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
export interface CreateDocumentData {
    documentType: string;
    fileName: string;
    filePath: string;
    fileSize?: number;
    mimeType?: string;
    description?: string;
    uploadedBy?: string;
}
export interface TruckAttentionReport {
    trucksInMaintenance: any[];
    trucksOutOfService: any[];
    trucksMissingDocuments: any[];
    trucksWithHighMileage: any[];
}
