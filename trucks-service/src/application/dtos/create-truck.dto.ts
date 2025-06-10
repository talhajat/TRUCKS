/**
 * CREATE TRUCK DTO
 * 
 * This defines the structure and validation rules for creating a new truck.
 * Think of this as the "data contract" between the frontend and backend.
 * It ensures the frontend sends us exactly the data we need in the right format.
 */

import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsPositive,
  Min,
  Max,
  Length,
  Matches
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Valid transmission types
 */
enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  AUTOMATED_MANUAL = 'automated_manual',
}

/**
 * Valid ownership types
 */
enum OwnershipType {
  OWNED = 'owned',
  LEASED = 'leased',
  RENTED = 'rented',
}

/**
 * Valid truck statuses - Simplified for two core features
 * Note: No "assigned" status since driver assignment is handled by driver-service
 */
enum TruckStatus {
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
}

/**
 * Valid distance units
 */
enum DistanceUnit {
  MILES = 'miles',
  KILOMETERS = 'kilometers',
}

export class CreateTruckDto {
  // ===== REQUIRED FIELDS =====
  
  @ApiProperty({ 
    description: 'Vehicle ID/Unit Number (e.g., T101, T102)', 
    example: 'T104' 
  })
  @IsString()
  @Length(3, 10, { message: 'Vehicle ID must be between 3 and 10 characters' })
  @Matches(/^[A-Z]\d{3,4}$/, { message: 'Vehicle ID must follow pattern: Letter followed by 3-4 digits (e.g., T101)' })
  vehicleId: string;

  @ApiProperty({ 
    description: 'Vehicle Identification Number (17 characters)', 
    example: 'VINTRUCK123XYZ456' 
  })
  @IsString()
  @Length(17, 17, { message: 'VIN must be exactly 17 characters' })
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'VIN contains invalid characters' })
  vin: string;

  @ApiProperty({ 
    description: 'Truck manufacturer', 
    example: 'Freightliner' 
  })
  @IsString()
  @Length(1, 50, { message: 'Make must be between 1 and 50 characters' })
  make: string;

  @ApiProperty({ 
    description: 'Truck model', 
    example: 'Cascadia' 
  })
  @IsString()
  @Length(1, 50, { message: 'Model must be between 1 and 50 characters' })
  model: string;

  @ApiProperty({ 
    description: 'Manufacturing year', 
    example: 2024 
  })
  @IsNumber()
  @Min(1900, { message: 'Year must be 1900 or later' })
  @Max(new Date().getFullYear() + 2, { message: 'Year cannot be more than 2 years in the future' })
  @Transform(({ value }) => parseInt(value))
  year: number;

  // ===== OPTIONAL BASIC FIELDS =====

  @ApiPropertyOptional({ 
    description: 'User-friendly name for the truck', 
    example: 'Unit 104' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiPropertyOptional({ 
    description: 'Truck color', 
    example: 'White' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  color?: string;

  // ===== ENGINE & POWERTRAIN =====

  @ApiPropertyOptional({ 
    description: 'Engine manufacturer', 
    example: 'Cummins' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  engineMake?: string;

  @ApiPropertyOptional({ 
    description: 'Engine model', 
    example: 'X15' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  engineModel?: string;

  @ApiPropertyOptional({ 
    description: 'Engine horsepower', 
    example: 500 
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  horsepower?: number;

  @ApiPropertyOptional({ 
    description: 'Transmission type', 
    enum: TransmissionType,
    example: TransmissionType.MANUAL 
  })
  @IsOptional()
  @IsEnum(TransmissionType)
  transmissionType?: TransmissionType;

  @ApiPropertyOptional({ 
    description: 'Number of gears', 
    example: 10 
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  numGears?: number;

  // ===== OWNERSHIP & FINANCIALS =====

  @ApiPropertyOptional({ 
    description: 'Ownership type', 
    enum: OwnershipType,
    example: OwnershipType.OWNED 
  })
  @IsOptional()
  @IsEnum(OwnershipType)
  ownershipType?: OwnershipType;

  @ApiPropertyOptional({ 
    description: 'Purchase or lease start date', 
    example: '2024-01-15' 
  })
  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @ApiPropertyOptional({ 
    description: 'Lease end date (if leased)', 
    example: '2027-01-15' 
  })
  @IsOptional()
  @IsDateString()
  leaseEndDate?: string;

  @ApiPropertyOptional({ 
    description: 'Purchase price or lease cost', 
    example: 150000 
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  purchasePrice?: number;

  // ===== REGISTRATION & COMPLIANCE =====

  @ApiPropertyOptional({ 
    description: 'License plate number', 
    example: 'TRUCK123' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  licensePlate?: string;

  @ApiPropertyOptional({ 
    description: 'Issuing state/province code', 
    example: 'MI' 
  })
  @IsOptional()
  @IsString()
  @Length(2, 3)
  issuingState?: string;

  @ApiPropertyOptional({ 
    description: 'Registration expiration date', 
    example: '2025-12-31' 
  })
  @IsOptional()
  @IsDateString()
  registrationExp?: string;

  @ApiPropertyOptional({ 
    description: 'Insurance policy number', 
    example: 'POL123456789' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  insurancePolicy?: string;

  @ApiPropertyOptional({ 
    description: 'Insurance expiration date', 
    example: '2025-06-30' 
  })
  @IsOptional()
  @IsDateString()
  insuranceExp?: string;

  @ApiPropertyOptional({ 
    description: 'Jurisdiction', 
    example: 'IFTA' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  jurisdiction?: string;

  @ApiPropertyOptional({ 
    description: 'Gross Vehicle Weight Rating (lbs)', 
    example: 33000 
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  gvwr?: number;

  @ApiPropertyOptional({ 
    description: 'Gross Combined Weight Rating (lbs)', 
    example: 80000 
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  gcwr?: number;

  @ApiPropertyOptional({ 
    description: 'DOT Number', 
    example: 'USDOT 123456' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  dotNumber?: string;

  // ===== STATUS & LOCATION =====

  @ApiPropertyOptional({ 
    description: 'Initial truck status', 
    enum: TruckStatus,
    example: TruckStatus.AVAILABLE 
  })
  @IsOptional()
  @IsEnum(TruckStatus)
  initialStatus?: TruckStatus;

  @ApiPropertyOptional({ 
    description: 'Assigned yard/location ID', 
    example: 'loc1' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  assignedYard?: string;

  @ApiPropertyOptional({ 
    description: 'Initial odometer reading', 
    example: 1500 
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => value ? parseInt(value) : undefined)
  initialOdometer?: number;

  @ApiPropertyOptional({ 
    description: 'Odometer unit', 
    enum: DistanceUnit,
    example: DistanceUnit.MILES 
  })
  @IsOptional()
  @IsEnum(DistanceUnit)
  initialOdometerUnit?: DistanceUnit;

  @ApiPropertyOptional({ 
    description: 'Default assigned trailer ID', 
    example: 'TR502' 
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  defaultTrailerId?: string;
}