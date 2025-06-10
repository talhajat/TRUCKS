export interface TruckDocumentProps {
    documentType: string;
    fileName: string;
    filePath: string;
    fileSize?: number;
    mimeType?: string;
    description?: string;
    uploadedBy?: string;
    uploadedAt: Date;
}
export declare class TruckDocument {
    private readonly _id;
    private readonly _truckId;
    private _props;
    private constructor();
    static create(truckId: string, props: TruckDocumentProps, id?: string): TruckDocument;
    static fromPersistence(id: string, truckId: string, props: TruckDocumentProps): TruckDocument;
    private validate;
    updateDescription(description: string): void;
    isImage(): boolean;
    isPdf(): boolean;
    getFileExtension(): string;
    get id(): string;
    get truckId(): string;
    get documentType(): string;
    get fileName(): string;
    get filePath(): string;
    get fileSize(): number | undefined;
    get mimeType(): string | undefined;
    get description(): string | undefined;
    get uploadedBy(): string | undefined;
    get uploadedAt(): Date;
    get props(): TruckDocumentProps;
    private static generateId;
    getDocumentTypeName(): string;
    getFormattedFileSize(): string;
}
