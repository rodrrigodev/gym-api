/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymEquipament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LuckyNumbers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrizeDraw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEquipmentTracking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LuckyNumbers" DROP CONSTRAINT "LuckyNumbers_userId_fkey";

-- DropForeignKey
ALTER TABLE "PrizeDraw" DROP CONSTRAINT "PrizeDraw_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "UserEquipmentTracking" DROP CONSTRAINT "UserEquipmentTracking_gymEquipamentId_fkey";

-- DropForeignKey
ALTER TABLE "UserEquipmentTracking" DROP CONSTRAINT "UserEquipmentTracking_userProgressId_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_planId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthDate",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "planId",
DROP COLUMN "weight",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "current_weight" DOUBLE PRECISION,
ADD COLUMN     "image_URL" TEXT,
ADD COLUMN     "plan_id" TEXT;

-- DropTable
DROP TABLE "Bills";

-- DropTable
DROP TABLE "GymEquipament";

-- DropTable
DROP TABLE "LuckyNumbers";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "PrizeDraw";

-- DropTable
DROP TABLE "UserEquipmentTracking";

-- DropTable
DROP TABLE "UserProgress";

-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL,
    "initial_weight" DOUBLE PRECISION,
    "next_workout" TEXT,
    "last_workout" TEXT,
    "ia_analyses" TEXT,
    "ia_analyses_date" TIMESTAMP(3),
    "current_goal" TEXT,
    "streaks" TIMESTAMP(3)[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_equipment_tracking" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "last_update" TIMESTAMP(3),
    "user_progress_id" TEXT NOT NULL,
    "gym_equipament_id" TEXT NOT NULL,

    CONSTRAINT "user_equipment_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "experience_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_equipaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "cod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "last_maintenance" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gym_equipaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prize_draws" (
    "id" TEXT NOT NULL,
    "prize" TEXT NOT NULL,
    "drawn_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),
    "winner_id" TEXT,

    CONSTRAINT "prize_draws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lucky_numbers" (
    "id" TEXT NOT NULL,
    "lucky_numbers" TEXT[],
    "last_update" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "lucky_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_user_id_key" ON "user_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipment_tracking_user_progress_id_key" ON "user_equipment_tracking"("user_progress_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_equipment_tracking_gym_equipament_id_key" ON "user_equipment_tracking"("gym_equipament_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lucky_numbers_user_id_key" ON "lucky_numbers"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipment_tracking" ADD CONSTRAINT "user_equipment_tracking_user_progress_id_fkey" FOREIGN KEY ("user_progress_id") REFERENCES "user_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipment_tracking" ADD CONSTRAINT "user_equipment_tracking_gym_equipament_id_fkey" FOREIGN KEY ("gym_equipament_id") REFERENCES "gym_equipaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prize_draws" ADD CONSTRAINT "prize_draws_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lucky_numbers" ADD CONSTRAINT "lucky_numbers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
