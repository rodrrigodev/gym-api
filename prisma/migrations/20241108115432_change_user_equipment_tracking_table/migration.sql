/*
  Warnings:

  - You are about to drop the column `weight` on the `user_equipment_tracking` table. All the data in the column will be lost.
  - Added the required column `actual_weight` to the `user_equipment_tracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_weight` to the `user_equipment_tracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_equipment_tracking" DROP COLUMN "weight",
ADD COLUMN     "actual_weight" INTEGER NOT NULL,
ADD COLUMN     "initial_weight" INTEGER NOT NULL;
