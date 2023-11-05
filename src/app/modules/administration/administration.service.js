// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configurations
import { ADMINISTRATION_COLLECTION_NAME } from "../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./administration.constants.js";

// Shared utilities
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
 * Creates a new administration entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newAdministrationDetails - New administration's details.
 * @returns {Object} - The response after attempting administration creation.
 * @throws {Error} Throws an error if any.
 */
const createAdministrationService = async (db, newAdministrationDetails) => {
    try {
        const { name, category, designation, image, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const administrationDetails = {
            id: `${ID_CONSTANTS?.ADMINISTRATION_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            category,
            designation,
            image,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails);
        const latestData = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${administrationDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all administrations from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of administrations or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAdministrationListService = async (db) => {
    try {
        const administrations = await getAllData(db, ADMINISTRATION_COLLECTION_NAME);

        return administrations?.length
            ? generateResponseData(administrations, true, STATUS_OK, `${administrations?.length} administration found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No administration found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} administrationId - The ID of the administration to retrieve.
 * @returns {Object} - The administration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAAdministrationService = async (db, administrationId) => {
    try {
        const administration = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return administration
            ? generateResponseData(administration, true, STATUS_OK, `${administrationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} administrationId - The ID of the administration to retrieve.
 * @param newAdministrationDetails
 * @returns {Object} - The administration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAAdministrationService = async (db, administrationId, newAdministrationDetails) => {
    try {
        const { name, category, designation, image, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedAdministrationDetails = {
            ...(name && { name }),
            ...(category && { category }),
            ...(designation && { designation }),
            ...(image && { image }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, ADMINISTRATION_COLLECTION_NAME, administrationId, updatedAdministrationDetails);
        const latestData = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${administrationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${administrationId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} administrationId - The ID of the administration to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAAdministrationService = async (db, adminId, administrationId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, ADMINISTRATION_COLLECTION_NAME, administrationId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);

        const result = await deleteById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${administrationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${administrationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace AdministrationService
 * @description Group of services related to administration operations.
 */
export const AdministrationService = {
    createAdministrationService,
    getAdministrationListService,
    getAAdministrationService,
    updateAAdministrationService,
    deleteAAdministrationService
};
