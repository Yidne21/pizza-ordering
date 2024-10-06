-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SYSTEM', 'RESTURANT');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "type" "RoleType" NOT NULL DEFAULT 'SYSTEM';
