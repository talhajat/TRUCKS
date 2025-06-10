export declare class VIN {
    private readonly _value;
    private constructor();
    static create(value: string): VIN;
    static fromString(value: string): VIN;
    private static isValidChecksum;
    get value(): string;
    get worldManufacturerIdentifier(): string;
    get vehicleDescriptorSection(): string;
    get vehicleIdentifierSection(): string;
    get modelYearCode(): string;
    equals(other: VIN): boolean;
    toString(): string;
    toFormattedString(): string;
}
