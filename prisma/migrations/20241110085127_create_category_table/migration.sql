-- CreateTable
CREATE TABLE `Level` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedBy` VARCHAR(191) NULL,
    `modifiedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Level_uniqueId_key`(`uniqueId`),
    UNIQUE INDEX `Level_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
