/*
  Warnings:

  - You are about to drop the column `gym_equipment` on the `training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "training" DROP COLUMN "gym_equipment";

-- CreateTable
CREATE TABLE "TrainingGymEquipment" (
    "trainingId" TEXT NOT NULL,
    "gymEquipmentId" TEXT NOT NULL,

    CONSTRAINT "TrainingGymEquipment_pkey" PRIMARY KEY ("trainingId","gymEquipmentId")
);

-- AddForeignKey
ALTER TABLE "TrainingGymEquipment" ADD CONSTRAINT "TrainingGymEquipment_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingGymEquipment" ADD CONSTRAINT "TrainingGymEquipment_gymEquipmentId_fkey" FOREIGN KEY ("gymEquipmentId") REFERENCES "gym_equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
