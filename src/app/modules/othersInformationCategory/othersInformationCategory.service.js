import { OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { OTHERS_INFORMATION_CATEGORY_CONSTANTS } from "./othersInformationCategory.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

/**
 * Creates a new othersInformationCategory entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newOthersInformationCategoryDetails - New othersInformationCategory's details.
 * @returns {Object} - The response after attempting othersInformationCategory creation.
 * @throws {Error} Throws an error if any.
 */
const createOthersInformationCategory = async (db, newOthersInformationCategoryDetails) => {
    try {
        const { name, adminId } = newOthersInformationCategoryDetails;

        if (await findByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const othersInformationCategoryDetails = {
            id: generateUniqueID(OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_ID_PREFIX),
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, othersInformationCategoryDetails);
        const latestData = await findByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'id', othersInformationCategoryDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${othersInformationCategoryDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all othersInformationCategory from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of othersInformationCategory or an error message.
 * @throws {Error} Throws an error if any.
 */
const getOthersInformationCategoryList = async (db) => {
    try {
        const othersInformationCategory = await getAllData(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME);

        return othersInformationCategory?.length
            ? generateResponseData(othersInformationCategory, true, STATUS_OK, `${othersInformationCategory?.length} othersInformationCategory found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No othersInformationCategory found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific othersInformationCategory by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} othersInformationCategoryId - The ID of the othersInformationCategory to retrieve.
 * @returns {Object} - The othersInformationCategory details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAOthersInformationCategory = async (db, othersInformationCategoryId) => {
    try {
        const othersInformationCategory = await findByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'id', othersInformationCategoryId);

        delete othersInformationCategory?.createdBy;
        delete othersInformationCategory?.modifiedBy;

        return othersInformationCategory
            ? generateResponseData(othersInformationCategory, true, STATUS_OK, `${othersInformationCategoryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationCategoryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific othersInformationCategory by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} othersInformationCategoryId - The ID of the othersInformationCategory to retrieve.
 * @param newOthersInformationCategoryDetails
 * @returns {Object} - The othersInformationCategory details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAOthersInformationCategory = async (db, othersInformationCategoryId, newOthersInformationCategoryDetails) => {
    try {
        const { name, adminId } = newOthersInformationCategoryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedOthersInformationCategoryDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, othersInformationCategoryId, updatedOthersInformationCategoryDetails);
        const latestData = await findByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'id', othersInformationCategoryId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${othersInformationCategoryId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationCategoryId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific othersInformationCategory by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} othersInformationCategoryId - The ID of the othersInformationCategory to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAOthersInformationCategory = async (db, adminId, othersInformationCategoryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'id', othersInformationCategoryId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationCategoryId} not found`);

        const result = await deleteByField(db, OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME, 'id', othersInformationCategoryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${othersInformationCategoryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationCategoryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace OthersInformationCategoryService
 * @description Group of services related to othersInformationCategory operations.
 */
export const OthersInformationCategoryService = {
    createOthersInformationCategory,
    getOthersInformationCategoryList,
    getAOthersInformationCategory,
    updateAOthersInformationCategory,
    deleteAOthersInformationCategory
};