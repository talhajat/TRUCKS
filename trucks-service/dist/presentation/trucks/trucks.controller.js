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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrucksController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const use_cases_1 = require("../../application/use-cases");
const dtos_1 = require("../../application/dtos");
let TrucksController = class TrucksController {
    constructor(createTruckUseCase, getAllTrucksUseCase) {
        this.createTruckUseCase = createTruckUseCase;
        this.getAllTrucksUseCase = getAllTrucksUseCase;
    }
    async getAllTrucks() {
        try {
            return await this.getAllTrucksUseCase.execute();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: 'Failed to retrieve trucks. Please try again later.',
                error: 'Internal Server Error'
            });
        }
    }
    async createTruck(createTruckDto, files) {
        try {
            console.log('📝 Creating new truck:', {
                vehicleId: createTruckDto.vehicleId,
                vin: createTruckDto.vin,
                make: createTruckDto.make,
                model: createTruckDto.model,
                filesCount: files?.length || 0
            });
            const createTruckInput = {
                vehicleId: createTruckDto.vehicleId,
                vin: createTruckDto.vin,
                make: createTruckDto.make,
                model: createTruckDto.model,
                year: createTruckDto.year,
                name: createTruckDto.name,
                color: createTruckDto.color,
                engineMake: createTruckDto.engineMake,
                engineModel: createTruckDto.engineModel,
                horsepower: createTruckDto.horsepower,
                transmissionType: createTruckDto.transmissionType,
                numGears: createTruckDto.numGears,
                ownershipType: createTruckDto.ownershipType,
                purchaseDate: createTruckDto.purchaseDate,
                leaseEndDate: createTruckDto.leaseEndDate,
                purchasePrice: createTruckDto.purchasePrice,
                licensePlate: createTruckDto.licensePlate,
                issuingState: createTruckDto.issuingState,
                registrationExp: createTruckDto.registrationExp,
                insurancePolicy: createTruckDto.insurancePolicy,
                insuranceExp: createTruckDto.insuranceExp,
                jurisdiction: createTruckDto.jurisdiction,
                gvwr: createTruckDto.gvwr,
                gcwr: createTruckDto.gcwr,
                dotNumber: createTruckDto.dotNumber,
                initialStatus: createTruckDto.initialStatus,
                assignedYard: createTruckDto.assignedYard,
                initialOdometer: createTruckDto.initialOdometer,
                initialOdometerUnit: createTruckDto.initialOdometerUnit,
                defaultTrailerId: createTruckDto.defaultTrailerId,
            };
            const result = await this.createTruckUseCase.execute(createTruckInput);
            console.log('✅ Truck created successfully:', {
                id: result.id,
                vehicleId: result.vehicleId,
                message: result.message
            });
            return result;
        }
        catch (error) {
            console.error('❌ Failed to create truck:', error.message);
            if (error.message.includes('already exists') ||
                error.message.includes('Validation') ||
                error.message.includes('Invalid')) {
                throw new common_1.BadRequestException({
                    statusCode: 400,
                    message: error.message,
                    error: 'Bad Request'
                });
            }
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: 'Failed to create truck. Please try again later.',
                error: 'Internal Server Error'
            });
        }
    }
    getHealth() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'trucks-microservice'
        };
    }
};
exports.TrucksController = TrucksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all trucks',
        description: 'Retrieves all trucks in the system for table display'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved trucks',
        type: dtos_1.GetAllTrucksResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error',
        type: dtos_1.ErrorResponseDto
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "getAllTrucks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new truck',
        description: 'Creates a new truck with optional document uploads'
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Truck created successfully',
        type: dtos_1.CreateTruckResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validation error',
        type: dtos_1.ErrorResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error',
        type: dtos_1.ErrorResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTruckDto, Array]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "createTruck", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({
        summary: 'Health check',
        description: 'Check if the trucks service is running properly'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service is healthy'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TrucksController.prototype, "getHealth", null);
exports.TrucksController = TrucksController = __decorate([
    (0, swagger_1.ApiTags)('trucks'),
    (0, common_1.Controller)('trucks'),
    __metadata("design:paramtypes", [use_cases_1.CreateTruckUseCase,
        use_cases_1.GetAllTrucksUseCase])
], TrucksController);
//# sourceMappingURL=trucks.controller.js.map