"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Truck = void 0;
class Truck {
    constructor(_id, _props) {
        this._id = _id;
        this._props = _props;
    }
    static create(props, id) {
        const truckProps = {
            ...props,
            status: props.status || 'available',
            transmissionType: props.transmissionType || 'manual',
            ownershipType: props.ownershipType || 'owned',
            odometerUnit: props.odometerUnit || 'miles',
            jurisdiction: props.jurisdiction || 'IFTA',
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
            lastUpdated: props.lastUpdated || new Date(),
        };
        const truck = new Truck(id || Truck.generateId(), truckProps);
        truck.validate();
        return truck;
    }
    static fromPersistence(id, props) {
        return new Truck(id, props);
    }
    validate() {
        if (!this._props.vehicleId) {
            throw new Error('Vehicle ID is required');
        }
        if (!this._props.vin) {
            throw new Error('VIN is required');
        }
        if (!this._props.make?.trim()) {
            throw new Error('Make is required');
        }
        if (!this._props.model?.trim()) {
            throw new Error('Model is required');
        }
        if (!this._props.year || this._props.year < 1900 || this._props.year > new Date().getFullYear() + 2) {
            throw new Error('Year must be between 1900 and 2 years in the future');
        }
        if (this._props.ownershipType === 'leased' && this._props.purchaseDate && this._props.leaseEndDate) {
            if (this._props.leaseEndDate <= this._props.purchaseDate) {
                throw new Error('Lease end date must be after purchase date');
            }
        }
        if (this._props.odometer !== undefined && this._props.odometer < 0) {
            throw new Error('Odometer cannot be negative');
        }
        if (this._props.engineHours !== undefined && this._props.engineHours < 0) {
            throw new Error('Engine hours cannot be negative');
        }
        const validStatuses = ['available', 'assigned', 'maintenance', 'out_of_service'];
        if (!validStatuses.includes(this._props.status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        const validTransmissions = ['manual', 'automatic', 'automated_manual'];
        if (!validTransmissions.includes(this._props.transmissionType)) {
            throw new Error(`Invalid transmission type. Must be one of: ${validTransmissions.join(', ')}`);
        }
        const validOwnership = ['owned', 'leased', 'rented'];
        if (!validOwnership.includes(this._props.ownershipType)) {
            throw new Error(`Invalid ownership type. Must be one of: ${validOwnership.join(', ')}`);
        }
    }
    assignDriver(driverId) {
        if (this._props.status !== 'available') {
            throw new Error('Cannot assign driver to truck that is not available');
        }
        this._props.currentDriverId = driverId;
        this._props.status = 'assigned';
        this.updateTimestamp();
    }
    unassignDriver() {
        this._props.currentDriverId = undefined;
        this._props.status = 'available';
        this.updateTimestamp();
    }
    attachTrailer(trailerId) {
        if (this._props.status === 'maintenance' || this._props.status === 'out_of_service') {
            throw new Error('Cannot attach trailer to truck in maintenance or out of service');
        }
        this._props.attachedTrailerId = trailerId;
        this.updateTimestamp();
    }
    detachTrailer() {
        this._props.attachedTrailerId = undefined;
        this.updateTimestamp();
    }
    updateOdometer(newReading) {
        if (newReading < 0) {
            throw new Error('Odometer reading cannot be negative');
        }
        if (this._props.odometer && newReading < this._props.odometer) {
            throw new Error('Odometer reading cannot decrease');
        }
        this._props.odometer = newReading;
        this.updateTimestamp();
    }
    changeStatus(newStatus) {
        const validStatuses = ['available', 'assigned', 'maintenance', 'out_of_service'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        if (newStatus === 'assigned' && !this._props.currentDriverId) {
            throw new Error('Cannot set status to assigned without a driver');
        }
        this._props.status = newStatus;
        this.updateTimestamp();
    }
    updateLocation(location, yardId) {
        this._props.currentLocation = location;
        if (yardId) {
            this._props.assignedYardId = yardId;
        }
        this.updateTimestamp();
    }
    addDocument(document) {
        if (!this._props.documents) {
            this._props.documents = [];
        }
        const uniqueDocTypes = ['vehicle_title', 'registration', 'insurance_certificate'];
        if (uniqueDocTypes.includes(document.documentType)) {
            const existingDoc = this._props.documents.find(d => d.documentType === document.documentType);
            if (existingDoc) {
                throw new Error(`This truck already has a ${document.getDocumentTypeName()}. Please remove the old one first.`);
            }
        }
        this._props.documents.push(document);
        this.updateTimestamp();
    }
    removeDocument(documentId) {
        if (!this._props.documents) {
            return;
        }
        const index = this._props.documents.findIndex(d => d.id === documentId);
        if (index === -1) {
            throw new Error('Cannot find that document in this truck\'s files');
        }
        this._props.documents.splice(index, 1);
        this.updateTimestamp();
    }
    getDocumentsByType(documentType) {
        if (!this._props.documents) {
            return [];
        }
        return this._props.documents.filter(d => d.documentType === documentType);
    }
    getDocuments() {
        return this._props.documents || [];
    }
    hasRequiredDocuments() {
        const requiredDocs = ['vehicle_title', 'registration', 'insurance_certificate'];
        if (!this._props.documents) {
            return false;
        }
        return requiredDocs.every(docType => this._props.documents.some(d => d.documentType === docType));
    }
    isReadyForOperation() {
        return this.hasRequiredDocuments() &&
            (this._props.status === 'available' || this._props.status === 'assigned');
    }
    get id() {
        return this._id;
    }
    get vehicleId() {
        return this._props.vehicleId;
    }
    get vehicleIdValue() {
        return this._props.vehicleId.value;
    }
    get name() {
        return this._props.name;
    }
    get vin() {
        return this._props.vin;
    }
    get vinValue() {
        return this._props.vin.value;
    }
    get make() {
        return this._props.make;
    }
    get model() {
        return this._props.model;
    }
    get year() {
        return this._props.year;
    }
    get color() {
        return this._props.color;
    }
    get status() {
        return this._props.status;
    }
    get currentLocation() {
        return this._props.currentLocation;
    }
    get odometer() {
        return this._props.odometer;
    }
    get engineHours() {
        return this._props.engineHours;
    }
    get currentDriverId() {
        return this._props.currentDriverId;
    }
    get attachedTrailerId() {
        return this._props.attachedTrailerId;
    }
    get lastUpdated() {
        return this._props.lastUpdated;
    }
    get props() {
        return { ...this._props };
    }
    updateTimestamp() {
        this._props.lastUpdated = new Date();
        this._props.updatedAt = new Date();
    }
    static generateId() {
        return `truck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    isAvailable() {
        return this._props.status === 'available';
    }
    isAssigned() {
        return this._props.status === 'assigned';
    }
    isInMaintenance() {
        return this._props.status === 'maintenance';
    }
    isOutOfService() {
        return this._props.status === 'out_of_service';
    }
}
exports.Truck = Truck;
//# sourceMappingURL=truck.entity.js.map