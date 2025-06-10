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
exports.CreateTruckUseCase = exports.TRUCK_REPOSITORY_TOKEN = void 0;
const common_1 = require("@nestjs/common");
const truck_service_1 = require("../../domain/services/truck.service");
exports.TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';
let CreateTruckUseCase = class CreateTruckUseCase {
    constructor(truckDomainService) {
        this.truckDomainService = truckDomainService;
    }
    async execute(input) {
        try {
            const createTruckData = this.mapInputToDomainData(input);
            const truck = await this.truckDomainService.createTruck(createTruckData);
            return {
                id: truck.id,
                vehicleId: truck.vehicleIdValue,
                vin: truck.vinValue,
                make: truck.make,
                model: truck.model,
                year: truck.year,
                status: truck.status,
                message: `Truck ${truck.vehicleIdValue} created successfully`,
            };
        }
        catch (error) {
            throw new Error(`Failed to create truck: ${error.message}`);
        }
    }
    mapInputToDomainData(input) {
        return {
            vehicleId: input.vehicleId,
            vin: input.vin,
            make: input.make,
            model: input.model,
            year: input.year,
            name: input.name,
            color: input.color,
            engineMake: input.engineMake,
            engineModel: input.engineModel,
            horsepower: input.horsepower,
            transmissionType: input.transmissionType,
            numGears: input.numGears,
            ownershipType: input.ownershipType,
            purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : undefined,
            leaseEndDate: input.leaseEndDate ? new Date(input.leaseEndDate) : undefined,
            purchasePrice: input.purchasePrice,
            licensePlate: input.licensePlate,
            issuingState: input.issuingState,
            registrationExp: input.registrationExp ? new Date(input.registrationExp) : undefined,
            insurancePolicy: input.insurancePolicy,
            insuranceExp: input.insuranceExp ? new Date(input.insuranceExp) : undefined,
            jurisdiction: input.jurisdiction,
            gvwr: input.gvwr,
            gcwr: input.gcwr,
            dotNumber: input.dotNumber,
            status: input.initialStatus,
            currentLocation: this.mapLocationIdToName(input.assignedYard),
            assignedYardId: input.assignedYard,
            odometer: input.initialOdometer,
            odometerUnit: input.initialOdometerUnit,
            engineHours: 0,
            attachedTrailerId: input.defaultTrailerId,
        };
    }
    mapLocationIdToName(locationId) {
        if (!locationId)
            return undefined;
        const locationMap = {
            'loc1': 'Detroit Yard',
            'loc2': 'Chicago Terminal',
            'loc3': 'Shop - Cleveland',
            'loc4': 'Toledo Drop Yard',
            'loc5': 'Customer Site - Acme Corp',
        };
        return locationMap[locationId] || 'Unknown Location';
    }
};
exports.CreateTruckUseCase = CreateTruckUseCase;
exports.CreateTruckUseCase = CreateTruckUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [truck_service_1.TruckDomainService])
], CreateTruckUseCase);
//# sourceMappingURL=create-truck.use-case.js.map