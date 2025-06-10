import { CreateTruckUseCase, GetAllTrucksUseCase } from '../../application/use-cases';
import { CreateTruckDto, CreateTruckResponseDto, GetAllTrucksResponseDto } from '../../application/dtos';
export declare class TrucksController {
    private readonly createTruckUseCase;
    private readonly getAllTrucksUseCase;
    constructor(createTruckUseCase: CreateTruckUseCase, getAllTrucksUseCase: GetAllTrucksUseCase);
    getAllTrucks(): Promise<GetAllTrucksResponseDto>;
    createTruck(createTruckDto: CreateTruckDto, files?: Express.Multer.File[]): Promise<CreateTruckResponseDto>;
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
}
