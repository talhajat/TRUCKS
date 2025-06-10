import { TruckDomainService } from '../../domain/services/truck.service';
export declare const TRUCK_REPOSITORY_TOKEN = "ITruckRepository";
export interface CreateTruckInput {
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
    initialStatus?: string;
    assignedYard?: string;
    initialOdometer?: number;
    initialOdometerUnit?: string;
    defaultTrailerId?: string;
}
export interface CreateTruckOutput {
    id: string;
    vehicleId: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    status: string;
    message: string;
}
export declare class CreateTruckUseCase {
    private readonly truckDomainService;
    constructor(truckDomainService: TruckDomainService);
    execute(input: CreateTruckInput): Promise<CreateTruckOutput>;
    private mapInputToDomainData;
    private mapLocationIdToName;
}
