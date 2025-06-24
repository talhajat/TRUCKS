/**
 * TRUCKS MODULE
 * 
 * This module wires together all the components needed for truck management.
 * Think of this as the "assembly line supervisor" that makes sure all the parts
 * work together properly - controllers, use cases, services, and repositories.
 * 
 * This follows NestJS dependency injection patterns and Clean Architecture principles.
 */

import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { CreateTruckUseCase, GetAllTrucksUseCase } from '../../application/use-cases';
import { TruckDomainService } from '../../domain/services/truck.service';
import { TruckApplicationService } from '../../application/services/truck-application.service';
import { PrismaTruckRepository } from '../../infrastructure/repositories/prisma-truck.repository';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

// Token for dependency injection
export const TRUCK_REPOSITORY_TOKEN = 'ITruckRepository';

/**
 * Trucks Module Configuration
 * This tells NestJS how to set up dependency injection for truck management
 */
@Module({
  imports: [
    PrismaModule, // Import PrismaModule to use PrismaService
  ],
  controllers: [
    TrucksController, // HTTP request handlers
  ],
  providers: [
    // Use Cases (Application Layer)
    CreateTruckUseCase,
    GetAllTrucksUseCase,
    
    // Application Services (Application Layer)
    TruckApplicationService,
    
    // Domain Services (Domain Layer)
    TruckDomainService,
    
    // Repository Implementation (Infrastructure Layer)
    {
      provide: TRUCK_REPOSITORY_TOKEN, // Interface token
      useClass: PrismaTruckRepository, // Concrete implementation
    },
  ],
  exports: [
    // Export use cases so other modules can use them if needed
    CreateTruckUseCase,
    GetAllTrucksUseCase,
  ],
})
export class TrucksModule {
  constructor() {
    console.log('🚛 Trucks Module initialized');
    console.log('📦 Components loaded: Controller, Use Cases, Domain Service, Repository');
  }
}