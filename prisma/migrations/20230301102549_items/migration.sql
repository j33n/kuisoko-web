/*
  Warnings:

  - You are about to drop the column `comment` on the `DeliveryMethod` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `PaymentMethod` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `DeliveryMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `momoCode` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryMethod" DROP COLUMN "comment",
ADD COLUMN     "instructions" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "tags",
ADD COLUMN     "categories" TEXT[],
ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "comment",
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "momoCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "body" TEXT;

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "notify" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
