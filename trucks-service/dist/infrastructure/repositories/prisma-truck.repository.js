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
exports.PrismaTruckRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const truck_entity_1 = require("../../domain/entities/truck.entity");
const truck_document_entity_1 = require("../../domain/entities/truck-document.entity");
const vehicle_id_vo_1 = require("../../domain/value-objects/vehicle-id.vo");
const vin_vo_1 = require("../../domain/value-objects/vin.vo");
let PrismaTruckRepository = class PrismaTruckRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(truck) {
        const props = truck.props;
        try {
            await this.prisma.truck.create({
                data: {
                    id: truck.id,
                    vehicleId: props.vehicleId.value,
                    name: props.name,
                    vin: props.vin.value,
                    make: props.make,
                    model: props.model,
                    year: props.year,
                    color: props.color,
                    engineMake: props.engineMake,
                    engineModel: props.engineModel,
                    horsepower: props.horsepower,
                    transmissionType: this.mapTransmissionType(props.transmissionType),
                    numGears: props.numGears,
                    ownershipType: this.mapOwnershipType(props.ownershipType),
                    purchaseDate: props.purchaseDate,
                    leaseEndDate: props.leaseEndDate,
                    purchasePrice: props.purchasePrice,
                    licensePlate: props.licensePlate,
                    issuingState: props.issuingState,
                    registrationExp: props.registrationExp,
                    insurancePolicy: props.insurancePolicy,
                    insuranceExp: props.insuranceExp,
                    jurisdiction: props.jurisdiction,
                    gvwr: props.gvwr,
                    gcwr: props.gcwr,
                    dotNumber: props.dotNumber,
                    status: this.mapTruckStatus(props.status),
                    currentLocation: props.currentLocation,
                    assignedYardId: props.assignedYardId,
                    odometer: props.odometer,
                    odometerUnit: this.mapDistanceUnit(props.odometerUnit),
                    engineHours: props.engineHours,
                    currentDriverId: props.currentDriverId,
                    attachedTrailerId: props.attachedTrailerId,
                    currentLoadId: props.currentLoadId,
                    lastUpdated: props.lastUpdated,
                    documents: props.documents && props.documents.length > 0 ? {
                        create: props.documents.map(doc => ({
                            id: doc.id,
                            documentType: this.mapDocumentType(doc.documentType),
                            fileName: doc.fileName,
                            filePath: doc.filePath,
                            fileSize: doc.fileSize,
                            mimeType: doc.mimeType,
                            description: doc.description,
                            uploadedBy: doc.uploadedBy,
                            lastUpdated: doc.uploadedAt,
                        }))
                    } : undefined,
                },
            });
        }
        catch (error) {
            throw new Error(`Failed to save truck: ${error.message}`);
        }
    }
    async update(truck) {
        const props = truck.props;
        try {
            await this.prisma.truck.update({
                where: { id: truck.id },
                data: {
                    vehicleId: props.vehicleId.value,
                    name: props.name,
                    vin: props.vin.value,
                    make: props.make,
                    model: props.model,
                    year: props.year,
                    color: props.color,
                    engineMake: props.engineMake,
                    engineModel: props.engineModel,
                    horsepower: props.horsepower,
                    transmissionType: this.mapTransmissionType(props.transmissionType),
                    numGears: props.numGears,
                    ownershipType: this.mapOwnershipType(props.ownershipType),
                    purchaseDate: props.purchaseDate,
                    leaseEndDate: props.leaseEndDate,
                    purchasePrice: props.purchasePrice,
                    licensePlate: props.licensePlate,
                    issuingState: props.issuingState,
                    registrationExp: props.registrationExp,
                    insurancePolicy: props.insurancePolicy,
                    insuranceExp: props.insuranceExp,
                    jurisdiction: props.jurisdiction,
                    gvwr: props.gvwr,
                    gcwr: props.gcwr,
                    dotNumber: props.dotNumber,
                    status: this.mapTruckStatus(props.status),
                    currentLocation: props.currentLocation,
                    assignedYardId: props.assignedYardId,
                    odometer: props.odometer,
                    odometerUnit: this.mapDistanceUnit(props.odometerUnit),
                    engineHours: props.engineHours,
                    currentDriverId: props.currentDriverId,
                    attachedTrailerId: props.attachedTrailerId,
                    currentLoadId: props.currentLoadId,
                    lastUpdated: props.lastUpdated,
                    updatedAt: new Date(),
                },
            });
        }
        catch (error) {
            throw new Error(`Failed to update truck: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const truckData = await this.prisma.truck.findUnique({
                where: { id },
                include: {
                    documents: true,
                    assignedYard: true,
                },
            });
            if (!truckData) {
                return null;
            }
            return this.mapToDomainEntity(truckData);
        }
        catch (error) {
            throw new Error(`Failed to find truck by ID: ${error.message}`);
        }
    }
    async findByVehicleId(vehicleId) {
        try {
            const truckData = await this.prisma.truck.findUnique({
                where: { vehicleId: vehicleId.value },
                include: {
                    documents: true,
                    assignedYard: true,
                },
            });
            if (!truckData) {
                return null;
            }
            return this.mapToDomainEntity(truckData);
        }
        catch (error) {
            throw new Error(`Failed to find truck by vehicle ID: ${error.message}`);
        }
    }
    async findByVin(vin) {
        try {
            const truckData = await this.prisma.truck.findUnique({
                where: { vin: vin.value },
                include: {
                    documents: true,
                    assignedYard: true,
                },
            });
            if (!truckData) {
                return null;
            }
            return this.mapToDomainEntity(truckData);
        }
        catch (error) {
            throw new Error(`Failed to find truck by VIN: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const trucksData = await this.prisma.truck.findMany({
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    vehicleId: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find all trucks: ${error.message}`);
        }
    }
    async findByStatus(status) {
        try {
            const trucksData = await this.prisma.truck.findMany({
                where: {
                    status: this.mapTruckStatus(status)
                },
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    vehicleId: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find trucks by status: ${error.message}`);
        }
    }
    async findByDriverId(driverId) {
        try {
            const trucksData = await this.prisma.truck.findMany({
                where: { currentDriverId: driverId },
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    vehicleId: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find trucks by driver ID: ${error.message}`);
        }
    }
    async findByLocation(locationId) {
        try {
            const trucksData = await this.prisma.truck.findMany({
                where: { assignedYardId: locationId },
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    vehicleId: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find trucks by location: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await this.prisma.truck.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(`Failed to delete truck: ${error.message}`);
        }
    }
    async existsByVehicleId(vehicleId) {
        try {
            const count = await this.prisma.truck.count({
                where: { vehicleId: vehicleId.value },
            });
            return count > 0;
        }
        catch (error) {
            throw new Error(`Failed to check vehicle ID existence: ${error.message}`);
        }
    }
    async existsByVin(vin) {
        try {
            const count = await this.prisma.truck.count({
                where: { vin: vin.value },
            });
            return count > 0;
        }
        catch (error) {
            throw new Error(`Failed to check VIN existence: ${error.message}`);
        }
    }
    async findMaintenanceDue(odometerThreshold = 300000, daysThreshold = 30) {
        try {
            const thresholdDate = new Date();
            thresholdDate.setDate(thresholdDate.getDate() - (daysThreshold * 30));
            const trucksData = await this.prisma.truck.findMany({
                where: {
                    OR: [
                        { odometer: { gte: odometerThreshold } },
                        { lastUpdated: { lte: thresholdDate } },
                    ],
                },
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    odometer: 'desc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find trucks needing maintenance: ${error.message}`);
        }
    }
    async findWithExpiringDocuments(daysAhead) {
        try {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + daysAhead);
            const trucksData = await this.prisma.truck.findMany({
                where: {
                    OR: [
                        { registrationExp: { lte: expirationDate } },
                        { insuranceExp: { lte: expirationDate } },
                    ],
                },
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    registrationExp: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to find trucks with expiring documents: ${error.message}`);
        }
    }
    async search(criteria) {
        try {
            const where = {};
            if (criteria.make) {
                where.make = { contains: criteria.make, mode: 'insensitive' };
            }
            if (criteria.model) {
                where.model = { contains: criteria.model, mode: 'insensitive' };
            }
            if (criteria.year) {
                where.year = criteria.year;
            }
            if (criteria.status) {
                where.status = this.mapTruckStatus(criteria.status);
            }
            if (criteria.locationId) {
                where.assignedYardId = criteria.locationId;
            }
            if (criteria.driverId) {
                where.currentDriverId = criteria.driverId;
            }
            if (criteria.minOdometer || criteria.maxOdometer) {
                where.odometer = {};
                if (criteria.minOdometer) {
                    where.odometer.gte = criteria.minOdometer;
                }
                if (criteria.maxOdometer) {
                    where.odometer.lte = criteria.maxOdometer;
                }
            }
            if (criteria.ownershipType) {
                where.ownershipType = this.mapOwnershipType(criteria.ownershipType);
            }
            const trucksData = await this.prisma.truck.findMany({
                where,
                include: {
                    documents: true,
                    assignedYard: true,
                },
                orderBy: {
                    vehicleId: 'asc',
                },
            });
            return trucksData.map(truckData => this.mapToDomainEntity(truckData));
        }
        catch (error) {
            throw new Error(`Failed to search trucks: ${error.message}`);
        }
    }
    mapToDomainEntity(truckData) {
        const documents = truckData.documents?.map((doc) => truck_document_entity_1.TruckDocument.fromPersistence(doc.id, truckData.id, {
            documentType: this.mapFromDocumentType(doc.documentType),
            fileName: doc.fileName,
            filePath: doc.filePath,
            fileSize: doc.fileSize,
            mimeType: doc.mimeType,
            description: doc.description,
            uploadedBy: doc.uploadedBy,
            uploadedAt: doc.lastUpdated,
        })) || [];
        const currentLocation = truckData.assignedYard?.name || truckData.currentLocation;
        const truckProps = {
            vehicleId: vehicle_id_vo_1.VehicleId.fromString(truckData.vehicleId),
            name: truckData.name,
            vin: vin_vo_1.VIN.fromString(truckData.vin),
            make: truckData.make,
            model: truckData.model,
            year: truckData.year,
            color: truckData.color,
            engineMake: truckData.engineMake,
            engineModel: truckData.engineModel,
            horsepower: truckData.horsepower,
            transmissionType: this.mapFromTransmissionType(truckData.transmissionType),
            numGears: truckData.numGears,
            ownershipType: this.mapFromOwnershipType(truckData.ownershipType),
            purchaseDate: truckData.purchaseDate,
            leaseEndDate: truckData.leaseEndDate,
            purchasePrice: truckData.purchasePrice ? Number(truckData.purchasePrice) : undefined,
            licensePlate: truckData.licensePlate,
            issuingState: truckData.issuingState,
            registrationExp: truckData.registrationExp,
            insurancePolicy: truckData.insurancePolicy,
            insuranceExp: truckData.insuranceExp,
            jurisdiction: truckData.jurisdiction,
            gvwr: truckData.gvwr,
            gcwr: truckData.gcwr,
            dotNumber: truckData.dotNumber,
            status: this.mapFromTruckStatus(truckData.status),
            currentLocation,
            assignedYardId: truckData.assignedYardId,
            odometer: truckData.odometer,
            odometerUnit: this.mapFromDistanceUnit(truckData.odometerUnit),
            engineHours: truckData.engineHours,
            currentDriverId: truckData.currentDriverId,
            attachedTrailerId: truckData.attachedTrailerId,
            currentLoadId: truckData.currentLoadId,
            documents,
            createdAt: truckData.createdAt,
            updatedAt: truckData.updatedAt,
            lastUpdated: truckData.lastUpdated,
        };
        return truck_entity_1.Truck.fromPersistence(truckData.id, truckProps);
    }
    mapTruckStatus(status) {
        return status;
    }
    mapFromTruckStatus(status) {
        return status;
    }
    mapTransmissionType(type) {
        const mapping = {
            'manual': 'MANUAL',
            'automatic': 'AUTOMATIC',
            'automated_manual': 'AUTOMATED_MANUAL',
        };
        return mapping[type] || 'MANUAL';
    }
    mapFromTransmissionType(type) {
        const mapping = {
            'MANUAL': 'manual',
            'AUTOMATIC': 'automatic',
            'AUTOMATED_MANUAL': 'automated_manual',
        };
        return mapping[type] || 'manual';
    }
    mapOwnershipType(type) {
        const mapping = {
            'owned': 'OWNED',
            'leased': 'LEASED',
            'rented': 'RENTED',
        };
        return mapping[type] || 'OWNED';
    }
    mapFromOwnershipType(type) {
        const mapping = {
            'OWNED': 'owned',
            'LEASED': 'leased',
            'RENTED': 'rented',
        };
        return mapping[type] || 'owned';
    }
    mapDistanceUnit(unit) {
        const mapping = {
            'miles': 'MILES',
            'kilometers': 'KILOMETERS',
        };
        return mapping[unit] || 'MILES';
    }
    mapFromDistanceUnit(unit) {
        const mapping = {
            'MILES': 'miles',
            'KILOMETERS': 'kilometers',
        };
        return mapping[unit] || 'miles';
    }
    mapDocumentType(type) {
        const mapping = {
            'vehicle_title': 'VEHICLE_TITLE',
            'lease_agreement': 'LEASE_AGREEMENT',
            'registration': 'REGISTRATION',
            'insurance_certificate': 'INSURANCE_CERTIFICATE',
            'inspection_report': 'INSPECTION_REPORT',
        };
        return mapping[type] || 'VEHICLE_TITLE';
    }
    mapFromDocumentType(type) {
        const mapping = {
            'VEHICLE_TITLE': 'vehicle_title',
            'LEASE_AGREEMENT': 'lease_agreement',
            'REGISTRATION': 'registration',
            'INSURANCE_CERTIFICATE': 'insurance_certificate',
            'INSPECTION_REPORT': 'inspection_report',
        };
        return mapping[type] || 'vehicle_title';
    }
};
exports.PrismaTruckRepository = PrismaTruckRepository;
exports.PrismaTruckRepository = PrismaTruckRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTruckRepository);
//# sourceMappingURL=prisma-truck.repository.js.map