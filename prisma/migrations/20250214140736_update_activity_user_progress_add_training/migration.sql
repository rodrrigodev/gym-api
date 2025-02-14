/*
  Warnings:

  - You are about to drop the column `workout` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `last_workout` on the `user_progress` table. All the data in the column will be lost.
  - You are about to drop the column `next_workout` on the `user_progress` table. All the data in the column will be lost.
  - You are about to drop the `gym_equipments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_equipment_tracking" DROP CONSTRAINT "user_equipment_tracking_gym_equipment_id_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "workout",
ADD COLUMN     "training_id" TEXT;

-- AlterTable
ALTER TABLE "user_progress" DROP COLUMN "last_workout",
DROP COLUMN "next_workout",
ADD COLUMN     "workouts" JSONB[];

-- DropTable
DROP TABLE "gym_equipments";

-- CreateTable
CREATE TABLE "training" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "gym_equipment" TEXT[],
    "type" TEXT NOT NULL,
    "age_group" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "cod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "last_maintenance" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gym_equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipment_tracking" ADD CONSTRAINT "user_equipment_tracking_gym_equipment_id_fkey" FOREIGN KEY ("gym_equipment_id") REFERENCES "gym_equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
