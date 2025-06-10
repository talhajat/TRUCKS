/**
 * REPOSITORIES BARREL EXPORT
 * 
 * This file exports all repository interfaces from one place.
 * Makes it easier to import repository contracts in other parts of the application.
 */

export { 
  ITruckRepository, 
  ITruckRepositoryWithPagination,
  TruckSearchCriteria,
  TruckQueryResult 
} from './truck.repository';