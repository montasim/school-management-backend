// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configuration
import { ANNOUNCEMENT_COLLECTION_NAME } from "../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./announcement.constants.js";

// Shared utilities
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidById from "../../../shared/isValidById.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

// Logger
import logger from "../../../shared/logger.js";

/**
 * Creates a new announcement entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newAnnouncementDetails - New announcement's details.
 * @returns {Object} - The response after attempting announcement creation.
 * @throws {Error} Throws an error if any.
 */
const createAnnouncementService = async (db, newAnnouncementDetails) => {
    try {
        const { name, adminId } = newAnnouncementDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const announcementDetails = {
            id: `${ID_CONSTANTS?.ANNOUNCEMENT_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, ANNOUNCEMENT_COLLECTION_NAME, announcementDetails);
        const latestData = await findById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${announcementDetails?.id} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all announcement from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of announcement or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAnnouncementListService = async (db) => {
    try {
        const announcement = await getAllData(db, ANNOUNCEMENT_COLLECTION_NAME);

        return announcement?.length > 0
            ? generateResponseData(announcement, true, STATUS_OK, `${announcement?.length} announcement found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No announcement found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific announcement by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} announcementId - The ID of the announcement to retrieve.
 * @returns {Object} - The announcement details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAAnnouncementService = async (db, announcementId) => {
    try {
        const announcement = await findById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementId);

        delete announcement?.createdBy;
        delete announcement?.modifiedBy;

        return announcement
            ? generateResponseData(announcement, true, STATUS_OK, `${announcementId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific announcement by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} announcementId - The ID of the announcement to retrieve.
 * @param newAnnouncementDetails
 * @returns {Object} - The announcement details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAAnnouncementService = async (db, announcementId, newAnnouncementDetails) => {
    try {
        const { name, adminId } = newAnnouncementDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedAnnouncementDetails = {
            ...(name && { name }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementId, updatedAnnouncementDetails);
        const latestData = await findById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${announcementId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${announcementId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific announcement by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} announcementId - The ID of the announcement to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAAnnouncementService = async (db, adminId, announcementId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);

        const result = await deleteById(db, ANNOUNCEMENT_COLLECTION_NAME, announcementId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${announcementId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${announcementId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace AnnouncementService
 * @description Group of services related to announcement operations.
 */
export const AnnouncementService = {
    createAnnouncementService,
    getAnnouncementListService,
    getAAnnouncementService,
    updateAAnnouncementService,
    deleteAAnnouncementService
};
