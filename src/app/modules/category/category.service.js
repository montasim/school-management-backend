import { v4 as uuidv4 } from 'uuid';
import { CATEGORY_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./category.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidById from "../../../shared/isValidById.js";
import logger from "../../../shared/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new category entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newCategoryDetails - New category's details.
 * @returns {Object} - The response after attempting category creation.
 * @throws {Error} Throws an error if any.
 */
const createCategoryService = async (db, newCategoryDetails) => {
    try {
        const { name, requestedBy } = newCategoryDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const categoryDetails = {
            id: `${ID_CONSTANTS?.CATEGORY_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            createdBy: requestedBy,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, CATEGORY_COLLECTION_NAME, categoryDetails);
        const latestData = await findById(db, CATEGORY_COLLECTION_NAME, categoryDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, 200, `${categoryDetails?.name} created successfully`)
            : generateResponseData({}, false, 500, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all category from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of category or an error message.
 * @throws {Error} Throws an error if any.
 */
const getCategoryListService = async (db) => {
    try {
        const category = await getAllData(db, CATEGORY_COLLECTION_NAME);

        return category?.length
            ? generateResponseData(category, true, 200, `${category?.length} category found`)
            : generateResponseData({}, false, 404, 'No category found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific category by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} categoryId - The ID of the category to retrieve.
 * @returns {Object} - The category details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getACategoryService = async (db, categoryId) => {
    try {
        const category = await findById(db, CATEGORY_COLLECTION_NAME, categoryId);

        delete category?.createdBy;
        delete category?.modifiedBy;

        return category
            ? generateResponseData(category, true, 200, `${categoryId} found successfully`)
            : generateResponseData({}, false, 404, `${categoryId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific category by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} categoryId - The ID of the category to retrieve.
 * @param newCategoryDetails
 * @returns {Object} - The category details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateACategoryService = async (db, categoryId, newCategoryDetails) => {
    try {
        const { name, requestedBy } = newCategoryDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const updatedCategoryDetails = {
            ...(name && { name }),
            modifiedBy: requestedBy,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, CATEGORY_COLLECTION_NAME, categoryId, updatedCategoryDetails);
        const latestData = await findById(db, CATEGORY_COLLECTION_NAME, categoryId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, 200, `${categoryId} updated successfully`)
            : generateResponseData({}, false, 422, `${categoryId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific category by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} requestedBy - The user ID making the request.
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteACategoryService = async (db, requestedBy, categoryId) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, CATEGORY_COLLECTION_NAME, categoryId))
            return generateResponseData({}, false, 404, `${categoryId} not found`);

        const result = await deleteById(db, CATEGORY_COLLECTION_NAME, categoryId);

        return result
            ? generateResponseData({}, true, 200, `${categoryId} deleted successfully`)
            : generateResponseData({}, false, 422, `${categoryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace CategoryService
 * @description Group of services related to category operations.
 */
export const CategoryService = {
    createCategoryService,
    getCategoryListService,
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};
