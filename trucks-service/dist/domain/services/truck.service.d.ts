import { Truck } from '../entities/truck.entity';
import { ITruckRepository } from '../repositories/truck.repository';
import { CreateTruckData, CreateDocumentData, TruckAttentionReport } from '../../application/dtos/truck-domain.dto';
export declare const TRUCK_REPOSITORY_TOKEN = "ITruckRepository";
export declare class TruckDomainService {
    private readonly truckRepository;
    constructor(truckRepository: ITruckRepository);
    createTruck(truckData: CreateTruckData): Promise<Truck>;
    addDocumentsToTruck(truckId: string, documentData: CreateDocumentData[]): Promise<void>;
    updateTruckOdometer(truckId: string, newReading: number): Promise<void>;
    changeTruckStatus(truckId: string, newStatus: string): Promise<void>;
    getTrucksThatNeedAttention(): Promise<TruckAttentionReport>;
}
