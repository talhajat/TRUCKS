/**
 * Document Type Enum
 * 
 * Represents the types of documents that can be associated with a truck.
 * Values use snake_case to match database conventions.
 */
export enum DocumentType {
  REGISTRATION = 'registration',
  INSURANCE = 'insurance',
  INSPECTION = 'inspection',
  TITLE = 'title',
  LEASE_AGREEMENT = 'lease_agreement',
  OTHER = 'other'
}