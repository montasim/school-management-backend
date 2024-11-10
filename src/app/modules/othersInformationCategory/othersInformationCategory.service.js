import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { OTHERS_INFORMATION_CATEGORY_CONSTANTS } from "./othersInformationCategory.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma?.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createOthersInformationCategory = async (db, newOthersInformationCategoryDetails) => {
    try {
        const { name, adminId } = newOthersInformationCategoryDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingCategory = await prisma?.othersInformationCategory.findUnique({
            where: { name },
        });
        if (existingCategory) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        const newCategory = await prisma?.othersInformationCategory.create({
            data: {
                id: generateUniqueID(OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_ID_PREFIX),
                name,
                createdBy: adminId,
                createdAt: new Date(),
            },
        });

        return generateResponseData(newCategory, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getOthersInformationCategoryList = async (db) => {
    try {
        const categoryList = await prisma?.othersInformationCategory.findMany();

        return categoryList.length
            ? generateResponseData(categoryList, true, STATUS_OK, `${categoryList.length} categories found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No categories found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAOthersInformationCategory = async (db, othersInformationCategoryId) => {
    try {
        const category = await prisma?.othersInformationCategory.findUnique({
            where: { id: othersInformationCategoryId }
        });

        return category
            ? generateResponseData(category, true, STATUS_OK, `${othersInformationCategoryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationCategoryId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAOthersInformationCategory = async (db, othersInformationCategoryId, newCategoryDetails) => {
    try {
        const { name, adminId } = newCategoryDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const updatedCategory = await prisma?.othersInformationCategory.update({
            where: { id: othersInformationCategoryId },
            data: {
                ...(name && { name }),
                modifiedBy: adminId,
                modifiedAt: new Date(),
            }
        });

        return updatedCategory
            ? generateResponseData(updatedCategory, true, STATUS_OK, `${othersInformationCategoryId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationCategoryId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAOthersInformationCategory = async (db, adminId, othersInformationCategoryId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const deletedCategory = await prisma?.othersInformationCategory.delete({
            where: { id: othersInformationCategoryId }
        });

        return deletedCategory
            ? generateResponseData({}, true, STATUS_OK, `${othersInformationCategoryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationCategoryId} could not be deleted`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const OthersInformationCategoryService = {
    createOthersInformationCategory,
    getOthersInformationCategoryList,
    getAOthersInformationCategory,
    updateAOthersInformationCategory,
    deleteAOthersInformationCategory
};
