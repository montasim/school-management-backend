// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configurations
import { OTHERS_INFORMATION_COLLECTION_NAME } from "../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./othersInformation.constants.js";

// Shared utilities
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new othersInformation entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newOthersInformationDetails - New othersInformation's details.
 * @returns {Object} - The response after attempting othersInformation creation.
 * @throws {Error} Throws an error if any.
 */
const createOthersInformationService = async (db, newOthersInformationDetails) => {
    try {
        const { title, category, description, adminId } = newOthersInformationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const othersInformationDetails = {
            id: `${ID_CONSTANTS?.OTHERS_INFORMATION_PREFIX}-${uuidv4().substr(0, 6)}`,
            title,
            category,
            description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, OTHERS_INFORMATION_COLLECTION_NAME, othersInformationDetails);
        const latestData = await findByField(db, OTHERS_INFORMATION_COLLECTION_NAME, 'id', othersInformationDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${othersInformationDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all othersInformation from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of othersInformation or an error message.
 * @throws {Error} Throws an error if any.
 */
const getOthersInformationListService = async (db) => {
    try {
        const othersInformation = await getAllData(db, OTHERS_INFORMATION_COLLECTION_NAME);

        return othersInformation?.length
            ? generateResponseData(othersInformation, true, STATUS_OK, `${othersInformation?.length} othersInformation found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No othersInformation found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific othersInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} othersInformationId - The ID of the othersInformation to retrieve.
 * @returns {Object} - The othersInformation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAOthersInformationService = async (db, othersInformationId) => {
    try {
        const othersInformation = await findByField(db, OTHERS_INFORMATION_COLLECTION_NAME, othersInformationId);

        return othersInformation
            ? generateResponseData(othersInformation, true, STATUS_OK, `${othersInformationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific othersInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} othersInformationId - The ID of the othersInformation to retrieve.
 * @param newOthersInformationDetails
 * @returns {Object} - The othersInformation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAOthersInformationService = async (db, othersInformationId, newOthersInformationDetails) => {
    try {
        const { title, category, description, adminId } = newOthersInformationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Retrieve the current details of the others information
        const oldDetails = await findByField(db, OTHERS_INFORMATION_COLLECTION_NAME, othersInformationId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationId} not found`);

        // Initialize the object to store updated details
        const updatedOthersInformationDetails = { ...oldDetails };

        // Update title, category, and description if provided
        if (title) updatedOthersInformationDetails.title = title;
        if (category) updatedOthersInformationDetails.category = category;
        if (description) updatedOthersInformationDetails.description = description;

        // Update modifiedBy and modifiedAt
        updatedOthersInformationDetails.modifiedBy = adminId;
        updatedOthersInformationDetails.modifiedAt = new Date();

        // Update the others information data
        const result = await updateById(db, OTHERS_INFORMATION_COLLECTION_NAME, othersInformationId, updatedOthersInformationDetails);

        // Retrieve the updated data
        const latestData = await findByField(db, OTHERS_INFORMATION_COLLECTION_NAME, othersInformationId);

        // Remove unnecessary data before sending response
        delete latestData._id;
        delete latestData.createdBy;
        delete latestData.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${othersInformationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific othersInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} othersInformationId - The ID of the othersInformation to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAOthersInformationService = async (db, adminId, othersInformationId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, OTHERS_INFORMATION_COLLECTION_NAME, 'id', othersInformationId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationId} not found`);

        const result = await deleteByField(db, OTHERS_INFORMATION_COLLECTION_NAME, 'id', othersInformationId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${othersInformationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace OthersInformationService
 * @description Group of services related to othersInformation operations.
 */
export const OthersInformationService = {
    createOthersInformationService,
    getOthersInformationListService,
    getAOthersInformationService,
    updateAOthersInformationService,
    deleteAOthersInformationService
};