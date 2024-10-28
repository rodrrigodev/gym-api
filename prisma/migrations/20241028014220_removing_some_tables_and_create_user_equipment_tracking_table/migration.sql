/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `GymEquipament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `GymEquipament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `GymEquipament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GymEquipament" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Reservation";

-- CreateTable
CREATE TABLE "UserEquipmentTracking" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "lastUpdate" TIMESTAMP(3),
    "userProgressId" TEXT NOT NULL,
    "gymEquipamentId" TEXT NOT NULL,

    CONSTRAINT "UserEquipmentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEquipmentTracking_userProgressId_key" ON "UserEquipmentTracking"("userProgressId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEquipmentTracking_gymEquipamentId_key" ON "UserEquipmentTracking"("gymEquipamentId");

-- AddForeignKey
ALTER TABLE "UserEquipmentTracking" ADD CONSTRAINT "UserEquipmentTracking_userProgressId_fkey" FOREIGN KEY ("userProgressId") REFERENCES "UserProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEquipmentTracking" ADD CONSTRAINT "UserEquipmentTracking_gymEquipamentId_fkey" FOREIGN KEY ("gymEquipamentId") REFERENCES "GymEquipament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
