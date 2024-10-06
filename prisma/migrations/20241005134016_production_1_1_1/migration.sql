-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('SYSTEM', 'RESTURANT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'SYSTEM';
