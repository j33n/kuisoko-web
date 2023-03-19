/*
  Warnings:

  - You are about to drop the column `itemId` on the `CustomField` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `CustomField` table. All the data in the column will be lost.
  - You are about to drop the column `placeholder` on the `CustomField` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CustomField` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supported` to the `CustomField` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CustomField` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customName` to the `ItemCustomField` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ItemCustomField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomField" DROP CONSTRAINT "CustomField_itemId_fkey";

-- AlterTable
ALTER TABLE "CustomField" DROP COLUMN "itemId",
DROP COLUMN "order",
DROP COLUMN "placeholder",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "supported" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ItemCustomField" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customName" TEXT NOT NULL,
ADD COLUMN     "order" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "names" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CustomField_name_key" ON "CustomField"("name");
