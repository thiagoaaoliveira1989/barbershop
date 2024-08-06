/*
  Warnings:

  - You are about to drop the column `actived` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `dateInactive` on the `Barbershop` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `BarbershopService` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BarbershopService` table. All the data in the column will be lost.
  - You are about to drop the column `barbershopServiceId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `cancelBooking` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `dateBooking` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `dateCancelBooking` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `actived` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateInactive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_barbershopServiceId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "actived",
DROP COLUMN "createAt",
DROP COLUMN "dateInactive",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BarbershopService" DROP COLUMN "createAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "barbershopServiceId",
DROP COLUMN "cancelBooking",
DROP COLUMN "createAt",
DROP COLUMN "dateBooking",
DROP COLUMN "dateCancelBooking",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "actived",
DROP COLUMN "createAt",
DROP COLUMN "dateInactive",
DROP COLUMN "password",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BarbershopService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
