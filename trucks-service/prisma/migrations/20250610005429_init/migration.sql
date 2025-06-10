-- CreateEnum
CREATE TYPE "TruckStatus" AS ENUM ('available', 'assigned', 'maintenance', 'out_of_service');

-- CreateEnum
CREATE TYPE "TrailerStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('AVAILABLE', 'DRIVING', 'ON_BREAK', 'LOADING', 'UNLOADING', 'MAINTENANCE', 'AWAY', 'OFF_DUTY');

-- CreateEnum
CREATE TYPE "LoadStatus" AS ENUM ('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('MANUAL', 'AUTOMATIC', 'AUTOMATED_MANUAL');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('OWNED', 'LEASED', 'RENTED');

-- CreateEnum
CREATE TYPE "DistanceUnit" AS ENUM ('MILES', 'KILOMETERS');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('YARD', 'TERMINAL', 'SHOP', 'CUSTOMER_SITE', 'DROP_YARD');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('VEHICLE_TITLE', 'LEASE_AGREEMENT', 'REGISTRATION', 'INSURANCE_CERTIFICATE', 'INSPECTION_REPORT');

-- CreateTable
CREATE TABLE "trucks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "name" TEXT,
    "vin" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT,
    "engineMake" TEXT,
    "engineModel" TEXT,
    "horsepower" INTEGER,
    "transmissionType" "TransmissionType" NOT NULL DEFAULT 'MANUAL',
    "numGears" INTEGER,
    "ownershipType" "OwnershipType" NOT NULL DEFAULT 'OWNED',
    "purchaseDate" TIMESTAMP(3),
    "leaseEndDate" TIMESTAMP(3),
    "purchasePrice" DECIMAL(65,30),
    "licensePlate" TEXT,
    "issuingState" TEXT,
    "registrationExp" TIMESTAMP(3),
    "insurancePolicy" TEXT,
    "insuranceExp" TIMESTAMP(3),
    "jurisdiction" TEXT NOT NULL DEFAULT 'IFTA',
    "gvwr" INTEGER,
    "gcwr" INTEGER,
    "dotNumber" TEXT,
    "status" "TruckStatus" NOT NULL DEFAULT 'available',
    "currentLocation" TEXT,
    "assignedYardId" TEXT,
    "odometer" INTEGER,
    "odometerUnit" "DistanceUnit" NOT NULL DEFAULT 'MILES',
    "engineHours" INTEGER,
    "currentDriverId" TEXT,
    "attachedTrailerId" TEXT,
    "currentLoadId" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trucks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trailers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trailerId" TEXT NOT NULL,
    "name" TEXT,
    "vin" TEXT NOT NULL,
    "year" INTEGER,
    "trailerType" TEXT,
    "length" INTEGER,
    "capacity" INTEGER,
    "axleCount" INTEGER,
    "status" "TrailerStatus" NOT NULL DEFAULT 'AVAILABLE',
    "currentLocation" TEXT,
    "assignedYardId" TEXT,
    "attachedTruckId" TEXT,
    "currentLoadId" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trailers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "status" "DriverStatus" NOT NULL DEFAULT 'AVAILABLE',
    "operatingBaseCity" TEXT,
    "operatingBaseState" TEXT,
    "assignedFleetId" TEXT,
    "currentLoadId" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loads" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loadId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "LoadStatus" NOT NULL DEFAULT 'PENDING',
    "trackingNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "originAddress" TEXT NOT NULL,
    "originLat" DOUBLE PRECISION,
    "originLng" DOUBLE PRECISION,
    "destinationAddress" TEXT NOT NULL,
    "destinationLat" DOUBLE PRECISION,
    "destinationLng" DOUBLE PRECISION,
    "scheduledPickup" TIMESTAMP(3) NOT NULL,
    "scheduledDelivery" TIMESTAMP(3) NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT DEFAULT 'US',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locationType" "LocationType" NOT NULL DEFAULT 'YARD',
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck_documents" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "description" TEXT,
    "uploadedBy" TEXT,
    "truckId" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "truck_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trucks_vehicleId_key" ON "trucks"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_vin_key" ON "trucks"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "trucks_attachedTrailerId_key" ON "trucks"("attachedTrailerId");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_trailerId_key" ON "trailers"("trailerId");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_vin_key" ON "trailers"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "trailers_attachedTruckId_key" ON "trailers"("attachedTruckId");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverId_key" ON "drivers"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "loads_loadId_key" ON "loads"("loadId");

-- CreateIndex
CREATE UNIQUE INDEX "loads_trackingNumber_key" ON "loads"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "locations_locationId_key" ON "locations"("locationId");

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_assignedYardId_fkey" FOREIGN KEY ("assignedYardId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_currentDriverId_fkey" FOREIGN KEY ("currentDriverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_currentLoadId_fkey" FOREIGN KEY ("currentLoadId") REFERENCES "loads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_assignedYardId_fkey" FOREIGN KEY ("assignedYardId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_attachedTruckId_fkey" FOREIGN KEY ("attachedTruckId") REFERENCES "trucks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_currentLoadId_fkey" FOREIGN KEY ("currentLoadId") REFERENCES "loads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_currentLoadId_fkey" FOREIGN KEY ("currentLoadId") REFERENCES "loads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "truck_documents" ADD CONSTRAINT "truck_documents_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
