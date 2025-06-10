/**
 * CREATE TRUCK USE CASE
 * 
 * This use case handles the business logic for creating a new truck.
 * Think of this as the "coordinator" that orchestrates all the steps needed
 * to create a truck, from validation to saving to the database.
 * 
 * This is where we convert frontend data into domain objects and coordinate
 * the creation process.
 */

import { Injectable, Inject } from '@nestjs/common';
import { TruckDomainService } from '../../domain/services/truck.service';
import { CreateTruckData } from '../dtos/truck-domain.dto';
import { ITruckRepository } from '../../domain/repositories/truck.repository';
import { VehicleId } from '../../domain/value-objects/vehicle-id.vo';
import { VIN } from '../../domain/value-objects/vin.vo';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

/**
 * Input data for creating a truck
 * This matches what the frontend sends us
 */
export interface CreateTruckInput {
  // Required fields
  vehicleId: string;
  vin: string;
  make: string;
  model: string;
  year: number;

  // Optional fields
  name?: string;
  color?: string;
  engineMake?: string;
  engineModel?: string;
  horsepower?: number;
  transmissionType?: string;
  numGears?: number;
  ownershipType?: string;
  purchaseDate?: string;    // ISO date string from frontend
  leaseEndDate?: string;    // ISO date string from frontend
  purchasePrice?: number;
  licensePlate?: string;
  issuingState?: string;
  registrationExp?: string; // ISO date string from frontend
  insurancePolicy?: string;
  insuranceExp?: string;    // ISO date string from frontend
  jurisdiction?: string;
  gvwr?: number;
  gcwr?: number;
  dotNumber?: string;
  initialStatus?: string;
  assignedYard?: string;    // Location ID from frontend
  initialOdometer?: number;
  initialOdometerUnit?: string;
  defaultTrailerId?: string;
}

/**
 * Output data after creating a truck
 * This is what we send back to the frontend
 */
export interface CreateTruckOutput {
  id: string;
  vehicleId: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: string;
  message: string;
}

@Injectable()
export class CreateTruckUseCase {
  constructor(
    private readonly truckDomainService: TruckDomainService
  ) {}

  /**
   * Execute the create truck use case
   * This is the main method that coordinates the truck creation process
   */
  async execute(input: CreateTruckInput): Promise<CreateTruckOutput> {
    try {
      // Convert frontend input to domain data
      const createTruckData = this.mapInputToDomainData(input);

      // Use domain service to create the truck
      const truck = await this.truckDomainService.createTruck(createTruckData);

      // Return success response
      return {
        id: truck.id,
        vehicleId: truck.vehicleIdValue,
        vin: truck.vinValue,
        make: truck.make,
        model: truck.model,
        year: truck.year,
        status: truck.status,
        message: `Truck ${truck.vehicleIdValue} created successfully`,
      };
    } catch (error) {
      // Re-throw with more context for the presentation layer
      throw new Error(`Failed to create truck: ${error.message}`);
    }
  }

  /**
   * Convert frontend input to domain data
   * This handles data transformation and type conversion
   */
  private mapInputToDomainData(input: CreateTruckInput): CreateTruckData {
    return {
      vehicleId: input.vehicleId,
      vin: input.vin,
      make: input.make,
      model: input.model,
      year: input.year,
      name: input.name,
      color: input.color,
      engineMake: input.engineMake,
      engineModel: input.engineModel,
      horsepower: input.horsepower,
      transmissionType: input.transmissionType,
      numGears: input.numGears,
      ownershipType: input.ownershipType,
      purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : undefined,
      leaseEndDate: input.leaseEndDate ? new Date(input.leaseEndDate) : undefined,
      purchasePrice: input.purchasePrice,
      licensePlate: input.licensePlate,
      issuingState: input.issuingState,
      registrationExp: input.registrationExp ? new Date(input.registrationExp) : undefined,
      insurancePolicy: input.insurancePolicy,
      insuranceExp: input.insuranceExp ? new Date(input.insuranceExp) : undefined,
      jurisdiction: input.jurisdiction,
      gvwr: input.gvwr,
      gcwr: input.gcwr,
      dotNumber: input.dotNumber,
      status: input.initialStatus,
      currentLocation: this.mapLocationIdToName(input.assignedYard),
      assignedYardId: input.assignedYard,
      odometer: input.initialOdometer,
      odometerUnit: input.initialOdometerUnit,
      engineHours: 0, // Default for new trucks
      attachedTrailerId: input.defaultTrailerId,
    };
  }

  /**
   * Map location ID to location name
   * This converts the frontend location ID to a human-readable name
   */
  private mapLocationIdToName(locationId?: string): string | undefined {
    if (!locationId) return undefined;

    const locationMap: Record<string, string> = {
      'loc1': 'Detroit Yard',
      'loc2': 'Chicago Terminal',
      'loc3': 'Shop - Cleveland',
      'loc4': 'Toledo Drop Yard',
      'loc5': 'Customer Site - Acme Corp',
    };

    return locationMap[locationId] || 'Unknown Location';
  }
}