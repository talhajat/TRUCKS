/**
 * VIN (Vehicle Identification Number) VALUE OBJECT
 *
 * Simplified version - accepts any non-empty string as VIN
 * No validation on length or format
 */

export class VIN {
  private constructor(private readonly _value: string) {}

  /**
   * Factory method to create VIN - simplified with minimal validation
   */
  public static create(value: string): VIN {
    if (!value || !value.trim()) {
      throw new Error('VIN cannot be empty');
    }

    // Just trim the value, no other validation
    const trimmedValue = value.trim();
    return new VIN(trimmedValue);
  }

  /**
   * Factory method for reconstitution from persistence
   */
  public static fromString(value: string): VIN {
    return new VIN(value);
  }

  get value(): string {
    return this._value;
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
}