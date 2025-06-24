# Trucks Service - Test Suite

This folder contains all tests for the trucks microservice, organized following Domain-Driven Design (DDD) best practices.

## Test Structure

```
test/
├── e2e/                    # End-to-end tests
│   └── postman/           # Postman collections for API testing
│       ├── trucks-api.postman_collection.json
│       └── trucks-api.postman_environment.json
├── unit/                  # Unit tests (to be added)
│   ├── domain/           # Domain layer tests
│   ├── application/      # Application layer tests
│   └── infrastructure/   # Infrastructure layer tests
└── integration/          # Integration tests (to be added)
```

## E2E Testing with Postman

### Prerequisites

1. Ensure the trucks service is running:
   ```bash
   cd trucks-service
   npm run start:dev
   ```

2. Install Postman or use Newman (Postman CLI):
   ```bash
   npm install -g newman
   ```

### Running Tests in Postman

1. Open Postman
2. Import the collection: `test/e2e/postman/trucks-api.postman_collection.json`
3. Import the environment: `test/e2e/postman/trucks-api.postman_environment.json`
4. Select the "Trucks Service - Local" environment
5. Run the collection

### Running Tests with Newman (CLI)

```bash
# Run all tests
newman run test/e2e/postman/trucks-api.postman_collection.json \
  -e test/e2e/postman/trucks-api.postman_environment.json

# Run with detailed reporting
newman run test/e2e/postman/trucks-api.postman_collection.json \
  -e test/e2e/postman/trucks-api.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export test-results.json
```

## Test Scenarios

### Health Check
- ✅ Verify service is running and healthy

### Create Truck
- ✅ Successfully create a new truck with all fields
- ✅ Reject duplicate vehicle ID
- ✅ Reject empty VIN
- ✅ Validate required fields

### Get All Trucks
- ✅ Retrieve all trucks with correct table format
- ✅ Verify response structure matches TruckTableResponseDto
- ✅ Confirm created truck appears in list

## Test Data

The tests use dynamic data generation to avoid conflicts:
- Vehicle IDs are generated with timestamps: `T{timestamp}`
- VINs are generated with timestamps: `VIN{timestamp}TEST`

## Best Practices

1. **Isolation**: Each test generates unique IDs to avoid conflicts
2. **Validation**: Tests verify both status codes and response structure
3. **Environment Variables**: Sensitive data and URLs are stored in environment
4. **Cleanup**: Tests are designed to be repeatable without manual cleanup

## Adding New Tests

When adding new tests, follow these guidelines:

1. **Unit Tests**: Test individual components in isolation
   - Place in `test/unit/{layer}/` matching the source structure
   - Mock external dependencies

2. **Integration Tests**: Test component interactions
   - Place in `test/integration/`
   - Use test database

3. **E2E Tests**: Test complete user scenarios
   - Add to Postman collection
   - Include both positive and negative test cases

## Running All Tests

```bash
# Unit tests (when implemented)
npm run test

# E2E tests with Newman
npm run test:e2e

# All tests with coverage
npm run test:cov