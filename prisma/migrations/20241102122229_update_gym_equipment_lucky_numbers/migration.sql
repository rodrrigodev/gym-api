/*
  Warnings:

  - You are about to drop the column `gym_equipament_id` on the `user_equipment_tracking` table. All the data in the column will be lost.
  - You are about to drop the `lucky_numbers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gym_equipment_id` to the `user_equipment_tracking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lucky_numbers" DROP CONSTRAINT "lucky_numbers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_equipment_tracking" DROP CONSTRAINT "user_equipment_tracking_gym_equipament_id_fkey";

-- DropIndex
DROP INDEX "user_equipment_tracking_gym_equipament_id_key";

-- DropIndex
DROP INDEX "user_equipment_tracking_user_progress_id_key";

-- AlterTable
ALTER TABLE "user_equipment_tracking" DROP COLUMN "gym_equipament_id",
ADD COLUMN     "gym_equipment_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lucky_numbers" TEXT[];

-- DropTable
DROP TABLE "lucky_numbers";

-- AddForeignKey
ALTER TABLE "user_equipment_tracking" ADD CONSTRAINT "user_equipment_tracking_gym_equipment_id_fkey" FOREIGN KEY ("gym_equipment_id") REFERENCES "gym_equipaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
