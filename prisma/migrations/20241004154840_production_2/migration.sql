-- CreateTable
CREATE TABLE "ResturantUser" (
    "id" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResturantUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResturantUser" ADD CONSTRAINT "ResturantUser_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResturantUser" ADD CONSTRAINT "ResturantUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
