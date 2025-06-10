/**
 * PRISMA DATABASE MODULE
 * 
 * This module sets up our connection to the PostgreSQL database.
 * Think of this as the bridge between our application and the database.
 * It handles all the technical details of connecting to and talking with the database.
 */

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * @Global decorator makes this module available everywhere in our application
 * This means any part of our app can use the database connection without importing this module
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make PrismaService available to other modules
})
export class PrismaModule {}