"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleId = void 0;
class VehicleId {
    constructor(_value) {
        this._value = _value;
    }
    static create(value) {
        if (!value || !value.trim()) {
            throw new Error('Vehicle ID cannot be empty');
        }
        const trimmedValue = value.trim().toUpperCase();
        const vehicleIdPattern = /^[A-Z]\d{3,4}$/;
        if (!vehicleIdPattern.test(trimmedValue)) {
            throw new Error('Vehicle ID must follow pattern: Letter followed by 3-4 digits (e.g., T101, T1234)');
        }
        return new VehicleId(trimmedValue);
    }
    static fromString(value) {
        return new VehicleId(value);
    }
    get value() {
        return this._value;
    }
    equals(other) {
        return this._value === other._value;
    }
    toString() {
        return this._value;
    }
}
exports.VehicleId = VehicleId;
//# sourceMappingURL=vehicle-id.vo.js.map