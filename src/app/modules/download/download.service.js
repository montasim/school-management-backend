// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Absolute imports
import { DOWNLOAD_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";

// Relative imports
import { ID_CONSTANTS } from "./download.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidByFileName from "../../../shared/isValidByFileName.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByFileName from "../../../shared/deleteByFileName.js";
import getFileNameAndPathName from "../../../helpers/getFileNameAndPathName.js";
import findByFileName from "../../../shared/findByFileName.js";

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

        const getFileNameAndPathNameVariables = await getFileNameAndPathName(file);
        const downloadDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: getFileNameAndPathNameVariables?.uniqueFilename,
            path: getFileNameAndPathNameVariables?.uniquePath,
            createdBy: adminId,
            createdAt: new Date(),
        };
        const result = await addANewEntryToDatabase(db, DOWNLOAD_COLLECTION_NAME, downloadDetails);
        const latestData = await findById(db, DOWNLOAD_COLLECTION_NAME, downloadDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${title} uploaded successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
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

        throw error;
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

        return download
            ? generateResponseData(download, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
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

        if (!await isValidByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);

        const result = await deleteByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${fileName} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
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
