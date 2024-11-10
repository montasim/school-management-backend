/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `uniqueId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_uniqueId_key` ON `Category`(`uniqueId`);
