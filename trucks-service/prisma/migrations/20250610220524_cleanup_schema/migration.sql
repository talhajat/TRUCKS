/*
  Warnings:

  - The values [assigned] on the enum `TruckStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `currentDriverId` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the column `currentLoadId` on the `trucks` table. All the data in the column will be lost.
  - You are about to drop the `drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trailers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TruckStatus_new" AS ENUM ('available', 'maintenance', 'out_of_service');
ALTER TABLE "trucks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "trucks" ALTER COLUMN "status" TYPE "TruckStatus_new" USING ("status"::text::"TruckStatus_new");
ALTER TYPE "TruckStatus" RENAME TO "TruckStatus_old";
ALTER TYPE "TruckStatus_new" RENAME TO "TruckStatus";
DROP TYPE "TruckStatus_old";
ALTER TABLE "trucks" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_currentLoadId_fkey";

-- DropForeignKey
ALTER TABLE "trailers" DROP CONSTRAINT "trailers_assignedYardId_fkey";

-- DropForeignKey
ALTER TABLE "trailers" DROP CONSTRAINT "trailers_attachedTruckId_fkey";

-- DropForeignKey
ALTER TABLE "trailers" DROP CONSTRAINT "trailers_currentLoadId_fkey";

-- DropForeignKey
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_assignedYardId_fkey";

-- DropForeignKey
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_currentDriverId_fkey";

-- DropForeignKey
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_currentLoadId_fkey";

-- DropIndex
DROP INDEX "trucks_attachedTrailerId_key";

-- AlterTable
ALTER TABLE "trucks" DROP COLUMN "currentDriverId",
DROP COLUMN "currentLoadId";

-- DropTable
DROP TABLE "drivers";

-- DropTable
DROP TABLE "loads";

-- DropTable
DROP TABLE "locations";

-- DropTable
DROP TABLE "trailers";

-- DropEnum
DROP TYPE "DriverStatus";

-- DropEnum
DROP TYPE "LoadStatus";

-- DropEnum
DROP TYPE "LocationType";

-- DropEnum
DROP TYPE "TrailerStatus";
