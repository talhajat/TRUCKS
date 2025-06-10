/**
 * VEHICLE ID VALUE OBJECT
 * 
 * Represents a truck's unit number (e.g., T101, T102)
 * Encapsulates validation rules for vehicle identification
 */

export class VehicleId {
  private constructor(private readonly _value: string) {}

  /**
   * Factory method to create VehicleId with validation
   */
  public static create(value: string): VehicleId {
    if (!value || !value.trim()) {
      throw new Error('Vehicle ID cannot be empty');
    }

    const trimmedValue = value.trim().toUpperCase();

    // Business rule: Vehicle ID should follow pattern (letter + numbers)
    const vehicleIdPattern = /^[A-Z]\d{3,4}$/;
    if (!vehicleIdPattern.test(trimmedValue)) {
      throw new Error('Vehicle ID must follow pattern: Letter followed by 3-4 digits (e.g., T101, T1234)');
    }

    return new VehicleId(trimmedValue);
  }

  /**
   * Factory method for reconstitution from persistence
   */
  public static fromString(value: string): VehicleId {
    return new VehicleId(value);
  }

  get value(): string {
    return this._value;
  }

  /**
   * Value object equality
   */
  public equals(other: VehicleId): boolean {
    return this._value === other._value;
  }

  /**
   * String representation
   */
  public toString(): string {
    return this._value;
  }
}