/**
 * MAIN APPLICATION ENTRY POINT
 * 
 * This file starts up the TRUCKS microservice backend server.
 * Think of this as the "power button" that turns on our truck management system.
 * 
 * What this file does:
 * 1. Creates and configures the web server
 * 2. Sets up security and data validation rules
 * 3. Enables communication with the frontend website
 * 4. Creates API documentation for developers
 * 5. Starts the server so it can receive requests
 * 
 * NOTE: Authentication/Authorization will be handled by the Users microservice
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * BOOTSTRAP FUNCTION
 * This is the main function that starts everything up
 */
async function bootstrap() {
  // Create the web application server
  const app = await NestFactory.create(AppModule);

  /**
   * CORS CONFIGURATION
   * CORS = Cross-Origin Resource Sharing
   * This allows our frontend website to talk to this backend server
   * Without this, browsers would block the communication for security reasons
   */
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Frontend website addresses
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // What actions are allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // What data can be sent
  });

  /**
   * DATA VALIDATION SETUP
   * This automatically checks that incoming data is correct and safe
   * For example: making sure truck VIN numbers are provided, dates are valid, etc.
   * Note: User authentication will be handled by Users microservice
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow expected data fields
      forbidNonWhitelisted: true, // Reject unexpected data
      transform: true, // Convert data to correct types (string to number, etc.)
      transformOptions: {
        enableImplicitConversion: true, // Smart type conversion
      },
    }),
  );

  /**
   * API URL PREFIX
   * All our truck management endpoints will start with "/api/v1"
   * Example: http://localhost:3000/api/v1/trucks
   * This matches what the frontend expects
   */
  app.setGlobalPrefix('api/v1');

  /**
   * API DOCUMENTATION SETUP
   * This creates a web page that shows all available truck management features
   * Developers can see what data to send and what responses to expect
   */
  const config = new DocumentBuilder()
    .setTitle('TRUCKS Microservice API')
    .setDescription('TMS TRUCKS microservice - Manages truck fleet data and operations')
    .setVersion('1.0')
    .addTag('trucks', 'Truck fleet management operations')
    .addTag('locations', 'Yard and terminal location management')
    .addTag('documents', 'Truck document and file management')
    .build();

  // Generate the documentation
  const document = SwaggerModule.createDocument(app, config);
  // Make it available at: http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document);

  /**
   * START THE SERVER
   * The server will listen on port 3000 (or whatever PORT is set in environment)
   * Once started, the frontend can send requests to manage trucks
   */
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  // Show helpful startup messages
  console.log(`🚛 TRUCKS Microservice running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`🔗 Frontend can connect to: http://localhost:${port}/api/v1/trucks`);
}

// Start the application
bootstrap();