#!/bin/bash

# Trucks Service E2E Test Runner

echo "🚛 Trucks Service E2E Tests"
echo "=========================="

# Check if Newman is installed
if ! command -v newman &> /dev/null; then
    echo "❌ Newman is not installed. Please install it with: npm install -g newman"
    exit 1
fi

# Check if service is running
if ! curl -s http://localhost:3000/api/v1/trucks/health > /dev/null; then
    echo "❌ Trucks service is not running. Please start it with: npm run start:dev"
    exit 1
fi

echo "✅ Service is running"
echo "🧪 Running E2E tests..."
echo ""

# Run the tests
newman run test/e2e/postman/trucks-api.postman_collection.json \
    -e test/e2e/postman/trucks-api.postman_environment.json \
    --reporters cli,json \
    --reporter-json-export test/e2e/results/test-results-$(date +%Y%m%d-%H%M%S).json

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All tests passed!"
else
    echo ""
    echo "❌ Some tests failed. Check the results above."
    exit 1
fi