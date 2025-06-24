/**
 * TRUCK DETAILS RESPONSE DTO
 * 
 * This DTO defines the structure for returning truck details,
 * specifically for the Basic Information section on the truck profile page.
 * It includes only the 14 fields required for the Basic Information display.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TruckDetailsResponseDto {
  @ApiProperty({ 
    description: 'Vehicle Identification Number', 
    example: 'VINTRUCK101XYZ' 
  })
  vin: string;

  @ApiProperty({ 
    description: 'Manufacturing year', 
    example: 2022 
  })
  year: number;

  @ApiPropertyOptional({ 
    description: 'Truck color', 
    example: 'White' 
  })
  color: string | null;

  @ApiPropertyOptional({ 
    description: 'Engine manufacturer', 
    example: 'Cummins' 
  })
  engineMake: string | null;

  @ApiPropertyOptional({ 
    description: 'Engine model', 
    example: 'X15' 
  })
  engineModel: string | null;

  @ApiPropertyOptional({ 
    description: 'Engine horsepower', 
    example: 500 
  })
  horsepower: number | null;

  @ApiPropertyOptional({ 
    description: 'Transmission type', 
    example: 'manual' 
  })
  transmissionType: string | null;

  @ApiPropertyOptional({ 
    description: 'Number of gears', 
    example: 10 
  })
  numGears: number | null;

  @ApiPropertyOptional({ 
    description: 'Ownership type', 
    example: 'owned' 
  })
  ownershipType: string | null;

  @ApiPropertyOptional({ 
    description: 'Purchase or lease start date', 
    example: '2024-01-15' 
  })
  purchaseDate: string | null;

  @ApiPropertyOptional({ 
    description: 'Purchase price or lease cost', 
    example: 150000 
  })
  purchasePrice: number | null;

  @ApiPropertyOptional({ 
    description: 'Gross Vehicle Weight Rating (lbs)', 
    example: 33000 
  })
  gvwr: number | null;

  @ApiPropertyOptional({ 
    description: 'Gross Combined Weight Rating (lbs)', 
    example: 80000 
  })
  gcwr: number | null;

  @ApiPropertyOptional({ 
    description: 'Jurisdiction', 
    example: 'IFTA' 
  })
  jurisdiction: string;
}