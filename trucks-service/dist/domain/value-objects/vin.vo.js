"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIN = void 0;
class VIN {
    constructor(_value) {
        this._value = _value;
    }
    static create(value) {
        if (!value || !value.trim()) {
            throw new Error('VIN cannot be empty');
        }
        const trimmedValue = value.trim().toUpperCase();
        if (trimmedValue.length !== 17) {
            throw new Error('VIN must be exactly 17 characters');
        }
        const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/;
        if (!vinPattern.test(trimmedValue)) {
            throw new Error('VIN contains invalid characters. Cannot contain I, O, or Q');
        }
        if (!VIN.isValidChecksum(trimmedValue)) {
            throw new Error('Invalid VIN checksum');
        }
        return new VIN(trimmedValue);
    }
    static fromString(value) {
        return new VIN(value);
    }
    static isValidChecksum(vin) {
        const firstChar = vin[0];
        return !vin.split('').every(char => char === firstChar);
    }
    get value() {
        return this._value;
    }
    get worldManufacturerIdentifier() {
        return this._value.substring(0, 3);
    }
    get vehicleDescriptorSection() {
        return this._value.substring(3, 9);
    }
    get vehicleIdentifierSection() {
        return this._value.substring(9, 17);
    }
    get modelYearCode() {
        return this._value[9];
    }
    equals(other) {
        return this._value === other._value;
    }
    toString() {
        return this._value;
    }
    toFormattedString() {
        return `${this._value.substring(0, 3)}-${this._value.substring(3, 9)}-${this._value.substring(9, 17)}`;
    }
}
exports.VIN = VIN;
//# sourceMappingURL=vin.vo.js.map