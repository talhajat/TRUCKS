import { ITruckRepository } from '../../domain/repositories/truck.repository';
import { GetAllTrucksResponseDto } from '../dtos/truck-response.dto';
export declare const TRUCK_REPOSITORY_TOKEN = "ITruckRepository";
export declare class GetAllTrucksUseCase {
    private readonly truckRepository;
    constructor(truckRepository: ITruckRepository);
    execute(): Promise<GetAllTrucksResponseDto>;
}
