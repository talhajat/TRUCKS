/**
 * DOMAIN LAYER BARREL EXPORT
 * 
 * This is the main entry point for the domain layer.
 * It exports all domain components (entities, value objects, repositories, services)
 * from one convenient location.
 * 
 * This follows the Clean Architecture principle of having clear boundaries
 * between layers and making the domain layer easily accessible.
 */

// Entities
export * from './entities';

// Value Objects
export * from './value-objects';

// Repository Interfaces
export * from './repositories';

// Domain Services
export * from './services';