/**
 * @fileoverview Services for managing download operations.
 *
 * This module contains services related to download operations within the application. It includes functions for
 * creating new download records, fetching a list of all downloads, retrieving specific downloads by filename, and
 * deleting downloads. Each service function interfaces with the application's database and performs specific
 * business logic operations, ensuring proper management and retrieval of download data. Additionally, these services
 * handle interactions with external storage services, like Google Drive, for file uploads and deletions.
 *
 * @requires uuid - Module to generate unique identifiers.
 * @requires DOWNLOAD_COLLECTION_NAME - Configured collection name for downloads in the database.
 * @requires constants - Application constants for various status codes and messages.
 * @requires ID_CONSTANTS - Constants for prefixing identifiers in the download module.
 * @requires isValidRequest - Utility function to validate request authenticity.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @requires addANewEntryToDatabase - Utility for adding new entries to the database.
 * @requires findById - Utility for finding a record by its identifier.
 * @requires getAllData - Utility for retrieving all records from a database collection.
 * @requires deleteByFileName - Utility for deleting records by filename.
 * @requires findByFileName - Utility for finding a record by its filename.
 * @requires HandleGoogleDrive - Helper for interacting with the Google Drive API.
 * @module DownloadService - Exported object containing download-related service functions.
 */

import { v4 as uuidv4 } from 'uuid';
import { DOWNLOAD_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./download.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByFileName from "../../../shared/deleteByFileName.js";
import findByFileName from "../../../shared/findByFileName.js";
import { HandleGoogleDrive } from "../../../helpers/handleGoogleDriveApi.js";

/**
 * Creates a new download entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newDownloadDetails - New download's details.
 * @param file
 * @returns {Object} - The response after attempting download creation.
 * @throws {Error} Throws an error if any.
 */
const createDownloadService = async (db, newDownloadDetails, file) => {
    try {
        const { title, adminId } = newDownloadDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByFileName(db, DOWNLOAD_COLLECTION_NAME, file?.originalname))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`)

        const uploadGoogleDriveFileResponse = await HandleGoogleDrive.uploadFile(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const downloadDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: file?.originalname,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, DOWNLOAD_COLLECTION_NAME, downloadDetails);
        const latestData = await findById(db, DOWNLOAD_COLLECTION_NAME, downloadDetails?.id);

        delete latestData?.id;
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
 * Retrieves a list of all downloads from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of downloads or an error message.
 * @throws {Error} Throws an error if any.
 */
const getDownloadListService = async (db) => {
    try {
        const downloads = await getAllData(db, DOWNLOAD_COLLECTION_NAME);

        return downloads?.length
            ? generateResponseData(downloads, true, STATUS_OK, `${downloads?.length} download found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No download found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific download by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} fileName - The fileName of the download to retrieve.
 * @returns {Object} - The download details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getADownloadService = async (db, fileName) => {
    try {
        const download = await findByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

        delete download?.googleDriveFileId;

        return download
            ? generateResponseData(download, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific download by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @param {string} fileName - The fileName of the download to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteADownloadService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

        if (fileDetails) {
            const response = await HandleGoogleDrive.deleteFile(fileDetails?.googleDriveFileId);
            const result = await deleteByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

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
 * @namespace DownloadService
 * @description Group of services related to download operations.
 */
export const DownloadService = {
    createDownloadService,
    getDownloadListService,
    getADownloadService,
    deleteADownloadService
};