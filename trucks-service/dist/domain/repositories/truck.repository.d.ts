import { Truck } from '../entities/truck.entity';
import { VehicleId } from '../value-objects/vehicle-id.vo';
import { VIN } from '../value-objects/vin.vo';
export interface ITruckRepository {
    save(truck: Truck): Promise<void>;
    update(truck: Truck): Promise<void>;
    findById(id: string): Promise<Truck | null>;
    findByVehicleId(vehicleId: VehicleId): Promise<Truck | null>;
    findByVin(vin: VIN): Promise<Truck | null>;
    findAll(): Promise<Truck[]>;
    findByStatus(status: string): Promise<Truck[]>;
    findByDriverId(driverId: string): Promise<Truck[]>;
    findByLocation(locationId: string): Promise<Truck[]>;
    delete(id: string): Promise<void>;
    existsByVehicleId(vehicleId: VehicleId): Promise<boolean>;
    existsByVin(vin: VIN): Promise<boolean>;
    findMaintenanceDue(odometerThreshold?: number, daysThreshold?: number): Promise<Truck[]>;
    findWithExpiringDocuments(daysAhead: number): Promise<Truck[]>;
    search(criteria: TruckSearchCriteria): Promise<Truck[]>;
}
export interface TruckSearchCriteria {
    make?: string;
    model?: string;
    year?: number;
    status?: string;
    locationId?: string;
    driverId?: string;
    minOdometer?: number;
    maxOdometer?: number;
    ownershipType?: string;
}
export interface TruckQueryResult {
    trucks: Truck[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface ITruckRepositoryWithPagination extends ITruckRepository {
    findAllPaginated(page: number, pageSize: number): Promise<TruckQueryResult>;
    searchPaginated(criteria: TruckSearchCriteria, page: number, pageSize: number): Promise<TruckQueryResult>;
}
