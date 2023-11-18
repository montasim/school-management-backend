// Third-party libraries
import { v4 as uuidv4 } from 'uuid';

// Configuration and Constants
import { DESIGNATION_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./designation.constants.js";

// Shared utilities and functions
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

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

        if (await findByField(db, DESIGNATION_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const designationDetails = {
            id: `${ID_CONSTANTS?.LEVEL_PREFIX}-${uuidv4().substr(0, 6)}`,
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
 * @description Group of services related to designation operations.
 */
export const DesignationService = {
    createDesignationService,
    getDesignationListService,
    getADesignationService,
    updateADesignationService,
    deleteADesignationService
};