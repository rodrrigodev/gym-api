/*
  Warnings:

  - You are about to drop the column `amount` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `experience_date` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the `gym_equipaments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_equipment_tracking" DROP CONSTRAINT "user_equipment_tracking_gym_equipment_id_fkey";

-- AlterTable
ALTER TABLE "bills" DROP COLUMN "amount",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "experience_date";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "experience_date" TIMESTAMP(3);

-- DropTable
DROP TABLE "gym_equipaments";

-- CreateTable
CREATE TABLE "gym_equipments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "cod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "last_maintenance" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gym_equipments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_equipment_tracking" ADD CONSTRAINT "user_equipment_tracking_gym_equipment_id_fkey" FOREIGN KEY ("gym_equipment_id") REFERENCES "gym_equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
