/*
  Warnings:

  - Added the required column `resturantId` to the `Topping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topping" ADD COLUMN     "resturantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Topping" ADD CONSTRAINT "Topping_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
