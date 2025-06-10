/**
 * TRUCK DOMAIN SERVICE
 *
 * This service contains business logic that doesn't naturally fit within a single entity.
 * Think of this as the "business rules coordinator" for truck operations.
 * It orchestrates complex operations that involve multiple entities or external systems.
 */

import { Injectable, Inject } from '@nestjs/common';
import { Truck, TruckProps } from '../entities/truck.entity';
import { TruckDocument } from '../entities/truck-document.entity';
import { VehicleId } from '../value-objects/vehicle-id.vo';
import { VIN } from '../value-objects/vin.vo';
import { ITruckRepository } from '../repositories/truck.repository';
import {
  CreateTruckData,
  CreateDocumentData,
  TruckAttentionReport
} from '../../application/dtos/truck-domain.dto';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

/**
 * Domain service for truck business operations
 * This handles complex business logic that spans multiple entities
 */
@Injectable()
export class TruckDomainService {
  constructor(
    @Inject(TRUCK_REPOSITORY_TOKEN)
    private readonly truckRepository: ITruckRepository
  ) {}

  /**
   * Create a new truck with business validation
   * This ensures all business rules are followed when creating a truck
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
      name: truckData.name || `Unit ${vehicleId.value}`,
      make: truckData.make,
      model: truckData.model,
      year: truckData.year,
      color: truckData.color,
      engineMake: truckData.engineMake,
      engineModel: truckData.engineModel,
      horsepower: truckData.horsepower,
      transmissionType: truckData.transmissionType || 'manual',
      numGears: truckData.numGears,
      ownershipType: truckData.ownershipType || 'owned',
      purchaseDate: truckData.purchaseDate,
      leaseEndDate: truckData.leaseEndDate,
      purchasePrice: truckData.purchasePrice,
      licensePlate: truckData.licensePlate,
      issuingState: truckData.issuingState,
      registrationExp: truckData.registrationExp,
      insurancePolicy: truckData.insurancePolicy,
      insuranceExp: truckData.insuranceExp,
      jurisdiction: truckData.jurisdiction || 'IFTA',
      gvwr: truckData.gvwr,
      gcwr: truckData.gcwr,
      dotNumber: truckData.dotNumber,
      status: truckData.status || 'available',
      currentLocation: truckData.currentLocation,
      assignedYardId: truckData.assignedYardId,
      odometer: truckData.odometer,
      odometerUnit: truckData.odometerUnit || 'miles',
      engineHours: truckData.engineHours,
      currentDriverId: truckData.currentDriverId,
      attachedTrailerId: truckData.attachedTrailerId,
      currentLoadId: truckData.currentLoadId,
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
   * Add documents to a truck
   * This handles the business logic for document management
   */
  async addDocumentsToTruck(
    truckId: string, 
    documentData: CreateDocumentData[]
  ): Promise<void> {
    // Get the truck
    const truck = await this.truckRepository.findById(truckId);
    if (!truck) {
      throw new Error('Truck not found. Cannot add documents to non-existent truck.');
    }

    // Create document entities
    for (const docData of documentData) {
      const document = TruckDocument.create(truckId, {
        documentType: docData.documentType,
        fileName: docData.fileName,
        filePath: docData.filePath,
        fileSize: docData.fileSize,
        mimeType: docData.mimeType,
        description: docData.description,
        uploadedBy: docData.uploadedBy,
        uploadedAt: new Date(),
      });

      // Add document to truck (this validates business rules)
      truck.addDocument(document);
    }

    // Save updated truck
    await this.truckRepository.update(truck);
  }

  /**
   * Update truck odometer reading
   * This ensures odometer updates follow business rules
   */
  async updateTruckOdometer(truckId: string, newReading: number): Promise<void> {
    const truck = await this.truckRepository.findById(truckId);
    if (!truck) {
      throw new Error('Truck not found. Cannot update odometer for non-existent truck.');
    }

    // Business logic is handled by the truck entity
    truck.updateOdometer(newReading);

    await this.truckRepository.update(truck);
  }

  /**
   * Change truck status
   * This ensures status changes follow business rules
   */
  async changeTruckStatus(truckId: string, newStatus: string): Promise<void> {
    const truck = await this.truckRepository.findById(truckId);
    if (!truck) {
      throw new Error('Truck not found. Cannot change status for non-existent truck.');
    }

    // Business logic is handled by the truck entity
    truck.changeStatus(newStatus);

    await this.truckRepository.update(truck);
  }

  /**
   * Get trucks that need attention
   * This implements business logic for identifying trucks that need maintenance or have issues
   */
  async getTrucksThatNeedAttention(): Promise<TruckAttentionReport> {
    const allTrucks = await this.truckRepository.findAll();
    
    const report: TruckAttentionReport = {
      trucksInMaintenance: [],
      trucksOutOfService: [],
      trucksMissingDocuments: [],
      trucksWithHighMileage: [],
    };

    for (const truck of allTrucks) {
      // Trucks in maintenance
      if (truck.isInMaintenance()) {
        report.trucksInMaintenance.push(truck);
      }

      // Trucks out of service
      if (truck.isOutOfService()) {
        report.trucksOutOfService.push(truck);
      }

      // Trucks missing required documents
      if (!truck.hasRequiredDocuments()) {
        report.trucksMissingDocuments.push(truck);
      }

      // Trucks with high mileage (over 300,000 miles)
      if (truck.odometer && truck.odometer > 300000) {
        report.trucksWithHighMileage.push(truck);
      }
    }

    return report;
  }
}
