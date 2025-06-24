/**
 * Truck Status Enum
 * 
 * Represents the operational status of a truck.
 * Values match frontend expectations.
 */
export enum TruckStatus {
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out-of-service'  // Frontend uses hyphenated format
}