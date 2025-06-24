@echo off
REM Trucks Service E2E Test Runner for Windows

echo Trucks Service E2E Tests
echo ========================

REM Check if Newman is installed
where newman >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Newman is not installed. Please install it with: npm install -g newman
    exit /b 1
)

REM Check if service is running
curl -s http://localhost:3000/api/v1/trucks/health >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Trucks service is not running. Please start it with: npm run start:dev
    exit /b 1
)

echo Service is running
echo Running E2E tests...
echo.

REM Create results directory if it doesn't exist
if not exist "test\e2e\results" mkdir "test\e2e\results"

REM Run the tests
newman run test\e2e\postman\trucks-api.postman_collection.json ^
    -e test\e2e\postman\trucks-api.postman_environment.json ^
    --reporters cli,json ^
    --reporter-json-export test\e2e\results\test-results-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%.json

REM Check exit code
if %errorlevel% equ 0 (
    echo.
    echo All tests passed!
) else (
    echo.
    echo Some tests failed. Check the results above.
    exit /b 1
)