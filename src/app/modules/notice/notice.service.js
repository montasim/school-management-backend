/**
 * @fileoverview Services for managing notice operations.
 *
 * This module contains services related to notice operations within the application. It includes functions for
 * creating new notice records, fetching a list of all notices, retrieving specific notices by filename, and
 * deleting notices. Each service function interfaces with the application's database and performs specific
 * business logic operations, ensuring proper management and retrieval of notice data. Additionally, these services
 * handle interactions with external storage services, like Google Drive, for file uploads and deletions.
 *
 * @requires uuid - Module to generate unique identifiers.
 * @requires NOTICE_COLLECTION_NAME - Configured collection name for notices in the database.
 * @requires constants - Application constants for various status codes and messages.
 * @requires ID_CONSTANTS - Constants for prefixing identifiers in the notice module.
 * @requires isValidRequest - Utility function to validate request authenticity.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @requires createByDetails - Utility for adding new entries to the database.
 * @requires findByField - Utility for finding a record by its identifier.
 * @requires getAllData - Utility for retrieving all records from a database collection.
 * @requires deleteByField - Utility for deleting records by filename.
 * @requires GoogleDriveFileOperations - Helper for interacting with the Google Drive API.
 * @module NoticeService - Exported object containing notice-related service functions.
 */

import { v4 as uuidv4 } from 'uuid';
import { NOTICE_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./notice.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import createByDetails from "../../../shared/createByDetails.js";
import findByField from "../../../shared/findByField.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByField from "../../../shared/deleteByField.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js";

/**
 * Creates a new notice entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newNoticeDetails - New notice's details.
 * @param file
 * @returns {Object} - The response after attempting notice creation.
 * @throws {Error} Throws an error if any.
 */
const createNoticeService = async (db, newNoticeDetails, file) => {
    try {
        const { title, adminId } = newNoticeDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByField(db, NOTICE_COLLECTION_NAME, 'fileName', file?.originalname))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`)

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const noticeDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: file?.originalname,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, NOTICE_COLLECTION_NAME, noticeDetails);
        const latestData = await findByField(db, NOTICE_COLLECTION_NAME, 'id', noticeDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${file?.originalname} uploaded successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all notices from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of notices or an error message.
 * @throws {Error} Throws an error if any.
 */
const getNoticeListService = async (db) => {
    try {
        const notices = await getAllData(db, NOTICE_COLLECTION_NAME);

        return notices?.length
            ? generateResponseData(notices, true, STATUS_OK, `${notices?.length} notice found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No notice found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific notice by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} fileName - The fileName of the notice to retrieve.
 * @returns {Object} - The notice details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getANoticeService = async (db, fileName) => {
    try {
        const notice = await findByField(db, NOTICE_COLLECTION_NAME, 'fileName', fileName);

        delete notice?.googleDriveFileId;

        return notice
            ? generateResponseData(notice, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific notice by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @param {string} fileName - The fileName of the notice to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteANoticeService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByField(db, NOTICE_COLLECTION_NAME, 'fileName', fileName);

        if (fileDetails) {
            await GoogleDriveFileOperations.deleteFileFromDrive(fileDetails?.googleDriveFileId);

            const result = await deleteByField(db, NOTICE_COLLECTION_NAME, 'fileName', fileName);

            return result
                ? generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`)
                : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${fileName} could not be deleted`);
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace NoticeService
 * @description Group of services related to notice operations.
 */
export const NoticeService = {
    createNoticeService,
    getNoticeListService,
    getANoticeService,
    deleteANoticeService
};