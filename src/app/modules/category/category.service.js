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

import { ADMINISTRATION_COLLECTION_NAME, CATEGORY_COLLECTION_NAME } from "../../../config/config.js";
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
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import findManyByField from "../../../shared/findManyByField.js";
import updateFieldForMultipleDocuments from "../../../shared/updateFieldForMultipleDocuments.js";

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
            id: generateUniqueID(CATEGORY_CONSTANTS?.CATEGORY_ID_PREFIX),
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
 * Retrieves a list of all categories from the database.
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

        if (await findByField(db, CATEGORY_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldCategory = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        if (!oldCategory)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Category ${categoryId} not found`);

        if (name && oldCategory?.name === name)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `Old category name and new category name can not be the same`);

        const updatedCategoryDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, CATEGORY_COLLECTION_NAME, categoryId, updatedCategoryDetails);
        const latestData = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        // If the category name is updated, then update it in ADMINISTRATION_COLLECTION_NAME
        const administrationsToUpdate = await findManyByField(db, ADMINISTRATION_COLLECTION_NAME, 'category', oldCategory?.name);

        await updateFieldForMultipleDocuments(
            db,
            ADMINISTRATION_COLLECTION_NAME,
            administrationsToUpdate,
            'category',
            category => category === oldCategory?.name ? name : category
        );

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

        const oldCategory = await findByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        if (!oldCategory)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Category ${categoryId} not found`);

        const result = await deleteByField(db, CATEGORY_COLLECTION_NAME, 'id', categoryId);

        // If the category name is updated, then update it in ADMINISTRATION_COLLECTION_NAME
        const administrationsToDelete = await findManyByField(db, ADMINISTRATION_COLLECTION_NAME, 'category', oldCategory?.name);

        await updateFieldForMultipleDocuments(
            db,
            ADMINISTRATION_COLLECTION_NAME,
            administrationsToDelete,
            'category',
            category => category === oldCategory.name ? "category-name-deleted" : category
        );

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