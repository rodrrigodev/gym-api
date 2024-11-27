/*
  Warnings:

  - You are about to drop the column `streaks` on the `user_progress` table. All the data in the column will be lost.
  - Made the column `finished_at` on table `prize_draws` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `active` to the `user_equipment_tracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prize_draws" ALTER COLUMN "finished_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_equipment_tracking" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "user_progress" DROP COLUMN "streaks";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "workout" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "user_progress_id" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_progress_id_fkey" FOREIGN KEY ("user_progress_id") REFERENCES "user_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
