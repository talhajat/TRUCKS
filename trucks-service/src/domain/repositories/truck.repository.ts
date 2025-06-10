/**
 * TRUCK REPOSITORY INTERFACE
 * 
 * This defines the contract for how we save and retrieve truck data.
 * Think of this as the rules for how our truck filing system works.
 * The actual implementation will be in the infrastructure layer.
 */

import { Truck } from '../entities/truck.entity';
import { VehicleId } from '../value-objects/vehicle-id.vo';
import { VIN } from '../value-objects/vin.vo';

/**
 * Interface that defines all the ways we can work with truck data
 * This is like a contract that says "here are all the things you can do with trucks"
 */
export interface ITruckRepository {
  /**
   * Save a new truck to the database
   * Like adding a new truck file to our filing cabinet
   */
  save(truck: Truck): Promise<void>;

  /**
   * Update an existing truck in the database
   * Like updating information in an existing truck file
   */
  update(truck: Truck): Promise<void>;

  /**
   * Find a truck by its unique ID
   * Like looking up a specific truck file by its ID number
   */
  findById(id: string): Promise<Truck | null>;

  /**
   * Find a truck by its vehicle ID (unit number like T101)
   * Like looking up a truck by its unit number
   */
  findByVehicleId(vehicleId: VehicleId): Promise<Truck | null>;

  /**
   * Find a truck by its VIN (Vehicle Identification Number)
   * Like looking up a truck by its VIN number
   */
  findByVin(vin: VIN): Promise<Truck | null>;

  /**
   * Get all trucks in the system
   * Like getting a list of all trucks in our fleet
   */
  findAll(): Promise<Truck[]>;

  /**
   * Get trucks by their current status
   * Like asking "show me all available trucks" or "show me all trucks in maintenance"
   */
  findByStatus(status: string): Promise<Truck[]>;

  /**
   * Get trucks assigned to a specific driver
   * Like asking "which trucks is John Smith currently driving?"
   */
  findByDriverId(driverId: string): Promise<Truck[]>;

  /**
   * Get trucks at a specific location/yard
   * Like asking "which trucks are currently at the Detroit yard?"
   */
  findByLocation(locationId: string): Promise<Truck[]>;

  /**
   * Delete a truck from the system
   * Like removing a truck file from our filing cabinet
   * (This should be used carefully - usually we just mark trucks as out of service)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if a vehicle ID is already being used
   * Like checking "is unit number T101 already taken?"
   */
  existsByVehicleId(vehicleId: VehicleId): Promise<boolean>;

  /**
   * Check if a VIN is already being used
   * Like checking "do we already have a truck with this VIN?"
   */
  existsByVin(vin: VIN): Promise<boolean>;

  /**
   * Get trucks that need maintenance soon
   * Like asking "which trucks are due for service based on mileage or time?"
   */
  findMaintenanceDue(odometerThreshold?: number, daysThreshold?: number): Promise<Truck[]>;

  /**
   * Get trucks with expiring documents
   * Like asking "which trucks have registration or insurance expiring soon?"
   */
  findWithExpiringDocuments(daysAhead: number): Promise<Truck[]>;

  /**
   * Search trucks by multiple criteria
   * Like asking "find trucks that match these specific conditions"
   */
  search(criteria: TruckSearchCriteria): Promise<Truck[]>;
}

/**
 * Search criteria for finding trucks
 * This lets us search for trucks using different filters
 */
export interface TruckSearchCriteria {
  make?: string;              // Search by manufacturer (like "Freightliner")
  model?: string;             // Search by model (like "Cascadia")
  year?: number;              // Search by year
  status?: string;            // Search by status (available, assigned, etc.)
  locationId?: string;        // Search by current location
  driverId?: string;          // Search by assigned driver
  minOdometer?: number;       // Find trucks with at least this many miles
  maxOdometer?: number;       // Find trucks with no more than this many miles
  ownershipType?: string;     // Search by ownership (owned, leased, rented)
}

/**
 * Result object for paginated truck queries
 * When we have lots of trucks, we show them in pages (like page 1, page 2, etc.)
 */
export interface TruckQueryResult {
  trucks: Truck[];           // The trucks on this page
  totalCount: number;        // Total number of trucks that match the search
  page: number;              // Which page we're looking at
  pageSize: number;          // How many trucks per page
  totalPages: number;        // Total number of pages available
}

/**
 * Extended repository interface with pagination support
 * For when we need to handle large numbers of trucks efficiently
 */
export interface ITruckRepositoryWithPagination extends ITruckRepository {
  /**
   * Get trucks with pagination support
   * Like asking "show me trucks 1-20, then I'll ask for 21-40 later"
   */
  findAllPaginated(page: number, pageSize: number): Promise<TruckQueryResult>;

  /**
   * Search trucks with pagination support
   * Like searching with filters but only showing results in manageable chunks
   */
  searchPaginated(criteria: TruckSearchCriteria, page: number, pageSize: number): Promise<TruckQueryResult>;
}