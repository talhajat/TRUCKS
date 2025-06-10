/**
 * PRISMA TRUCK REPOSITORY IMPLEMENTATION
 * 
 * This class implements the ITruckRepository interface using Prisma and PostgreSQL.
 * Think of this as the "filing clerk" that knows exactly how to store and retrieve
 * truck information from our database filing system.
 * 
 * This is where we convert between our domain objects (Truck entities) and 
 * database records (Prisma models).
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ITruckRepository, TruckSearchCriteria } from '../../domain/repositories/truck.repository';
import { Truck, TruckProps } from '../../domain/entities/truck.entity';
import { TruckDocument, TruckDocumentProps } from '../../domain/entities/truck-document.entity';
import { VehicleId } from '../../domain/value-objects/vehicle-id.vo';
import { VIN } from '../../domain/value-objects/vin.vo';

@Injectable()
export class PrismaTruckRepository implements ITruckRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Save a new truck to the database
   * Like adding a new truck file to our filing cabinet
   */
  async save(truck: Truck): Promise<void> {
    const props = truck.props;
    
    try {
      await this.prisma.truck.create({
        data: {
          id: truck.id,
          // Basic truck information
          vehicleId: props.vehicleId.value,
          name: props.name,
          vin: props.vin.value,
          make: props.make,
          model: props.model,
          year: props.year,
          color: props.color,
          
          // Engine & Powertrain
          engineMake: props.engineMake,
          engineModel: props.engineModel,
          horsepower: props.horsepower,
          transmissionType: this.mapTransmissionType(props.transmissionType),
          numGears: props.numGears,
          
          // Ownership & Financials
          ownershipType: this.mapOwnershipType(props.ownershipType),
          purchaseDate: props.purchaseDate,
          leaseEndDate: props.leaseEndDate,
          purchasePrice: props.purchasePrice,
          
          // Registration & Compliance
          licensePlate: props.licensePlate,
          issuingState: props.issuingState,
          registrationExp: props.registrationExp,
          insurancePolicy: props.insurancePolicy,
          insuranceExp: props.insuranceExp,
          jurisdiction: props.jurisdiction,
          gvwr: props.gvwr,
          gcwr: props.gcwr,
          dotNumber: props.dotNumber,
          
          // Status & Location
          status: this.mapTruckStatus(props.status),
          currentLocation: props.currentLocation,
          assignedYardId: props.assignedYardId,
          
          // Operational Data
          odometer: props.odometer,
          odometerUnit: this.mapDistanceUnit(props.odometerUnit),
          engineHours: props.engineHours,
          
          // Simple Trailer Reference
          attachedTrailerId: props.attachedTrailerId,
          
          // Audit
          lastUpdated: props.lastUpdated,
          
          // Documents (if any)
          documents: props.documents && props.documents.length > 0 ? {
            create: props.documents.map(doc => ({
              id: doc.id,
              documentType: this.mapDocumentType(doc.documentType),
              fileName: doc.fileName,
              filePath: doc.filePath,
              fileSize: doc.fileSize,
              mimeType: doc.mimeType,
              description: doc.description,
              uploadedBy: doc.uploadedBy,
              lastUpdated: doc.uploadedAt,
            }))
          } : undefined,
        },
      });
    } catch (error) {
      throw new Error(`Failed to save truck: ${error.message}`);
    }
  }

  /**
   * Update an existing truck in the database
   * Like updating information in an existing truck file
   */
  async update(truck: Truck): Promise<void> {
    const props = truck.props;
    
    try {
      await this.prisma.truck.update({
        where: { id: truck.id },
        data: {
          // Basic truck information
          vehicleId: props.vehicleId.value,
          name: props.name,
          vin: props.vin.value,
          make: props.make,
          model: props.model,
          year: props.year,
          color: props.color,
          
          // Engine & Powertrain
          engineMake: props.engineMake,
          engineModel: props.engineModel,
          horsepower: props.horsepower,
          transmissionType: this.mapTransmissionType(props.transmissionType),
          numGears: props.numGears,
          
          // Ownership & Financials
          ownershipType: this.mapOwnershipType(props.ownershipType),
          purchaseDate: props.purchaseDate,
          leaseEndDate: props.leaseEndDate,
          purchasePrice: props.purchasePrice,
          
          // Registration & Compliance
          licensePlate: props.licensePlate,
          issuingState: props.issuingState,
          registrationExp: props.registrationExp,
          insurancePolicy: props.insurancePolicy,
          insuranceExp: props.insuranceExp,
          jurisdiction: props.jurisdiction,
          gvwr: props.gvwr,
          gcwr: props.gcwr,
          dotNumber: props.dotNumber,
          
          // Status & Location
          status: this.mapTruckStatus(props.status),
          currentLocation: props.currentLocation,
          assignedYardId: props.assignedYardId,
          
          // Operational Data
          odometer: props.odometer,
          odometerUnit: this.mapDistanceUnit(props.odometerUnit),
          engineHours: props.engineHours,
          
          // Simple Trailer Reference
          attachedTrailerId: props.attachedTrailerId,
          
          // Audit
          lastUpdated: props.lastUpdated,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to update truck: ${error.message}`);
    }
  }

  /**
   * Find a truck by its unique ID
   * Like looking up a specific truck file by its ID number
   */
  async findById(id: string): Promise<Truck | null> {
    try {
      const truckData = await this.prisma.truck.findUnique({
        where: { id },
        include: {
          documents: true,
        },
      });

      if (!truckData) {
        return null;
      }

      return this.mapToDomainEntity(truckData);
    } catch (error) {
      throw new Error(`Failed to find truck by ID: ${error.message}`);
    }
  }

  /**
   * Find a truck by its vehicle ID (unit number)
   * Like looking up a truck by its unit number (T101, T102, etc.)
   */
  async findByVehicleId(vehicleId: VehicleId): Promise<Truck | null> {
    try {
      const truckData = await this.prisma.truck.findUnique({
        where: { vehicleId: vehicleId.value },
        include: {
          documents: true,
        },
      });

      if (!truckData) {
        return null;
      }

      return this.mapToDomainEntity(truckData);
    } catch (error) {
      throw new Error(`Failed to find truck by vehicle ID: ${error.message}`);
    }
  }

  /**
   * Find a truck by its VIN
   * Like looking up a truck by its VIN number
   */
  async findByVin(vin: VIN): Promise<Truck | null> {
    try {
      const truckData = await this.prisma.truck.findUnique({
        where: { vin: vin.value },
        include: {
          documents: true,
        },
      });

      if (!truckData) {
        return null;
      }

      return this.mapToDomainEntity(truckData);
    } catch (error) {
      throw new Error(`Failed to find truck by VIN: ${error.message}`);
    }
  }

  /**
   * Get all trucks in the system
   * Like getting a list of all trucks in our fleet
   */
  async findAll(): Promise<Truck[]> {
    try {
      const trucksData = await this.prisma.truck.findMany({
        include: {
          documents: true,
        },
        orderBy: {
          vehicleId: 'asc', // Sort by vehicle ID (T101, T102, etc.)
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to find all trucks: ${error.message}`);
    }
  }

  /**
   * Get trucks by their current status
   * Like asking "show me all available trucks" or "show me all trucks in maintenance"
   */
  async findByStatus(status: string): Promise<Truck[]> {
    try {
      const trucksData = await this.prisma.truck.findMany({
        where: {
          status: this.mapTruckStatus(status)
        },
        include: {
          documents: true,
        },
        orderBy: {
          vehicleId: 'asc',
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to find trucks by status: ${error.message}`);
    }
  }

  /**
   * Get trucks assigned to a specific driver
   * Like asking "which trucks is John Smith currently driving?"
   */
  async findByDriverId(driverId: string): Promise<Truck[]> {
    // This method is no longer needed since we don't track drivers in trucks-service
    // Always return empty array
    return [];
  }

  /**
   * Get trucks at a specific location/yard
   * Like asking "which trucks are currently at the Detroit yard?"
   */
  async findByLocation(locationId: string): Promise<Truck[]> {
    try {
      const trucksData = await this.prisma.truck.findMany({
        where: { assignedYardId: locationId },
        include: {
          documents: true,
        },
        orderBy: {
          vehicleId: 'asc',
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to find trucks by location: ${error.message}`);
    }
  }

  /**
   * Delete a truck from the system
   * Like removing a truck file from our filing cabinet
   */
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.truck.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete truck: ${error.message}`);
    }
  }

  /**
   * Check if a vehicle ID is already being used
   * Like checking "is unit number T101 already taken?"
   */
  async existsByVehicleId(vehicleId: VehicleId): Promise<boolean> {
    try {
      const count = await this.prisma.truck.count({
        where: { vehicleId: vehicleId.value },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check vehicle ID existence: ${error.message}`);
    }
  }

  /**
   * Check if a VIN is already being used
   * Like checking "do we already have a truck with this VIN?"
   */
  async existsByVin(vin: VIN): Promise<boolean> {
    try {
      const count = await this.prisma.truck.count({
        where: { vin: vin.value },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check VIN existence: ${error.message}`);
    }
  }

  /**
   * Get trucks that need maintenance soon
   * Like asking "which trucks are due for service based on mileage or time?"
   */
  async findMaintenanceDue(odometerThreshold: number = 300000, daysThreshold: number = 30): Promise<Truck[]> {
    try {
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - (daysThreshold * 30)); // Approximate months to days

      const trucksData = await this.prisma.truck.findMany({
        where: {
          OR: [
            { odometer: { gte: odometerThreshold } },
            { lastUpdated: { lte: thresholdDate } },
          ],
        },
        include: {
          documents: true,
        },
        orderBy: {
          odometer: 'desc',
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to find trucks needing maintenance: ${error.message}`);
    }
  }

  /**
   * Get trucks with expiring documents
   * Like asking "which trucks have registration or insurance expiring soon?"
   */
  async findWithExpiringDocuments(daysAhead: number): Promise<Truck[]> {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysAhead);

      const trucksData = await this.prisma.truck.findMany({
        where: {
          OR: [
            { registrationExp: { lte: expirationDate } },
            { insuranceExp: { lte: expirationDate } },
          ],
        },
        include: {
          documents: true,
        },
        orderBy: {
          registrationExp: 'asc',
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to find trucks with expiring documents: ${error.message}`);
    }
  }

  /**
   * Search trucks by multiple criteria
   * Like asking "find trucks that match these specific conditions"
   */
  async search(criteria: TruckSearchCriteria): Promise<Truck[]> {
    try {
      const where: any = {};

      if (criteria.make) {
        where.make = { contains: criteria.make, mode: 'insensitive' };
      }
      if (criteria.model) {
        where.model = { contains: criteria.model, mode: 'insensitive' };
      }
      if (criteria.year) {
        where.year = criteria.year;
      }
      if (criteria.status) {
        where.status = this.mapTruckStatus(criteria.status);
      }
      if (criteria.locationId) {
        where.assignedYardId = criteria.locationId;
      }
      // Skip driver criteria since we don't track drivers
      if (criteria.minOdometer || criteria.maxOdometer) {
        where.odometer = {};
        if (criteria.minOdometer) {
          where.odometer.gte = criteria.minOdometer;
        }
        if (criteria.maxOdometer) {
          where.odometer.lte = criteria.maxOdometer;
        }
      }
      if (criteria.ownershipType) {
        where.ownershipType = this.mapOwnershipType(criteria.ownershipType);
      }

      const trucksData = await this.prisma.truck.findMany({
        where,
        include: {
          documents: true,
        },
        orderBy: {
          vehicleId: 'asc',
        },
      });

      return trucksData.map(truckData => this.mapToDomainEntity(truckData));
    } catch (error) {
      throw new Error(`Failed to search trucks: ${error.message}`);
    }
  }

  /**
   * PRIVATE HELPER METHODS
   * These methods convert between domain objects and database records
   */

  /**
   * Convert database record to domain entity
   * This is where we transform database data back into our business objects
   */
  private mapToDomainEntity(truckData: any): Truck {
    // Convert documents
    const documents = truckData.documents?.map((doc: any) => 
      TruckDocument.fromPersistence(doc.id, truckData.id, {
        documentType: this.mapFromDocumentType(doc.documentType),
        fileName: doc.fileName,
        filePath: doc.filePath,
        fileSize: doc.fileSize,
        mimeType: doc.mimeType,
        description: doc.description,
        uploadedBy: doc.uploadedBy,
        uploadedAt: doc.lastUpdated,
      })
    ) || [];

    // Use currentLocation directly since we don't have assignedYard relation
    const currentLocation = truckData.currentLocation;

    // Create truck properties
    const truckProps: TruckProps = {
      vehicleId: VehicleId.fromString(truckData.vehicleId),
      name: truckData.name,
      vin: VIN.fromString(truckData.vin),
      make: truckData.make,
      model: truckData.model,
      year: truckData.year,
      color: truckData.color,
      engineMake: truckData.engineMake,
      engineModel: truckData.engineModel,
      horsepower: truckData.horsepower,
      transmissionType: this.mapFromTransmissionType(truckData.transmissionType),
      numGears: truckData.numGears,
      ownershipType: this.mapFromOwnershipType(truckData.ownershipType),
      purchaseDate: truckData.purchaseDate,
      leaseEndDate: truckData.leaseEndDate,
      purchasePrice: truckData.purchasePrice ? Number(truckData.purchasePrice) : undefined,
      licensePlate: truckData.licensePlate,
      issuingState: truckData.issuingState,
      registrationExp: truckData.registrationExp,
      insurancePolicy: truckData.insurancePolicy,
      insuranceExp: truckData.insuranceExp,
      jurisdiction: truckData.jurisdiction,
      gvwr: truckData.gvwr,
      gcwr: truckData.gcwr,
      dotNumber: truckData.dotNumber,
      status: this.mapFromTruckStatus(truckData.status),
      currentLocation,
      assignedYardId: truckData.assignedYardId,
      odometer: truckData.odometer,
      odometerUnit: this.mapFromDistanceUnit(truckData.odometerUnit),
      engineHours: truckData.engineHours,
      attachedTrailerId: truckData.attachedTrailerId,
      documents,
      createdAt: truckData.createdAt,
      updatedAt: truckData.updatedAt,
      lastUpdated: truckData.lastUpdated,
    };

    return Truck.fromPersistence(truckData.id, truckProps);
  }

  /**
   * Mapping methods to convert between domain enums and database enums
   */
  private mapTruckStatus(status: string): any {
    return status; // Already lowercase in domain
  }

  private mapFromTruckStatus(status: any): string {
    return status;
  }

  private mapTransmissionType(type: string): any {
    const mapping: Record<string, any> = {
      'manual': 'MANUAL',
      'automatic': 'AUTOMATIC',
      'automated_manual': 'AUTOMATED_MANUAL',
    };
    return mapping[type] || 'MANUAL';
  }

  private mapFromTransmissionType(type: any): string {
    const mapping: Record<any, string> = {
      'MANUAL': 'manual',
      'AUTOMATIC': 'automatic',
      'AUTOMATED_MANUAL': 'automated_manual',
    };
    return mapping[type] || 'manual';
  }

  private mapOwnershipType(type: string): any {
    const mapping: Record<string, any> = {
      'owned': 'OWNED',
      'leased': 'LEASED',
      'rented': 'RENTED',
    };
    return mapping[type] || 'OWNED';
  }

  private mapFromOwnershipType(type: any): string {
    const mapping: Record<any, string> = {
      'OWNED': 'owned',
      'LEASED': 'leased',
      'RENTED': 'rented',
    };
    return mapping[type] || 'owned';
  }

  private mapDistanceUnit(unit: string): any {
    const mapping: Record<string, any> = {
      'miles': 'MILES',
      'kilometers': 'KILOMETERS',
    };
    return mapping[unit] || 'MILES';
  }

  private mapFromDistanceUnit(unit: any): string {
    const mapping: Record<any, string> = {
      'MILES': 'miles',
      'KILOMETERS': 'kilometers',
    };
    return mapping[unit] || 'miles';
  }

  private mapDocumentType(type: string): any {
    const mapping: Record<string, any> = {
      'vehicle_title': 'VEHICLE_TITLE',
      'lease_agreement': 'LEASE_AGREEMENT',
      'registration': 'REGISTRATION',
      'insurance_certificate': 'INSURANCE_CERTIFICATE',
      'inspection_report': 'INSPECTION_REPORT',
    };
    return mapping[type] || 'VEHICLE_TITLE';
  }

  private mapFromDocumentType(type: any): string {
    const mapping: Record<any, string> = {
      'VEHICLE_TITLE': 'vehicle_title',
      'LEASE_AGREEMENT': 'lease_agreement',
      'REGISTRATION': 'registration',
      'INSURANCE_CERTIFICATE': 'insurance_certificate',
      'INSPECTION_REPORT': 'inspection_report',
    };
    return mapping[type] || 'vehicle_title';
  }
}