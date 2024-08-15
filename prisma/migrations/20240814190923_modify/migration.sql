/*
  Warnings:

  - The `confirmed` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "confirmed",
ADD COLUMN     "confirmed" "BookingStatus" NOT NULL DEFAULT 'PENDING';
