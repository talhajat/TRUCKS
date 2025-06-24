# E2E Testing Guide for Trucks Service

## Quick Start

### 1. Ensure the service is running
```bash
cd trucks-service
npm run start:dev
```

### 2. Run E2E tests using npm scripts

#### Option A: Using npm scripts (recommended)
```bash
# Run tests with console output
npm run test:e2e:postman

# Run tests with HTML report
npm run test:e2e:postman:report
```

#### Option B: Using test runner scripts
```bash
# Windows
cd trucks-service
test\e2e\run-tests.bat

# Linux/Mac
cd trucks-service
./test/e2e/run-tests.sh
```

#### Option C: Using Postman GUI
1. Open Postman
2. Import collection: `test/e2e/postman/trucks-api.postman_collection.json`
3. Import environment: `test/e2e/postman/trucks-api.postman_environment.json`
4. Run collection

## Test Coverage

### ✅ Health Check
- Verifies service is running
- Validates response structure

### ✅ Create Truck
- Successfully creates truck with all fields
- Validates duplicate vehicle ID rejection
- Validates empty VIN rejection
- Tests required field validation

### ✅ Get All Trucks
- Retrieves all trucks
- Validates table response format
- Verifies created trucks appear in list

## Test Results

- Console output shows pass/fail for each test
- HTML reports are saved in `test/e2e/results/`
- JSON results include detailed request/response data

## Troubleshooting

### Service not running
```
Error: Trucks service is not running
```
**Solution**: Start the service with `npm run start:dev`

### Newman not installed
```
Error: Newman is not installed
```
**Solution**: Install Newman globally with `npm install -g newman`

### Port already in use
```
Error: Port 3000 is already in use
```
**Solution**: Stop other services using port 3000 or change the port in `.env`

## Manual Testing with cURL

### Health Check
```bash
curl http://localhost:3000/api/v1/trucks/health
```

### Get All Trucks
```bash
curl http://localhost:3000/api/v1/trucks
```

### Create Truck
```bash
curl -X POST http://localhost:3000/api/v1/trucks \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "T999",
    "vin": "TEST123456789",
    "make": "Freightliner",
    "model": "Cascadia",
    "year": 2024
  }'