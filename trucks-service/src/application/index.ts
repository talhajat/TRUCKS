/**
 * APPLICATION LAYER BARREL EXPORT
 * 
 * This is the main entry point for the application layer.
 * It exports all application components (use cases, DTOs)
 * from one convenient location.
 * 
 * This follows the Clean Architecture principle of having clear boundaries
 * between layers and making the application layer easily accessible.
 */

// Use Cases
export * from './use-cases';

// Application Services
export * from './services';

// Data Transfer Objects
export * from './dtos';