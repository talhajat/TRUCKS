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
exports.TruckDomainService = exports.TRUCK_REPOSITORY_TOKEN = void 0;
const common_1 = require("@nestjs/common");
const truck_entity_1 = require("../entities/truck.entity");
const truck_document_entity_1 = require("../entities/truck-document.entity");
const vehicle_id_vo_1 = require("../value-objects/vehicle-id.vo");
const vin_vo_1 = require("../value-objects/vin.vo");
exports.TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';
let TruckDomainService = class TruckDomainService {
    constructor(truckRepository) {
        this.truckRepository = truckRepository;
    }
    async createTruck(truckData) {
        const vehicleId = vehicle_id_vo_1.VehicleId.create(truckData.vehicleId);
        const vin = vin_vo_1.VIN.create(truckData.vin);
        const existingTruckByVehicleId = await this.truckRepository.existsByVehicleId(vehicleId);
        if (existingTruckByVehicleId) {
            throw new Error(`A truck with Vehicle ID ${vehicleId.value} already exists. Please use a different unit number.`);
        }
        const existingTruckByVin = await this.truckRepository.existsByVin(vin);
        if (existingTruckByVin) {
            throw new Error(`A truck with VIN ${vin.value} already exists. Each truck must have a unique VIN.`);
        }
        const truckProps = {
            vehicleId,
            vin,
            name: truckData.name || `Unit ${vehicleId.value}`,
            make: truckData.make,
            model: truckData.model,
            year: truckData.year,
            color: truckData.color,
            engineMake: truckData.engineMake,
            engineModel: truckData.engineModel,
            horsepower: truckData.horsepower,
            transmissionType: truckData.transmissionType || 'manual',
            numGears: truckData.numGears,
            ownershipType: truckData.ownershipType || 'owned',
            purchaseDate: truckData.purchaseDate,
            leaseEndDate: truckData.leaseEndDate,
            purchasePrice: truckData.purchasePrice,
            licensePlate: truckData.licensePlate,
            issuingState: truckData.issuingState,
            registrationExp: truckData.registrationExp,
            insurancePolicy: truckData.insurancePolicy,
            insuranceExp: truckData.insuranceExp,
            jurisdiction: truckData.jurisdiction || 'IFTA',
            gvwr: truckData.gvwr,
            gcwr: truckData.gcwr,
            dotNumber: truckData.dotNumber,
            status: truckData.status || 'available',
            currentLocation: truckData.currentLocation,
            assignedYardId: truckData.assignedYardId,
            odometer: truckData.odometer,
            odometerUnit: truckData.odometerUnit || 'miles',
            engineHours: truckData.engineHours,
            currentDriverId: truckData.currentDriverId,
            attachedTrailerId: truckData.attachedTrailerId,
            currentLoadId: truckData.currentLoadId,
            documents: [],
            lastUpdated: new Date(),
        };
        const truck = truck_entity_1.Truck.create(truckProps);
        await this.truckRepository.save(truck);
        return truck;
    }
    async addDocumentsToTruck(truckId, documentData) {
        const truck = await this.truckRepository.findById(truckId);
        if (!truck) {
            throw new Error('Truck not found. Cannot add documents to non-existent truck.');
        }
        for (const docData of documentData) {
            const document = truck_document_entity_1.TruckDocument.create(truckId, {
                documentType: docData.documentType,
                fileName: docData.fileName,
                filePath: docData.filePath,
                fileSize: docData.fileSize,
                mimeType: docData.mimeType,
                description: docData.description,
                uploadedBy: docData.uploadedBy,
                uploadedAt: new Date(),
            });
            truck.addDocument(document);
        }
        await this.truckRepository.update(truck);
    }
    async updateTruckOdometer(truckId, newReading) {
        const truck = await this.truckRepository.findById(truckId);
        if (!truck) {
            throw new Error('Truck not found. Cannot update odometer for non-existent truck.');
        }
        truck.updateOdometer(newReading);
        await this.truckRepository.update(truck);
    }
    async changeTruckStatus(truckId, newStatus) {
        const truck = await this.truckRepository.findById(truckId);
        if (!truck) {
            throw new Error('Truck not found. Cannot change status for non-existent truck.');
        }
        truck.changeStatus(newStatus);
        await this.truckRepository.update(truck);
    }
    async getTrucksThatNeedAttention() {
        const allTrucks = await this.truckRepository.findAll();
        const report = {
            trucksInMaintenance: [],
            trucksOutOfService: [],
            trucksMissingDocuments: [],
            trucksWithHighMileage: [],
        };
        for (const truck of allTrucks) {
            if (truck.isInMaintenance()) {
                report.trucksInMaintenance.push(truck);
            }
            if (truck.isOutOfService()) {
                report.trucksOutOfService.push(truck);
            }
            if (!truck.hasRequiredDocuments()) {
                report.trucksMissingDocuments.push(truck);
            }
            if (truck.odometer && truck.odometer > 300000) {
                report.trucksWithHighMileage.push(truck);
            }
        }
        return report;
    }
};
exports.TruckDomainService = TruckDomainService;
exports.TruckDomainService = TruckDomainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exports.TRUCK_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [Object])
], TruckDomainService);
//# sourceMappingURL=truck.service.js.map