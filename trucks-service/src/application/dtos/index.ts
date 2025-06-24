/**
 * DTOs BARREL EXPORT
 *
 * This file exports all Data Transfer Objects from one place.
 * Makes it easier to import DTOs in controllers and other parts of the application.
 */

// Request DTOs
export { CreateTruckDto } from './create-truck.dto';

// Response DTOs
export { CreateTruckResponseDto } from './create-truck-response.dto';
export { TruckTableResponseDto } from './truck-table-response.dto';
export { TruckDetailsResponseDto } from './truck-details-response.dto';

// Domain DTOs
export {
  CreateTruckData,
  CreateDocumentData,
  TruckAttentionReport
} from './truck-domain.dto';