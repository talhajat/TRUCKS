/**
 * GET ALL TRUCKS USE CASE - SIMPLIFIED FOR TWO CORE FEATURES
 *
 * This use case handles retrieving all trucks for the frontend table display.
 * It implements the EXACT field mapping requirements:
 *
 * - ID/UNIT → vehicleId
 * - MAKE & MODEL → make + model
 * - YEAR → year
 * - VIN → vin
 * - STATUS → status
 * - CURRENT DRIVER → Always "N/A" (null in response)
 * - ATTACHED TRAILER → attachedTrailerId or "None"
 * - CURRENT LOCATION → currentLocation
 * - ODOMETER/ENG HRS → odometer + "NA" for engine hours
 */

import { Injectable, Inject } from '@nestjs/common';
import { ITruckRepository } from '../../domain/repositories/truck.repository';
import { TruckTableResponseDto } from '../dtos/truck-table-response.dto';

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
   * Returns data formatted for the trucks table display
   */
  async execute(): Promise<{ data: TruckTableResponseDto[] }> {
    try {
      // Get all trucks from the repository
      const trucks = await this.truckRepository.findAll();

      // Convert domain entities to table display format
      const truckTableData = trucks.map(truck => ({
        id: truck.id,
        name: truck.vehicleIdValue, // Frontend expects 'name' but we use vehicleId
        type: 'truck' as const,
        status: truck.status,
        currentLocation: truck.currentLocation || null,
        year: truck.year,
        vin: truck.vinValue,
        make: truck.make,
        model: truck.model,
        driverId: null, // Always null - displays as "N/A" in table
        odometer: truck.odometer || null,
        engineHours: null, // Always null - displays as "NA" in table
        attachedTrailerId: truck.attachedTrailerId || null,
        lastUpdated: truck.lastUpdated.toISOString(),
      }));

      return {
        data: truckTableData,
      };
    } catch (error) {
      throw new Error(`Failed to retrieve trucks: ${error.message}`);
    }
  }
}