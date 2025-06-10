# TRUCKS Microservice

This is the TRUCKS microservice for the TMS (Transportation Management System). It handles all truck-related operations including creating, updating, and managing truck fleet data.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

First, make sure PostgreSQL is running on your system.

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/trucks_db?schema=public"
```

Then run Prisma migrations to create the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Create database and apply migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 3. Running the Application

```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
`http://localhost:3000/api/docs`

## API Endpoints

- `GET /api/v1/trucks` - Get all trucks
- `POST /api/v1/trucks` - Create a new truck
- `GET /api/v1/trucks/health` - Health check endpoint

## Testing the API

You can use the `test-api.http` file with the REST Client extension in VS Code to test the endpoints.

## Frontend Integration

The frontend application should be configured to connect to this backend at:
`http://localhost:3000/api/v1`

Make sure CORS is properly configured in `main.ts` to allow your frontend URL.

## Project Structure

```
trucks-service/
├── src/
│   ├── domain/           # Business logic and entities
│   ├── application/      # Use cases and DTOs
│   ├── infrastructure/   # Database and external services
│   └── presentation/     # Controllers and API layer
├── prisma/              # Database schema and migrations
└── test-api.http        # API testing file
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Allowed frontend URLs for CORS

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify the database name exists

### CORS Issues
- Check that your frontend URL is listed in the CORS configuration in `main.ts`
- Ensure the frontend is using the correct API URL

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using port 3000