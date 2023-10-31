import { v4 as uuidv4 } from 'uuid';
import { ADMINISTRATION_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./administration.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidById from "../../../shared/isValidById.js";
import logger from "../../middlewares/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponse from "../../../helpers/generateResponse.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new administration entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newAdministrationDetails - New administration's details.
 * @returns {Object} - The response after attempting administration creation.
 * @throws {Error} Throws an error if any.
 */
const createAdministrationService = async (db, newAdministrationDetails) => {
    try {
        const { name, category, designation, image, requestedBy } = newAdministrationDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        const administrationDetails = {
            id: `${ID_CONSTANTS?.ADMINISTRATION_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            category,
            designation,
            image,
            createdBy: requestedBy,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails);
        const latestData = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails?.id);

        return result?.acknowledged
            ? generateResponse(latestData, true, 200, `${administrationDetails?.name} created successfully`)
            : generateResponse({}, false, 500, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all administrations from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @returns {Object} - The list of administrations or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAdministrationListService = async (db) => {
    try {
        const administrations = await getAllData(db, ADMINISTRATION_COLLECTION_NAME);

        return administrations?.length
            ? generateResponse(administrations, true, 200, `${administrations?.length} administration found`)
            : generateResponse({}, false, 404, 'No administration found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} administrationId - The ID of the administration to retrieve.
 * @returns {Object} - The administration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAAdministrationService = async (db, administrationId) => {
    try {
        const administration = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return administration
            ? generateResponse(administration, true, 200, `${administrationId} found successfully`)
            : generateResponse({}, false, 404, `${administrationId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} administrationId - The ID of the administration to retrieve.
 * @param newAdministrationDetails
 * @returns {Object} - The administration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAAdministrationService = async (db, administrationId, newAdministrationDetails) => {
    try {
        const { name, level, image, requestedBy } = newAdministrationDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        const updatedAdministrationDetails = {
            ...(name && { name }),
            ...(level && { level }),
            ...(image && { image }),
            modifiedBy: requestedBy,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, ADMINISTRATION_COLLECTION_NAME, administrationId, updatedAdministrationDetails);
        const latestData = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return result?.modifiedCount
            ? generateResponse(latestData, true, 200, `${administrationId} updated successfully`)
            : generateResponse({}, false, 422, `${administrationId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific administration by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} requestedBy - The user ID making the request.
 * @param {string} administrationId - The ID of the administration to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAAdministrationService = async (db, requestedBy, administrationId) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, ADMINISTRATION_COLLECTION_NAME, administrationId))
            return generateResponse({}, false, 404, `${administrationId} not found`);

        const result = await deleteById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return result
            ? generateResponse({}, true, 200, `${administrationId} deleted successfully`)
            : generateResponse({}, false, 422, `${administrationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
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
