/**
 * GET TRUCK BY ID USE CASE
 * 
 * This use case handles retrieving a single truck's details by its ID.
 * It fetches the truck from the repository and maps it to the response DTO
 * containing only the fields needed for the Basic Information section.
 */

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITruckRepository } from '../../domain/repositories';
import { TruckDetailsResponseDto } from '../dtos';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

@Injectable()
export class GetTruckByIdUseCase {
  constructor(
    @Inject(TRUCK_REPOSITORY_TOKEN)
    private readonly truckRepository: ITruckRepository
  ) {}

  /**
   * Execute the use case
   * @param id - The truck ID to retrieve
   * @returns TruckDetailsResponseDto with Basic Information fields
   */
  async execute(id: string): Promise<TruckDetailsResponseDto> {
    console.log(`📋 Fetching truck details for ID: ${id}`);

    // Find the truck by ID
    const truck = await this.truckRepository.findById(id);

    if (!truck) {
      console.error(`❌ Truck not found with ID: ${id}`);
      throw new NotFoundException(`Truck with ID ${id} not found`);
    }

    console.log(`✅ Found truck: ${truck.vehicleId.value}`);

    // Get all truck properties
    const truckProps = truck.props;

    // Map to response DTO with only Basic Information fields
    const response: TruckDetailsResponseDto = {
      vin: truck.vin.value,
      year: truck.year,
      color: truckProps.color || null,
      engineMake: truckProps.engineMake || null,
      engineModel: truckProps.engineModel || null,
      horsepower: truckProps.horsepower || null,
      transmissionType: truckProps.transmissionType ? truckProps.transmissionType.toLowerCase() : null,
      numGears: truckProps.numGears || null,
      ownershipType: truckProps.ownershipType ? truckProps.ownershipType.toLowerCase() : null,
      purchaseDate: truckProps.purchaseDate ? truckProps.purchaseDate.toISOString().split('T')[0] : null,
      purchasePrice: truckProps.purchasePrice ? Number(truckProps.purchasePrice) : null,
      gvwr: truckProps.gvwr || null,
      gcwr: truckProps.gcwr || null,
      jurisdiction: truckProps.jurisdiction
    };

    return response;
  }
}