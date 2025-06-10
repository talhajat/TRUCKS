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
exports.GetAllTrucksUseCase = exports.TRUCK_REPOSITORY_TOKEN = void 0;
const common_1 = require("@nestjs/common");
exports.TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';
let GetAllTrucksUseCase = class GetAllTrucksUseCase {
    constructor(truckRepository) {
        this.truckRepository = truckRepository;
    }
    async execute() {
        try {
            const trucks = await this.truckRepository.findAll();
            const truckListItems = trucks.map(truck => ({
                id: truck.id,
                name: truck.name || `Unit ${truck.vehicleIdValue}`,
                type: 'truck',
                status: truck.status,
                currentLocation: truck.currentLocation || 'Unknown Location',
                year: truck.year,
                vin: truck.vinValue,
                make: truck.make,
                model: truck.model,
                driverId: truck.currentDriverId,
                odometer: truck.odometer || 0,
                engineHours: truck.engineHours || 0,
                attachedTrailerId: truck.attachedTrailerId,
                lastUpdated: truck.lastUpdated.toISOString(),
            }));
            return {
                data: truckListItems,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve trucks: ${error.message}`);
        }
    }
};
exports.GetAllTrucksUseCase = GetAllTrucksUseCase;
exports.GetAllTrucksUseCase = GetAllTrucksUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exports.TRUCK_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], GetAllTrucksUseCase);
//# sourceMappingURL=get-all-trucks.use-case.js.map