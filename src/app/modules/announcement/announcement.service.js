import { ANNOUNCEMENT_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./announcement.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";
import logger from "../../../shared/logger.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

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
            id: generateUniqueID(ID_CONSTANTS?.ANNOUNCEMENT_PREFIX),
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, ANNOUNCEMENT_COLLECTION_NAME, announcementDetails);
        const latestData = await findByField(db, ANNOUNCEMENT_COLLECTION_NAME, 'id', announcementDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${announcementDetails?.id} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
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

        return error;
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
        const announcement = await findByField(db, ANNOUNCEMENT_COLLECTION_NAME, 'id', announcementId);

        delete announcement?.createdBy;
        delete announcement?.modifiedBy;

        return announcement
            ? generateResponseData(announcement, true, STATUS_OK, `${announcementId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
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
        const latestData = await findByField(db, ANNOUNCEMENT_COLLECTION_NAME, 'id', announcementId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${announcementId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${announcementId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
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

        if (!await findByField(db, ANNOUNCEMENT_COLLECTION_NAME, 'id', announcementId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);

        const result = await deleteByField(db, ANNOUNCEMENT_COLLECTION_NAME, 'id', announcementId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${announcementId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${announcementId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
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
