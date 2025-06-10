/**
 * TRUCK DOCUMENT ENTITY
 * 
 * Child entity within the Truck aggregate that represents uploaded documents
 * (vehicle title, registration, insurance, etc.)
 * This entity is owned and managed by the Truck aggregate root
 */

export interface TruckDocumentProps {
  documentType: string;        // vehicle_title, lease_agreement, registration, etc.
  fileName: string;           // Original filename
  filePath: string;           // Storage path/URL
  fileSize?: number;          // File size in bytes
  mimeType?: string;          // MIME type (application/pdf, image/jpeg, etc.)
  description?: string;       // Optional description
  uploadedBy?: string;        // User who uploaded the document
  uploadedAt: Date;          // When document was uploaded
}

export class TruckDocument {
  private constructor(
    private readonly _id: string,
    private readonly _truckId: string,
    private _props: TruckDocumentProps,
  ) {}

  /**
   * Factory method to create new document
   */
  public static create(
    truckId: string,
    props: TruckDocumentProps,
    id?: string
  ): TruckDocument {
    const document = new TruckDocument(
      id || TruckDocument.generateId(),
      truckId,
      {
        ...props,
        uploadedAt: props.uploadedAt || new Date(),
      }
    );

    // Validate the document
    document.validate();
    
    return document;
  }

  /**
   * Factory method for reconstitution from persistence
   */
  public static fromPersistence(
    id: string,
    truckId: string,
    props: TruckDocumentProps
  ): TruckDocument {
    return new TruckDocument(id, truckId, props);
  }

  /**
   * Business validation
   */
  private validate(): void {
    if (!this._props.documentType?.trim()) {
      throw new Error('Document type is required');
    }

    if (!this._props.fileName?.trim()) {
      throw new Error('File name is required');
    }

    if (!this._props.filePath?.trim()) {
      throw new Error('File path is required');
    }

    // Validate document type
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

    // Validate file size (max 10MB)
    if (this._props.fileSize && this._props.fileSize > 10 * 1024 * 1024) {
      throw new Error('File size cannot exceed 10MB');
    }

    // Validate MIME type if provided
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

  /**
   * Update document description
   */
  public updateDescription(description: string): void {
    this._props.description = description?.trim();
  }

  /**
   * Check if document is an image
   */
  public isImage(): boolean {
    if (!this._props.mimeType) return false;
    return this._props.mimeType.startsWith('image/');
  }

  /**
   * Check if document is a PDF
   */
  public isPdf(): boolean {
    return this._props.mimeType === 'application/pdf';
  }

  /**
   * Get file extension from filename
   */
  public getFileExtension(): string {
    const parts = this._props.fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  }

  /**
   * GETTERS
   */
  get id(): string {
    return this._id;
  }

  get truckId(): string {
    return this._truckId;
  }

  get documentType(): string {
    return this._props.documentType;
  }

  get fileName(): string {
    return this._props.fileName;
  }

  get filePath(): string {
    return this._props.filePath;
  }

  get fileSize(): number | undefined {
    return this._props.fileSize;
  }

  get mimeType(): string | undefined {
    return this._props.mimeType;
  }

  get description(): string | undefined {
    return this._props.description;
  }

  get uploadedBy(): string | undefined {
    return this._props.uploadedBy;
  }

  get uploadedAt(): Date {
    return this._props.uploadedAt;
  }

  /**
   * Get all properties (for persistence)
   */
  get props(): TruckDocumentProps {
    return { ...this._props };
  }

  /**
   * PRIVATE HELPER METHODS
   */
  private static generateId(): string {
    return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get human-readable document type name
   */
  public getDocumentTypeName(): string {
    const typeNames: Record<string, string> = {
      'vehicle_title': 'Vehicle Title',
      'lease_agreement': 'Lease Agreement',
      'registration': 'Registration Document',
      'insurance_certificate': 'Insurance Certificate',
      'inspection_report': 'Inspection Report'
    };

    return typeNames[this._props.documentType] || this._props.documentType;
  }

  /**
   * Get formatted file size
   */
  public getFormattedFileSize(): string {
    if (!this._props.fileSize) return 'Unknown size';

    const bytes = this._props.fileSize;
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}