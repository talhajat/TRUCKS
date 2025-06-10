export declare class VehicleId {
    private readonly _value;
    private constructor();
    static create(value: string): VehicleId;
    static fromString(value: string): VehicleId;
    get value(): string;
    equals(other: VehicleId): boolean;
    toString(): string;
}
