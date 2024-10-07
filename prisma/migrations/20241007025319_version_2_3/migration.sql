/*
  Warnings:

  - You are about to drop the column `toppings` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `PizzaTopping` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "toppings";

-- CreateIndex
CREATE UNIQUE INDEX "PizzaTopping_id_key" ON "PizzaTopping"("id");
