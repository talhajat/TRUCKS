/**
 * TRUCKS CONTROLLER
 * 
 * This controller handles HTTP requests related to truck management.
 * Think of this as the "receptionist" that receives requests from the frontend,
 * validates the data, calls the appropriate business logic, and sends back responses.
 * 
 * This is the entry point for all truck-related API endpoints.
 */

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CreateTruckUseCase, GetAllTrucksUseCase } from '../../application/use-cases';
import {
  CreateTruckDto,
  CreateTruckResponseDto,
  TruckTableResponseDto,
  ErrorResponseDto
} from '../../application/dtos';

/**
 * Trucks Controller
 * Handles all HTTP requests for truck management
 */
@ApiTags('trucks')
@Controller('trucks')
export class TrucksController {
  constructor(
    private readonly createTruckUseCase: CreateTruckUseCase,
    private readonly getAllTrucksUseCase: GetAllTrucksUseCase,
  ) {}

  /**
   * GET /api/v1/trucks
   * Retrieve all trucks for the frontend table display
   */
  @Get()
  @ApiOperation({
    summary: 'Get all trucks',
    description: 'Retrieves all trucks in the system for table display with exact field mapping'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved trucks',
    type: [TruckTableResponseDto],
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto
  })
  async getAllTrucks(): Promise<{ data: TruckTableResponseDto[] }> {
    try {
      return await this.getAllTrucksUseCase.execute();
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Failed to retrieve trucks. Please try again later.',
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * POST /api/v1/trucks
   * Create a new truck from frontend form submission
   * Supports file uploads for truck documents
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files', 10)) // Allow up to 10 file uploads
  @ApiOperation({ 
    summary: 'Create a new truck',
    description: 'Creates a new truck with optional document uploads'
  })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ 
    status: 201, 
    description: 'Truck created successfully',
    type: CreateTruckResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation error',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error',
    type: ErrorResponseDto
  })
  async createTruck(
    @Body() createTruckDto: CreateTruckDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ): Promise<CreateTruckResponseDto> {
    try {
      // Log the incoming request for debugging
      console.log('📝 Creating new truck:', {
        vehicleId: createTruckDto.vehicleId,
        vin: createTruckDto.vin,
        make: createTruckDto.make,
        model: createTruckDto.model,
        filesCount: files?.length || 0
      });

      // Convert DTO to use case input
      const createTruckInput = {
        vehicleId: createTruckDto.vehicleId,
        vin: createTruckDto.vin,
        make: createTruckDto.make,
        model: createTruckDto.model,
        year: createTruckDto.year,
        name: createTruckDto.name,
        color: createTruckDto.color,
        engineMake: createTruckDto.engineMake,
        engineModel: createTruckDto.engineModel,
        horsepower: createTruckDto.horsepower,
        transmissionType: createTruckDto.transmissionType,
        numGears: createTruckDto.numGears,
        ownershipType: createTruckDto.ownershipType,
        purchaseDate: createTruckDto.purchaseDate,
        leaseEndDate: createTruckDto.leaseEndDate,
        purchasePrice: createTruckDto.purchasePrice,
        licensePlate: createTruckDto.licensePlate,
        issuingState: createTruckDto.issuingState,
        registrationExp: createTruckDto.registrationExp,
        insurancePolicy: createTruckDto.insurancePolicy,
        insuranceExp: createTruckDto.insuranceExp,
        jurisdiction: createTruckDto.jurisdiction,
        gvwr: createTruckDto.gvwr,
        gcwr: createTruckDto.gcwr,
        dotNumber: createTruckDto.dotNumber,
        initialStatus: createTruckDto.initialStatus,
        assignedYard: createTruckDto.assignedYard,
        initialOdometer: createTruckDto.initialOdometer,
        initialOdometerUnit: createTruckDto.initialOdometerUnit,
        defaultTrailerId: createTruckDto.defaultTrailerId,
      };

      // Execute the use case
      const result = await this.createTruckUseCase.execute(createTruckInput);

      // Log success
      console.log('✅ Truck created successfully:', {
        id: result.id,
        vehicleId: result.vehicleId,
        message: result.message
      });

      return result;

    } catch (error) {
      // Log the error for debugging
      console.error('❌ Failed to create truck:', error.message);

      // Handle different types of errors
      if (error.message.includes('already exists') || 
          error.message.includes('Validation') ||
          error.message.includes('Invalid')) {
        throw new BadRequestException({
          statusCode: 400,
          message: error.message,
          error: 'Bad Request'
        });
      }

      // Generic server error
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Failed to create truck. Please try again later.',
        error: 'Internal Server Error'
      });
    }
  }

  /**
   * Health check endpoint for monitoring
   * GET /api/v1/trucks/health
   */
  @Get('health')
  @ApiOperation({ 
    summary: 'Health check',
    description: 'Check if the trucks service is running properly'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Service is healthy'
  })
  getHealth(): { status: string; timestamp: string; service: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'trucks-microservice'
    };
  }
}