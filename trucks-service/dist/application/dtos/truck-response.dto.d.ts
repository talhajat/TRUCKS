export declare class TruckListItemDto {
    id: string;
    name: string;
    type: 'truck';
    status: string;
    currentLocation: string;
    year: number;
    vin: string;
    make: string;
    model: string;
    driverId?: string;
    odometer: number;
    engineHours: number;
    attachedTrailerId?: string;
    lastUpdated: string;
}
export declare class GetAllTrucksResponseDto {
    data: TruckListItemDto[];
}
export declare class CreateTruckResponseDto {
    id: string;
    vehicleId: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    status: string;
    message: string;
}
export declare class ErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class SuccessResponseDto<T = any> {
    success: boolean;
    data: T;
    message?: string;
}
