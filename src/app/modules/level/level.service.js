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
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
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
        const { name, adminId } = newLevelDetails;

        if (await findByField(db, LEVEL_COLLECTION_NAME, 'name', name))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const levelDetails = {
            id: `${ID_CONSTANTS?.LEVEL_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, LEVEL_COLLECTION_NAME, levelDetails);
        const latestData = await findByField(db, LEVEL_COLLECTION_NAME, 'id', levelDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${levelDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
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

        return error;
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
        const level = await findByField(db, LEVEL_COLLECTION_NAME, 'id', levelId);

        delete level?.createdBy;
        delete level?.modifiedBy;

        return level
            ? generateResponseData(level, true, STATUS_OK, `${levelId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${levelId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
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
        const { name, adminId } = newLevelDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedLevelDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, LEVEL_COLLECTION_NAME, levelId, updatedLevelDetails);
        const latestData = await findByField(db, LEVEL_COLLECTION_NAME, 'id', levelId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${levelId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${levelId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific level by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} levelId - The ID of the level to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteALevelService = async (db, adminId, levelId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, LEVEL_COLLECTION_NAME, 'id', levelId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${levelId} not found`);

        const result = await deleteByField(db, LEVEL_COLLECTION_NAME, 'id', levelId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${levelId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${levelId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
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