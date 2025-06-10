"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTruckDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var TransmissionType;
(function (TransmissionType) {
    TransmissionType["MANUAL"] = "manual";
    TransmissionType["AUTOMATIC"] = "automatic";
    TransmissionType["AUTOMATED_MANUAL"] = "automated_manual";
})(TransmissionType || (TransmissionType = {}));
var OwnershipType;
(function (OwnershipType) {
    OwnershipType["OWNED"] = "owned";
    OwnershipType["LEASED"] = "leased";
    OwnershipType["RENTED"] = "rented";
})(OwnershipType || (OwnershipType = {}));
var TruckStatus;
(function (TruckStatus) {
    TruckStatus["AVAILABLE"] = "available";
    TruckStatus["MAINTENANCE"] = "maintenance";
    TruckStatus["OUT_OF_SERVICE"] = "out_of_service";
})(TruckStatus || (TruckStatus = {}));
var DistanceUnit;
(function (DistanceUnit) {
    DistanceUnit["MILES"] = "miles";
    DistanceUnit["KILOMETERS"] = "kilometers";
})(DistanceUnit || (DistanceUnit = {}));
class CreateTruckDto {
}
exports.CreateTruckDto = CreateTruckDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID/Unit Number (e.g., T101, T102)',
        example: 'T104'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 10, { message: 'Vehicle ID must be between 3 and 10 characters' }),
    (0, class_validator_1.Matches)(/^[A-Z]\d{3,4}$/, { message: 'Vehicle ID must follow pattern: Letter followed by 3-4 digits (e.g., T101)' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number (17 characters)',
        example: 'VINTRUCK123XYZ456'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(17, 17, { message: 'VIN must be exactly 17 characters' }),
    (0, class_validator_1.Matches)(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'VIN contains invalid characters' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck manufacturer',
        example: 'Freightliner'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50, { message: 'Make must be between 1 and 50 characters' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck model',
        example: 'Cascadia'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50, { message: 'Model must be between 1 and 50 characters' }),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2024
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900, { message: 'Year must be 1900 or later' }),
    (0, class_validator_1.Max)(new Date().getFullYear() + 2, { message: 'Year cannot be more than 2 years in the future' }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User-friendly name for the truck',
        example: 'Unit 104'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Truck color',
        example: 'White'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Engine manufacturer',
        example: 'Cummins'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "engineMake", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Engine model',
        example: 'X15'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "engineModel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Engine horsepower',
        example: 500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseInt(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "horsepower", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Transmission type',
        enum: TransmissionType,
        example: TransmissionType.MANUAL
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TransmissionType),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "transmissionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of gears',
        example: 10
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(20),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseInt(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "numGears", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ownership type',
        enum: OwnershipType,
        example: OwnershipType.OWNED
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(OwnershipType),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "ownershipType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Purchase or lease start date',
        example: '2024-01-15'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lease end date (if leased)',
        example: '2027-01-15'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "leaseEndDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Purchase price or lease cost',
        example: 150000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseFloat(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'License plate number',
        example: 'TRUCK123'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "licensePlate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Issuing state/province code',
        example: 'MI'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 3),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "issuingState", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Registration expiration date',
        example: '2025-12-31'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "registrationExp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Insurance policy number',
        example: 'POL123456789'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "insurancePolicy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Insurance expiration date',
        example: '2025-06-30'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "insuranceExp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Jurisdiction',
        example: 'IFTA'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "jurisdiction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gross Vehicle Weight Rating (lbs)',
        example: 33000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseInt(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "gvwr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Gross Combined Weight Rating (lbs)',
        example: 80000
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseInt(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "gcwr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'DOT Number',
        example: 'USDOT 123456'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "dotNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial truck status',
        enum: TruckStatus,
        example: TruckStatus.AVAILABLE
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TruckStatus),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "initialStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Assigned yard/location ID',
        example: 'loc1'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "assignedYard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial odometer reading',
        example: 1500
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)(({ value }) => value ? parseInt(value) : undefined),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "initialOdometer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Odometer unit',
        enum: DistanceUnit,
        example: DistanceUnit.MILES
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DistanceUnit),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "initialOdometerUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Default assigned trailer ID',
        example: 'TR502'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "defaultTrailerId", void 0);
//# sourceMappingURL=create-truck.dto.js.map