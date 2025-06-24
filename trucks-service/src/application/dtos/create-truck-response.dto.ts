import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for successful truck creation
 */
export class CreateTruckResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the created truck',
    example: 'truck_123456789'
  })
  id: string;

  @ApiProperty({
    description: 'The vehicle ID of the created truck',
    example: 'TRK001'
  })
  vehicleId: string;

  @ApiProperty({
    description: 'The VIN of the created truck',
    example: '1HGBH41JXMN109186'
  })
  vin: string;

  @ApiProperty({
    description: 'The make of the created truck',
    example: 'Freightliner'
  })
  make: string;

  @ApiProperty({
    description: 'The model of the created truck',
    example: 'Cascadia'
  })
  model: string;

  @ApiProperty({
    description: 'The year of the created truck',
    example: 2024
  })
  year: number;

  @ApiProperty({
    description: 'The status of the created truck',
    example: 'active'
  })
  status: string;

  @ApiProperty({
    description: 'Success message',
    example: 'Truck TRK001 created successfully'
  })
  message: string;
}