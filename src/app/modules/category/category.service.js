/**
 * @fileoverview Services for Category Operations.
 *
 * This module exports a set of services responsible for handling various operations related to categories in an Express application.
 * Each service is an asynchronous function that interacts with the database, performs the specified operation, and generates a response or error message.
 * The services also include error handling to ensure graceful handling of exceptions.
 *
 * @requires DatabaseMiddleware - Database connection middleware for interacting with the database.
 * @requires CATEGORY_COLLECTION_NAME - Configuration constant for the collection name in the database.
 * @requires constants - Constants used for defining status codes and messages.
 * @requires CATEGORY_CONSTANTS - Constants specific to category operations.
 * @requires isValidRequest - Shared utility function to validate incoming requests.
 * @requires logger - Shared utility for logging.
 * @requires deleteByField - Shared utility for deleting data from the database by a specific field.
 * @requires generateResponseData - Shared utility for generating consistent response data.
 * @requires findByField - Shared utility for finding data in the database by a specific field.
 * @requires createByDetails - Shared utility for creating data in the database with provided details.
 * @requires updateById - Shared utility for updating data in the database by ID.
 * @requires getAllData - Shared utility for fetching all data from a collection.
 * @module CategoryService - Exported services for category operations in the application.
 */

import { v4 as uuidv4 } from 'uuid';
import { CATEGORY_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { CATEGORY_CONSTANTS } from "./category.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
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
        const { name, adminId } = newCategoryDetails;

        if (await findByField(db, CATEGORY_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const categoryDetails = {
            id: `${CATEGORY_CONSTANTS?.CATEGORY_ID_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, CATEGORY_COLLECTION_NAME, categoryDetails);
        const latestData = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${categoryDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
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
            ? generateResponseData(category, true, STATUS_OK, `${category?.length} category found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No category found');
    } catch (error) {
        logger.error(error);

        return error;
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
        const category = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        delete category?.createdBy;
        delete category?.modifiedBy;

        return category
            ? generateResponseData(category, true, STATUS_OK, `${categoryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${categoryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
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
        const { name, adminId } = newCategoryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedCategoryDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, CATEGORY_COLLECTION_NAME, categoryId, updatedCategoryDetails);
        const latestData = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${categoryId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${categoryId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific category by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteACategoryService = async (db, adminId, categoryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${categoryId} not found`);

        const result = await deleteByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${categoryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${categoryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace CategoryService
 * @description Provides a set of services for handling CRUD operations related to categories.
 * These services encapsulate the business logic required for category operations and include error handling for robust functionality.
 */
export const CategoryService = {
    createCategoryService,
    getCategoryListService,
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};