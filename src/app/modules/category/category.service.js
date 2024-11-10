import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma?.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createCategoryService = async (db, newCategoryDetails) => {
    try {
        const { name, adminId } = newCategoryDetails;

        // Check if category with the same name already exists
        const existingCategory = await prisma.category.findUnique({
            where: { name },
        });
        if (existingCategory) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        // Validate adminId
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        // Create new category
        const newCategory = await prisma.category.create({
            data: {
                id: generateUniqueID('category'), // Use custom generated ID
                name,
                createdBy: adminId,
                createdAt: new Date(),
            },
        });

        return generateResponseData(
            { id: newCategory.id, name: newCategory.name, createdAt: newCategory.createdAt },
            true,
            STATUS_OK,
            `${newCategory.name} created successfully`
        );

    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getCategoryListService = async (db) => {
    try {
        const categories = await prisma.category.findMany();

        return categories.length
            ? generateResponseData(categories, true, STATUS_OK, `${categories.length} categories found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No categories found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getACategoryService = async (db, categoryId) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (category) {
            delete category.createdBy;
            delete category.modifiedBy;
        }

        return category
            ? generateResponseData(category, true, STATUS_OK, `${categoryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${categoryId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateACategoryService = async (db, categoryId, newCategoryDetails) => {
    try {
        const { name, adminId } = newCategoryDetails;

        const existingCategory = await prisma.category.findUnique({
            where: { name },
        });
        if (existingCategory && existingCategory.id !== categoryId) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldCategory = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!oldCategory) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Category ${categoryId} not found`);
        }

        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: {
                ...(name && { name }),
                modifiedBy: adminId,
                modifiedAt: new Date(),
            },
        });

        return updatedCategory
            ? generateResponseData(updatedCategory, true, STATUS_OK, `${categoryId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${categoryId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteACategoryService = async (db, adminId, categoryId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldCategory = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!oldCategory) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Category ${categoryId} not found`);
        }

        await prisma.category.delete({
            where: { id: categoryId },
        });

        return generateResponseData({}, true, STATUS_OK, `${categoryId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const CategoryService = {
    createCategoryService,
    getCategoryListService,
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};
