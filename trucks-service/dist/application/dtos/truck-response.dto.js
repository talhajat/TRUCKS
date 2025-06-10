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
exports.SuccessResponseDto = exports.ErrorResponseDto = exports.CreateTruckResponseDto = exports.GetAllTrucksResponseDto = exports.TruckListItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TruckListItemDto {
}
exports.TruckListItemDto = TruckListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique truck identifier',
        example: 'truck_123456789'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User-friendly truck name',
        example: 'Unit 101'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle type (always truck)',
        example: 'truck'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current truck status',
        example: 'available',
        enum: ['available', 'assigned', 'maintenance', 'out_of_service']
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current location of the truck',
        example: 'Detroit Yard'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "currentLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2022
    }),
    __metadata("design:type", Number)
], TruckListItemDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number',
        example: 'VINTRUCK101XYZ'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck manufacturer',
        example: 'Freightliner'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck model',
        example: 'Cascadia'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of currently assigned driver',
        example: 'd2'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "driverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current odometer reading in miles',
        example: 150000
    }),
    __metadata("design:type", Number)
], TruckListItemDto.prototype, "odometer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current engine hours',
        example: 5000
    }),
    __metadata("design:type", Number)
], TruckListItemDto.prototype, "engineHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID of currently attached trailer',
        example: 'TR501'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "attachedTrailerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2024-01-15T10:30:00Z'
    }),
    __metadata("design:type", String)
], TruckListItemDto.prototype, "lastUpdated", void 0);
class GetAllTrucksResponseDto {
}
exports.GetAllTrucksResponseDto = GetAllTrucksResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of trucks',
        type: [TruckListItemDto]
    }),
    __metadata("design:type", Array)
], GetAllTrucksResponseDto.prototype, "data", void 0);
class CreateTruckResponseDto {
}
exports.CreateTruckResponseDto = CreateTruckResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique truck identifier',
        example: 'truck_123456789'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID/Unit Number',
        example: 'T104'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number',
        example: 'VINTRUCK123XYZ456'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck manufacturer',
        example: 'Freightliner'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Truck model',
        example: 'Cascadia'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2024
    }),
    __metadata("design:type", Number)
], CreateTruckResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current truck status',
        example: 'available'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Success message',
        example: 'Truck T104 created successfully'
    }),
    __metadata("design:type", String)
], CreateTruckResponseDto.prototype, "message", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP status code',
        example: 400
    }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Validation error. Please check your input.'
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error type',
        example: 'Bad Request'
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
class SuccessResponseDto {
}
exports.SuccessResponseDto = SuccessResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Success status',
        example: true
    }),
    __metadata("design:type", Boolean)
], SuccessResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response data'
    }),
    __metadata("design:type", Object)
], SuccessResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional message',
        example: 'Operation completed successfully'
    }),
    __metadata("design:type", String)
], SuccessResponseDto.prototype, "message", void 0);
//# sourceMappingURL=truck-response.dto.js.map