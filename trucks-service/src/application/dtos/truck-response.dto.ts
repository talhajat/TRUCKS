/**
 * TRUCK RESPONSE DTOs
 * 
 * These define the structure of data we send back to the frontend.
 * Think of these as the "response contracts" that ensure the frontend
 * gets exactly the data it expects in the right format.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Single truck item for list responses
 * This matches exactly what the frontend table expects
 */
export class TruckListItemDto {
  @ApiProperty({ 
    description: 'Unique truck identifier', 
    example: 'truck_123456789' 
  })
  id: string;

  @ApiProperty({ 
    description: 'User-friendly truck name', 
    example: 'Unit 101' 
  })
  name: string;

  @ApiProperty({ 
    description: 'Vehicle type (always truck)', 
    example: 'truck' 
  })
  type: 'truck';

  @ApiProperty({ 
    description: 'Current truck status', 
    example: 'available',
    enum: ['available', 'assigned', 'maintenance', 'out_of_service']
  })
  status: string;

  @ApiProperty({ 
    description: 'Current location of the truck', 
    example: 'Detroit Yard' 
  })
  currentLocation: string;

  @ApiProperty({ 
    description: 'Manufacturing year', 
    example: 2022 
  })
  year: number;

  @ApiProperty({ 
    description: 'Vehicle Identification Number', 
    example: 'VINTRUCK101XYZ' 
  })
  vin: string;

  @ApiProperty({ 
    description: 'Truck manufacturer', 
    example: 'Freightliner' 
  })
  make: string;

  @ApiProperty({ 
    description: 'Truck model', 
    example: 'Cascadia' 
  })
  model: string;

  @ApiPropertyOptional({ 
    description: 'ID of currently assigned driver', 
    example: 'd2' 
  })
  driverId?: string;

  @ApiProperty({ 
    description: 'Current odometer reading in miles', 
    example: 150000 
  })
  odometer: number;

  @ApiProperty({ 
    description: 'Current engine hours', 
    example: 5000 
  })
  engineHours: number;

  @ApiPropertyOptional({ 
    description: 'ID of currently attached trailer', 
    example: 'TR501' 
  })
  attachedTrailerId?: string;

  @ApiProperty({ 
    description: 'Last update timestamp', 
    example: '2024-01-15T10:30:00Z' 
  })
  lastUpdated: string;
}

/**
 * Response for getting all trucks (table data)
 */
export class GetAllTrucksResponseDto {
  @ApiProperty({ 
    description: 'Array of trucks',
    type: [TruckListItemDto]
  })
  data: TruckListItemDto[];
}

/**
 * Response for creating a truck
 */
export class CreateTruckResponseDto {
  @ApiProperty({ 
    description: 'Unique truck identifier', 
    example: 'truck_123456789' 
  })
  id: string;

  @ApiProperty({ 
    description: 'Vehicle ID/Unit Number', 
    example: 'T104' 
  })
  vehicleId: string;

  @ApiProperty({ 
    description: 'Vehicle Identification Number', 
    example: 'VINTRUCK123XYZ456' 
  })
  vin: string;

  @ApiProperty({ 
    description: 'Truck manufacturer', 
    example: 'Freightliner' 
  })
  make: string;

  @ApiProperty({ 
    description: 'Truck model', 
    example: 'Cascadia' 
  })
  model: string;

  @ApiProperty({ 
    description: 'Manufacturing year', 
    example: 2024 
  })
  year: number;

  @ApiProperty({ 
    description: 'Current truck status', 
    example: 'available' 
  })
  status: string;

  @ApiProperty({ 
    description: 'Success message', 
    example: 'Truck T104 created successfully' 
  })
  message: string;
}

/**
 * Standard error response
 */
export class ErrorResponseDto {
  @ApiProperty({ 
    description: 'HTTP status code', 
    example: 400 
  })
  statusCode: number;

  @ApiProperty({ 
    description: 'Error message', 
    example: 'Validation error. Please check your input.' 
  })
  message: string;

  @ApiProperty({ 
    description: 'Error type', 
    example: 'Bad Request' 
  })
  error: string;
}

/**
 * Success response wrapper
 */
export class SuccessResponseDto<T = any> {
  @ApiProperty({ 
    description: 'Success status', 
    example: true 
  })
  success: boolean;

  @ApiProperty({ 
    description: 'Response data' 
  })
  data: T;

  @ApiPropertyOptional({ 
    description: 'Optional message', 
    example: 'Operation completed successfully' 
  })
  message?: string;
}