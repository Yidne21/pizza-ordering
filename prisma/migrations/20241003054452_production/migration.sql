/*
  Warnings:

  - You are about to drop the column `resturantId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_resturantId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "resturantId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ResturantRole" (
    "id" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResturantRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResturantRole" ADD CONSTRAINT "ResturantRole_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResturantRole" ADD CONSTRAINT "ResturantRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
