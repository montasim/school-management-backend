import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createLevelService = async (db, newLevelDetails) => {
    try {
        const { name, adminId } = newLevelDetails;

        // Check if level with the same name already exists
        const existingLevel = await prisma.level.findUnique({
            where: { name },
        });
        if (existingLevel) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        // Validate adminId
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        // Create new level
        const newLevel = await prisma.level.create({
            data: {
                id: generateUniqueID('level'), // Use custom generated ID
                name: String(name),
                createdBy: String(adminId),
                createdAt: new Date(),
            },
        });

        return generateResponseData(newLevel, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getLevelListService = async () => {
    try {
        const levels = await prisma.level.findMany();

        return levels.length
            ? generateResponseData(levels, true, STATUS_OK, `${levels.length} levels found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No levels found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getALevelService = async (db, levelId) => {
    try {
        const level = await prisma.level.findUnique({
            where: { id: levelId },
        });

        if (level) {
            delete level.createdBy;
            delete level.modifiedBy;
        }

        return level
            ? generateResponseData(level, true, STATUS_OK, `${levelId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${levelId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateALevelService = async (db, levelId, newLevelDetails) => {
    try {
        const { name, adminId } = newLevelDetails;

        const existingLevel = await prisma.level.findUnique({
            where: { name },
        });
        if (existingLevel && existingLevel.id !== levelId) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldLevel = await prisma.level.findUnique({
            where: { id: levelId },
        });
        if (!oldLevel) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Level ${levelId} not found`);
        }

        const updatedLevel = await prisma.level.update({
            where: { id: levelId },
            data: {
                ...(name && { name }),
                modifiedBy: String(adminId),
                modifiedAt: new Date(),
            },
        });

        return updatedLevel
            ? generateResponseData(updatedLevel, true, STATUS_OK, `${levelId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${levelId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteALevelService = async (db, adminId, levelId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldLevel = await prisma.level.findUnique({
            where: { id: levelId },
        });
        if (!oldLevel) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Level ${levelId} not found`);
        }

        await prisma.level.delete({
            where: { id: levelId },
        });

        return generateResponseData({}, true, STATUS_OK, `${levelId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const LevelService = {
    createLevelService,
    getLevelListService,
    getALevelService,
    updateALevelService,
    deleteALevelService
};