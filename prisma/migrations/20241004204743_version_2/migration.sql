/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PizzaTopping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `superAdminId` on the `Resturant` table. All the data in the column will be lost.
  - The primary key for the `Topping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ResturantRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResturantUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PizzaTopping" DROP CONSTRAINT "PizzaTopping_toppingId_fkey";

-- DropForeignKey
ALTER TABLE "Resturant" DROP CONSTRAINT "Resturant_superAdminId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantRole" DROP CONSTRAINT "ResturantRole_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantRole" DROP CONSTRAINT "ResturantRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantUser" DROP CONSTRAINT "ResturantUser_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantUser" DROP CONSTRAINT "ResturantUser_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "PizzaTopping" DROP CONSTRAINT "PizzaTopping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "toppingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PizzaTopping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PizzaTopping_id_seq";

-- AlterTable
ALTER TABLE "Resturant" DROP COLUMN "superAdminId";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "resturantId" TEXT;

-- AlterTable
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Topping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Topping_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resturantId" TEXT;

-- DropTable
DROP TABLE "ResturantRole";

-- DropTable
DROP TABLE "ResturantUser";

-- CreateTable
CREATE TABLE "OrderTopping" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "toppingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderTopping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaTopping" ADD CONSTRAINT "PizzaTopping_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTopping" ADD CONSTRAINT "OrderTopping_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTopping" ADD CONSTRAINT "OrderTopping_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
