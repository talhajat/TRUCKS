/**
 * MAIN APPLICATION MODULE
 * 
 * This is the central hub that connects all parts of our truck management system.
 * Think of it like the main control panel that coordinates everything.
 * 
 * What this module does:
 * 1. Connects to the database (PostgreSQL)
 * 2. Loads configuration settings
 * 3. Registers all the truck management features
 * 4. Sets up file upload capabilities
 * 5. Organizes all the different parts of the system
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { TrucksModule } from './presentation/trucks/trucks.module';

/**
 * APP MODULE CONFIGURATION
 * This decorator tells NestJS how to set up our application
 */
@Module({
  imports: [
    /**
     * CONFIGURATION MODULE
     * Loads environment variables (database connection, ports, etc.)
     * This allows us to have different settings for development vs production
     */
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available everywhere in the app
      envFilePath: '.env', // Loads settings from .env file
    }),

    /**
     * DATABASE MODULE
     * Sets up connection to PostgreSQL database where truck data is stored
     * Uses Prisma as the database toolkit for easy data management
     */
    PrismaModule,

    /**
     * BUSINESS FEATURE MODULES
     * Each module handles a specific part of truck management
     */
    TrucksModule,    // Main truck management (create, update, list trucks)
  ],
  
  /**
   * GLOBAL CONTROLLERS
   * These handle incoming web requests (currently none at app level)
   */
  controllers: [],
  
  /**
   * GLOBAL PROVIDERS
   * These are services available throughout the entire application
   */
  providers: [],
})
export class AppModule {
  /**
   * APPLICATION STARTUP MESSAGE
   * This runs when the module is initialized
   */
  constructor() {
    console.log('🚛 TRUCKS Microservice Module Initialized');
    console.log('📦 Modules loaded: Database, Trucks');
  }
}