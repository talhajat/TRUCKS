/**
 * VIN (Vehicle Identification Number) VALUE OBJECT
 * 
 * Represents a vehicle's unique 17-character identifier
 * Encapsulates VIN validation rules and business logic
 */

export class VIN {
  private constructor(private readonly _value: string) {}

  /**
   * Factory method to create VIN with validation
   */
  public static create(value: string): VIN {
    if (!value || !value.trim()) {
      throw new Error('VIN cannot be empty');
    }

    const trimmedValue = value.trim().toUpperCase();

    // VIN must be exactly 17 characters
    if (trimmedValue.length !== 17) {
      throw new Error('VIN must be exactly 17 characters');
    }

    // VIN can only contain alphanumeric characters (excluding I, O, Q)
    const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vinPattern.test(trimmedValue)) {
      throw new Error('VIN contains invalid characters. Cannot contain I, O, or Q');
    }

    // Basic VIN checksum validation (simplified)
    if (!VIN.isValidChecksum(trimmedValue)) {
      throw new Error('Invalid VIN checksum');
    }

    return new VIN(trimmedValue);
  }

  /**
   * Factory method for reconstitution from persistence
   */
  public static fromString(value: string): VIN {
    return new VIN(value);
  }

  /**
   * Basic VIN checksum validation (simplified version)
   */
  private static isValidChecksum(vin: string): boolean {
    // This is a simplified validation - in production you'd want full VIN validation
    // For now, we'll just check that it's not all the same character
    const firstChar = vin[0];
    return !vin.split('').every(char => char === firstChar);
  }

  get value(): string {
    return this._value;
  }

  /**
   * Extract manufacturer from VIN (first 3 characters)
   */
  get worldManufacturerIdentifier(): string {
    return this._value.substring(0, 3);
  }

  /**
   * Extract vehicle descriptor section (characters 4-9)
   */
  get vehicleDescriptorSection(): string {
    return this._value.substring(3, 9);
  }

  /**
   * Extract vehicle identifier section (characters 10-17)
   */
  get vehicleIdentifierSection(): string {
    return this._value.substring(9, 17);
  }

  /**
   * Extract model year (10th character)
   */
  get modelYearCode(): string {
    return this._value[9];
  }

  /**
   * Value object equality
   */
  public equals(other: VIN): boolean {
    return this._value === other._value;
  }

  /**
   * String representation
   */
  public toString(): string {
    return this._value;
  }

  /**
   * Formatted display (with dashes for readability)
   */
  public toFormattedString(): string {
    return `${this._value.substring(0, 3)}-${this._value.substring(3, 9)}-${this._value.substring(9, 17)}`;
  }
}