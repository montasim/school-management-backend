/**
 * @fileoverview Services for Designation Operations.
 *
 * This module exports a set of services responsible for handling various operations related to designations in an Express application.
 * Each service is an asynchronous function that interacts with the database, performs the specified operation, and generates a response or error message.
 * The services also include error handling to ensure graceful handling of exceptions.
 *
 * @requires DatabaseMiddleware - Database connection middleware for interacting with the database.
 * @requires DESIGNATION_COLLECTION_NAME - Configuration constant for the collection name in the database.
 * @requires constants - Constants used for defining status codes and messages.
 * @requires DESIGNATION_CONSTANTS - Constants specific to designation operations.
 * @requires isValidRequest - Shared utility function to validate incoming requests.
 * @requires logger - Shared utility for logging.
 * @requires deleteByField - Shared utility for deleting data from the database by a specific field.
 * @requires generateResponseData - Shared utility for generating consistent response data.
 * @requires findByField - Shared utility for finding data in the database by a specific field.
 * @requires createByDetails - Shared utility for creating data in the database with provided details.
 * @requires updateById - Shared utility for updating data in the database by ID.
 * @requires getAllData - Shared utility for fetching all data from a collection.
 * @module DesignationService - Exported services for designation operations in the application.
 */

import { DESIGNATION_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { DESIGNATION_CONSTANTS } from "./designation.constants.js";
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
 * Creates a new designation entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newDesignationDetails - New designation's details.
 * @returns {Object} - The response after attempting designation creation.
 * @throws {Error} Throws an error if any.
 */
const createDesignationService = async (db, newDesignationDetails) => {
    try {
        const { name, adminId } = newDesignationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByField(db, DESIGNATION_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        const designationDetails = {
            id: generateUniqueID(DESIGNATION_CONSTANTS?.DESIGNATION_ID_PREFIX),
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, DESIGNATION_COLLECTION_NAME, designationDetails);
        const latestData = await findByField(db, DESIGNATION_COLLECTION_NAME, 'id', designationDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${designationDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all designation from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of designation or an error message.
 * @throws {Error} Throws an error if any.
 */
const getDesignationListService = async (db) => {
    try {
        const designation = await getAllData(db, DESIGNATION_COLLECTION_NAME);

        return designation?.length
            ? generateResponseData(designation, true, STATUS_OK, `${designation?.length} designation found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No designation found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific designation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} designationId - The ID of the designation to retrieve.
 * @returns {Object} - The designation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getADesignationService = async (db, designationId) => {
    try {
        const designation = await findByField(db, DESIGNATION_COLLECTION_NAME, 'id', designationId);

        delete designation?.createdBy;
        delete designation?.modifiedBy;

        return designation
            ? generateResponseData(designation, true, STATUS_OK, `${designationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${designationId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific designation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} designationId - The ID of the designation to retrieve.
 * @param newDesignationDetails
 * @returns {Object} - The designation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateADesignationService = async (db, designationId, newDesignationDetails) => {
    try {
        const { name, adminId } = newDesignationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedDesignationDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, DESIGNATION_COLLECTION_NAME, designationId, updatedDesignationDetails);
        const latestData = await findByField(db, DESIGNATION_COLLECTION_NAME, 'id', designationId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${designationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${designationId} not updated`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific designation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} designationId - The ID of the designation to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteADesignationService = async (db, adminId, designationId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, DESIGNATION_COLLECTION_NAME, 'id', designationId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${designationId} not found`);

        const result = await deleteByField(db, DESIGNATION_COLLECTION_NAME, 'id', designationId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${designationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${designationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace DesignationService
 * @description Provides a set of services for handling CRUD operations related to designations.
 * These services encapsulate the business logic required for designation operations and include error handling for robust functionality.
 */
export const DesignationService = {
    createDesignationService,
    getDesignationListService,
    getADesignationService,
    updateADesignationService,
    deleteADesignationService
};