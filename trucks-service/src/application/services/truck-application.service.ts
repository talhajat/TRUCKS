/**
 * TRUCK APPLICATION SERVICE
 *
 * This service handles application-level orchestration and coordination.
 * It uses domain entities, value objects, and services to implement use cases.
 * This is where we coordinate between the domain layer and infrastructure layer.
 */

import { Injectable, Inject } from '@nestjs/common';
import { Truck, TruckProps } from '../../domain/entities/truck.entity';
import { VehicleId } from '../../domain/value-objects/vehicle-id.vo';
import { VIN } from '../../domain/value-objects/vin.vo';
import { ITruckRepository } from '../../domain/repositories/truck.repository';
import { CreateTruckData } from '../dtos/truck-domain.dto';
import {
  TruckStatus,
  TransmissionType,
  OwnershipType,
  OdometerUnit,
  Jurisdiction
} from '../../domain/enums';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

/**
 * Application service for truck operations
 * This orchestrates use cases by coordinating domain and infrastructure
 */
@Injectable()
export class TruckApplicationService {
  constructor(
    @Inject(TRUCK_REPOSITORY_TOKEN)
    private readonly truckRepository: ITruckRepository
  ) {}

  /**
   * Create a new truck with business validation
   * This orchestrates the truck creation process
   */
  async createTruck(truckData: CreateTruckData): Promise<Truck> {
    // Create value objects with validation
    const vehicleId = VehicleId.create(truckData.vehicleId);
    const vin = VIN.create(truckData.vin);

    // Business rule: Vehicle ID must be unique
    const existingTruckByVehicleId = await this.truckRepository.existsByVehicleId(vehicleId);
    if (existingTruckByVehicleId) {
      throw new Error(`A truck with Vehicle ID ${vehicleId.value} already exists. Please use a different unit number.`);
    }

    // Business rule: VIN must be unique
    const existingTruckByVin = await this.truckRepository.existsByVin(vin);
    if (existingTruckByVin) {
      throw new Error(`A truck with VIN ${vin.value} already exists. Each truck must have a unique VIN.`);
    }

    // Create truck properties
    const truckProps: TruckProps = {
      vehicleId,
      vin,
      make: truckData.make,
      model: truckData.model,
      year: truckData.year,
      color: truckData.color,
      engineMake: truckData.engineMake,
      engineModel: truckData.engineModel,
      horsepower: truckData.horsepower,
      transmissionType: this.mapTransmissionType(truckData.transmissionType) || TransmissionType.MANUAL,
      numGears: truckData.numGears,
      ownershipType: this.mapOwnershipType(truckData.ownershipType) || OwnershipType.OWNED,
      purchaseDate: truckData.purchaseDate,
      leaseEndDate: truckData.leaseEndDate,
      purchasePrice: truckData.purchasePrice,
      licensePlate: truckData.licensePlate,
      issuingState: truckData.issuingState,
      registrationExp: truckData.registrationExp,
      insurancePolicy: truckData.insurancePolicy,
      insuranceExp: truckData.insuranceExp,
      jurisdiction: this.mapJurisdiction(truckData.jurisdiction) || Jurisdiction.IFTA,
      gvwr: truckData.gvwr,
      gcwr: truckData.gcwr,
      dotNumber: truckData.dotNumber,
      status: this.mapTruckStatus(truckData.status) || TruckStatus.AVAILABLE,
      currentLocation: truckData.currentLocation,
      assignedYardId: truckData.assignedYardId,
      odometer: truckData.odometer,
      odometerUnit: this.mapOdometerUnit(truckData.odometerUnit) || OdometerUnit.MILES,
      engineHours: truckData.engineHours,
      attachedTrailerId: truckData.attachedTrailerId,
      documents: [],
      lastUpdated: new Date(),
    };

    // Create the truck entity (this will validate all business rules)
    const truck = Truck.create(truckProps);

    // Save to repository
    await this.truckRepository.save(truck);

    return truck;
  }

  /**
   * Map string values from DTOs to domain enums
   */
  private mapTruckStatus(status?: string): TruckStatus | undefined {
    if (!status) return undefined;
    const mapping: Record<string, TruckStatus> = {
      'available': TruckStatus.AVAILABLE,
      'maintenance': TruckStatus.MAINTENANCE,
      'out-of-service': TruckStatus.OUT_OF_SERVICE,
    };
    return mapping[status];
  }

  private mapTransmissionType(type?: string): TransmissionType | undefined {
    if (!type) return undefined;
    const mapping: Record<string, TransmissionType> = {
      'manual': TransmissionType.MANUAL,
      'automatic': TransmissionType.AUTOMATIC,
      'automated_manual': TransmissionType.AUTOMATED_MANUAL,
    };
    return mapping[type];
  }

  private mapOwnershipType(type?: string): OwnershipType | undefined {
    if (!type) return undefined;
    const mapping: Record<string, OwnershipType> = {
      'owned': OwnershipType.OWNED,
      'leased': OwnershipType.LEASED,
      'rented': OwnershipType.RENTED,
    };
    return mapping[type];
  }

  private mapOdometerUnit(unit?: string): OdometerUnit | undefined {
    if (!unit) return undefined;
    const mapping: Record<string, OdometerUnit> = {
      'miles': OdometerUnit.MILES,
      'km': OdometerUnit.KM,
      'kilometers': OdometerUnit.KM, // Support both formats
    };
    return mapping[unit];
  }

  private mapJurisdiction(jurisdiction?: string): Jurisdiction | undefined {
    if (!jurisdiction) return undefined;
    const mapping: Record<string, Jurisdiction> = {
      'IFTA': Jurisdiction.IFTA,
      'Intrastate-MI': Jurisdiction.INTRASTATE_MI,
      'Intrastate-OH': Jurisdiction.INTRASTATE_OH,
      'Intrastate-IL': Jurisdiction.INTRASTATE_IL,
      'Exempt': Jurisdiction.EXEMPT,
      'Other': Jurisdiction.OTHER,
    };
    return mapping[jurisdiction];
  }
}