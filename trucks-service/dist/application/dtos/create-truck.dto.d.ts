declare enum TransmissionType {
    MANUAL = "manual",
    AUTOMATIC = "automatic",
    AUTOMATED_MANUAL = "automated_manual"
}
declare enum OwnershipType {
    OWNED = "owned",
    LEASED = "leased",
    RENTED = "rented"
}
declare enum TruckStatus {
    AVAILABLE = "available",
    MAINTENANCE = "maintenance",
    OUT_OF_SERVICE = "out_of_service"
}
declare enum DistanceUnit {
    MILES = "miles",
    KILOMETERS = "kilometers"
}
export declare class CreateTruckDto {
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
    transmissionType?: TransmissionType;
    numGears?: number;
    ownershipType?: OwnershipType;
    purchaseDate?: string;
    leaseEndDate?: string;
    purchasePrice?: number;
    licensePlate?: string;
    issuingState?: string;
    registrationExp?: string;
    insurancePolicy?: string;
    insuranceExp?: string;
    jurisdiction?: string;
    gvwr?: number;
    gcwr?: number;
    dotNumber?: string;
    initialStatus?: TruckStatus;
    assignedYard?: string;
    initialOdometer?: number;
    initialOdometerUnit?: DistanceUnit;
    defaultTrailerId?: string;
}
export {};
