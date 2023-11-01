// Third-party libraries
import { v4 as uuidv4 } from 'uuid';

// Configuration and Constants
import { LEVEL_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./level.constants.js";

// Shared utilities and functions
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
 * Creates a new level entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newLevelDetails - New level's details.
 * @returns {Object} - The response after attempting level creation.
 * @throws {Error} Throws an error if any.
 */
const createLevelService = async (db, newLevelDetails) => {
    try {
        const { name, requestedBy } = newLevelDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const levelDetails = {
            id: `${ID_CONSTANTS?.LEVEL_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            createdBy: requestedBy,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, LEVEL_COLLECTION_NAME, levelDetails);
        const latestData = await findById(db, LEVEL_COLLECTION_NAME, levelDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${levelDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all level from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of level or an error message.
 * @throws {Error} Throws an error if any.
 */
const getLevelListService = async (db) => {
    try {
        const level = await getAllData(db, LEVEL_COLLECTION_NAME);

        return level?.length
            ? generateResponseData(level, true, STATUS_OK, `${level?.length} level found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No level found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific level by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} levelId - The ID of the level to retrieve.
 * @returns {Object} - The level details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getALevelService = async (db, levelId) => {
    try {
        const level = await findById(db, LEVEL_COLLECTION_NAME, levelId);

        delete level?.createdBy;
        delete level?.modifiedBy;

        return level
            ? generateResponseData(level, true, STATUS_OK, `${levelId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${levelId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific level by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} levelId - The ID of the level to retrieve.
 * @param newLevelDetails
 * @returns {Object} - The level details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateALevelService = async (db, levelId, newLevelDetails) => {
    try {
        const { name, requestedBy } = newLevelDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedLevelDetails = {
            ...(name && { name }),
            modifiedBy: requestedBy,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, LEVEL_COLLECTION_NAME, levelId, updatedLevelDetails);
        const latestData = await findById(db, LEVEL_COLLECTION_NAME, levelId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${levelId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${levelId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific level by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} requestedBy - The user ID making the request.
 * @param {string} levelId - The ID of the level to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteALevelService = async (db, requestedBy, levelId) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, LEVEL_COLLECTION_NAME, levelId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${levelId} not found`);

        const result = await deleteById(db, LEVEL_COLLECTION_NAME, levelId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${levelId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${levelId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace LevelService
 * @description Group of services related to level operations.
 */
export const LevelService = {
    createLevelService,
    getLevelListService,
    getALevelService,
    updateALevelService,
    deleteALevelService
};
