/**
 * INFRASTRUCTURE LAYER BARREL EXPORT
 * 
 * This is the main entry point for the infrastructure layer.
 * It exports all infrastructure components (database, repositories, external services)
 * from one convenient location.
 * 
 * This follows the Clean Architecture principle of having clear boundaries
 * between layers and making the infrastructure layer easily accessible.
 */

// Database Infrastructure
export * from './database';

// Repository Implementations
export * from './repositories';