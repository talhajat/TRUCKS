/**
 * GET ALL TRUCKS USE CASE
 * 
 * This use case handles retrieving all trucks for the frontend table display.
 * Think of this as the "data fetcher" that gets truck information from the database
 * and formats it exactly how the frontend expects to receive it.
 * 
 * This ensures the frontend gets properly formatted data for the trucks table.
 */

import { Injectable, Inject } from '@nestjs/common';
import { ITruckRepository } from '../../domain/repositories/truck.repository';
import { TruckListItemDto, GetAllTrucksResponseDto } from '../dtos/truck-response.dto';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

@Injectable()
export class GetAllTrucksUseCase {
  constructor(
    @Inject(TRUCK_REPOSITORY_TOKEN)
    private readonly truckRepository: ITruckRepository
  ) {}

  /**
   * Execute the get all trucks use case
   * This retrieves all trucks and formats them for the frontend
   */
  async execute(): Promise<GetAllTrucksResponseDto> {
    try {
      // Get all trucks from the repository
      const trucks = await this.truckRepository.findAll();

      // Convert domain entities to frontend format
      const truckListItems: TruckListItemDto[] = trucks.map(truck => ({
        id: truck.id,
        name: truck.name || `Unit ${truck.vehicleIdValue}`,
        type: 'truck' as const,
        status: truck.status,
        currentLocation: truck.currentLocation || 'Unknown Location',
        year: truck.year,
        vin: truck.vinValue,
        make: truck.make,
        model: truck.model,
        driverId: truck.currentDriverId,
        odometer: truck.odometer || 0,
        engineHours: truck.engineHours || 0,
        attachedTrailerId: truck.attachedTrailerId,
        lastUpdated: truck.lastUpdated.toISOString(),
      }));

      return {
        data: truckListItems,
      };
    } catch (error) {
      throw new Error(`Failed to retrieve trucks: ${error.message}`);
    }
  }
}