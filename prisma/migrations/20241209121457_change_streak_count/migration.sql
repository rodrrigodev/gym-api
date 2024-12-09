/*
  Warnings:

  - Added the required column `current_streak` to the `user_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_streak_reached` to the `user_progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_progress" ADD COLUMN     "current_streak" INTEGER NOT NULL,
ADD COLUMN     "max_streak_reached" INTEGER NOT NULL;
