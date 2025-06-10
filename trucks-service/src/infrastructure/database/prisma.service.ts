/**
 * PRISMA DATABASE SERVICE
 * 
 * This service manages our connection to the PostgreSQL database.
 * Think of this as the "database connector" that handles all the technical
 * details of talking to the database safely and efficiently.
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * @Injectable makes this class available for dependency injection
 * OnModuleInit runs setup when the module starts
 * OnModuleDestroy runs cleanup when the module shuts down
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  /**
   * Connect to the database when the module starts up
   * This ensures we have a working database connection before handling requests
   */
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the database when the module shuts down
   * This ensures we clean up database connections properly
   */
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('✅ Database disconnected successfully');
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error);
    }
  }

  /**
   * Health check method to verify database connection
   * Useful for monitoring and debugging
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Get database connection info for debugging
   */
  getConnectionInfo(): string {
    return `Connected to PostgreSQL database`;
  }
}