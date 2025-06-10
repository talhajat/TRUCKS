"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckDocument = void 0;
class TruckDocument {
    constructor(_id, _truckId, _props) {
        this._id = _id;
        this._truckId = _truckId;
        this._props = _props;
    }
    static create(truckId, props, id) {
        const document = new TruckDocument(id || TruckDocument.generateId(), truckId, {
            ...props,
            uploadedAt: props.uploadedAt || new Date(),
        });
        document.validate();
        return document;
    }
    static fromPersistence(id, truckId, props) {
        return new TruckDocument(id, truckId, props);
    }
    validate() {
        if (!this._props.documentType?.trim()) {
            throw new Error('Document type is required');
        }
        if (!this._props.fileName?.trim()) {
            throw new Error('File name is required');
        }
        if (!this._props.filePath?.trim()) {
            throw new Error('File path is required');
        }
        const validDocumentTypes = [
            'vehicle_title',
            'lease_agreement',
            'registration',
            'insurance_certificate',
            'inspection_report'
        ];
        if (!validDocumentTypes.includes(this._props.documentType)) {
            throw new Error(`Invalid document type. Must be one of: ${validDocumentTypes.join(', ')}`);
        }
        if (this._props.fileSize && this._props.fileSize > 10 * 1024 * 1024) {
            throw new Error('File size cannot exceed 10MB');
        }
        if (this._props.mimeType) {
            const allowedMimeTypes = [
                'application/pdf',
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedMimeTypes.includes(this._props.mimeType)) {
                throw new Error(`Unsupported file type. Allowed types: ${allowedMimeTypes.join(', ')}`);
            }
        }
    }
    updateDescription(description) {
        this._props.description = description?.trim();
    }
    isImage() {
        if (!this._props.mimeType)
            return false;
        return this._props.mimeType.startsWith('image/');
    }
    isPdf() {
        return this._props.mimeType === 'application/pdf';
    }
    getFileExtension() {
        const parts = this._props.fileName.split('.');
        return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
    }
    get id() {
        return this._id;
    }
    get truckId() {
        return this._truckId;
    }
    get documentType() {
        return this._props.documentType;
    }
    get fileName() {
        return this._props.fileName;
    }
    get filePath() {
        return this._props.filePath;
    }
    get fileSize() {
        return this._props.fileSize;
    }
    get mimeType() {
        return this._props.mimeType;
    }
    get description() {
        return this._props.description;
    }
    get uploadedBy() {
        return this._props.uploadedBy;
    }
    get uploadedAt() {
        return this._props.uploadedAt;
    }
    get props() {
        return { ...this._props };
    }
    static generateId() {
        return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    getDocumentTypeName() {
        const typeNames = {
            'vehicle_title': 'Vehicle Title',
            'lease_agreement': 'Lease Agreement',
            'registration': 'Registration Document',
            'insurance_certificate': 'Insurance Certificate',
            'inspection_report': 'Inspection Report'
        };
        return typeNames[this._props.documentType] || this._props.documentType;
    }
    getFormattedFileSize() {
        if (!this._props.fileSize)
            return 'Unknown size';
        const bytes = this._props.fileSize;
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
exports.TruckDocument = TruckDocument;
//# sourceMappingURL=truck-document.entity.js.map