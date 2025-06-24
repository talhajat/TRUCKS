/**
 * TRUCK TABLE RESPONSE DTO
 * 
 * This DTO formats truck data for display in the trucks table.
 * It implements the EXACT field mapping requirements:
 * 
 * Table Column → Data Source:
 * - ID/UNIT → vehicleId
 * - MAKE & MODEL → make + model (combined)
 * - YEAR → year
 * - VIN → vin
 * - STATUS → status
 * - CURRENT DRIVER → Always "N/A"
 * - ATTACHED TRAILER → attachedTrailerId or "None"
 * - CURRENT LOCATION → currentLocation
 * - ODOMETER/ENG HRS → Format: "X mi/NA" (engine hours always NA)
 */

import { ApiProperty } from '@nestjs/swagger';

export class TruckTableResponseDto {
  @ApiProperty({ 
    description: 'Truck ID from database',
    example: 'truck_123456789_abcdefghi' 
  })
  id: string;

  @ApiProperty({
    description: 'Vehicle ID/Unit Number for ID/UNIT column',
    example: 'T104'
  })
  unitNumber: string; // Maps to vehicleId - clearer than using 'name'

  @ApiProperty({ 
    description: 'Truck type (always "truck")',
    example: 'truck' 
  })
  type: 'truck' = 'truck';

  @ApiProperty({
    description: 'Truck status for STATUS column',
    example: 'available',
    enum: ['available', 'maintenance', 'out-of-service']  // Frontend expects hyphenated format
  })
  status: string;

  @ApiProperty({ 
    description: 'Current location for CURRENT LOCATION column',
    example: 'Main Yard' 
  })
  currentLocation: string | null;

  @ApiProperty({ 
    description: 'Manufacturing year for YEAR column',
    example: 2024 
  })
  year: number;

  @ApiProperty({ 
    description: 'VIN for VIN column',
    example: 'VINTRUCK123XYZ456' 
  })
  vin: string;

  @ApiProperty({ 
    description: 'Manufacturer for MAKE & MODEL column (part 1)',
    example: 'Freightliner' 
  })
  make: string;

  @ApiProperty({ 
    description: 'Model for MAKE & MODEL column (part 2)',
    example: 'Cascadia' 
  })
  model: string;

  @ApiProperty({ 
    description: 'Driver ID - always null (shows as "N/A" in table)',
    example: null 
  })
  driverId: null = null;

  @ApiProperty({ 
    description: 'Odometer reading in miles',
    example: 15000 
  })
  odometer: number | null;

  @ApiProperty({ 
    description: 'Engine hours - always null (shows as "NA" in table)',
    example: null 
  })
  engineHours: null = null;

  @ApiProperty({ 
    description: 'Attached trailer ID for ATTACHED TRAILER column',
    example: 'TR502',
    nullable: true
  })
  attachedTrailerId: string | null;

  @ApiProperty({ 
    description: 'Last updated timestamp',
    example: '2024-06-10T20:00:00Z' 
  })
  lastUpdated: string;

  /**
   * Create a TruckTableResponseDto from domain data
   */
  static fromDomain(truck: any): TruckTableResponseDto {
    const dto = new TruckTableResponseDto();
    
    // Core fields
    dto.id = truck.id;
    dto.unitNumber = truck.vehicleId?.value || truck.vehicleId || truck.vehicleIdValue; // Extract value from value object
    dto.type = 'truck';
    dto.status = truck.status;
    dto.currentLocation = truck.currentLocation || truck.assignedYardId || null;
    
    // Vehicle details
    dto.year = truck.year;
    dto.vin = truck.vin?.value || truck.vin || truck.vinValue; // Extract value from value object
    dto.make = truck.make;
    dto.model = truck.model;
    
    // Always null/fixed values
    dto.driverId = null; // Always shows as "N/A" in table
    dto.engineHours = null; // Always shows as "NA" in table
    
    // Operational data
    dto.odometer = truck.odometer || null;
    dto.attachedTrailerId = truck.attachedTrailerId || null;
    
    // Timestamp
    dto.lastUpdated = truck.lastUpdated?.toISOString() || new Date().toISOString();
    
    return dto;
  }

  /**
   * Create array of DTOs from domain data
   */
  static fromDomainArray(trucks: any[]): TruckTableResponseDto[] {
    return trucks.map(truck => TruckTableResponseDto.fromDomain(truck));
  }
}