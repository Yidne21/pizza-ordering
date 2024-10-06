/*
  Warnings:

  - You are about to drop the column `resturantId` on the `Topping` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Topping` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('SYSTEM', 'RESTURANT');

-- DropForeignKey
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_resturantId_fkey";

-- DropIndex
DROP INDEX "RoleOnPermission_roleId_permissionId_key";

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "type" "PermissionType" NOT NULL DEFAULT 'SYSTEM';

-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "resturantId";

-- CreateIndex
CREATE UNIQUE INDEX "Topping_name_key" ON "Topping"("name");
