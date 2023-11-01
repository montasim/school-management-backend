import { v4 as uuidv4 } from 'uuid';
import { DOWNLOAD_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./download.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidByFileName from "../../../shared/isValidByFileName.js";
import generateResponseData from "../../../helpers/generateResponseData.js";
import logger from "../../middlewares/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByFileName from "../../../shared/deleteByFileName.js";
import getFileNameAndPathName from "../../../shared/getFileNameAndPathName.js";
import findByFileName from "../../../shared/findByFileName.js";

/**
 * Creates a new download entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newDownloadDetails - New download's details.
 * @param file
 * @returns {Object} - The response after attempting download creation.
 * @throws {Error} Throws an error if any.
 */
const createDownloadService = async (db, newDownloadDetails, file) => {
    try {
        const { title, requestedBy } = newDownloadDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const getFileNameAndPathNameVariables = await getFileNameAndPathName(file);
        const downloadDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: getFileNameAndPathNameVariables?.uniqueFilename,
            path: getFileNameAndPathNameVariables?.uniquePath,
            createdBy: requestedBy,
            createdAt: new Date(),
        };
        const result = await addANewEntryToDatabase(db, DOWNLOAD_COLLECTION_NAME, downloadDetails);
        const latestData = await findById(db, DOWNLOAD_COLLECTION_NAME, downloadDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, 200, `${title} uploaded successfully`)
            : generateResponseData({}, false, 500, 'Failed to upload. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all downloads from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @returns {Object} - The list of downloads or an error message.
 * @throws {Error} Throws an error if any.
 */
const getDownloadListService = async (db) => {
    try {
        const downloads = await getAllData(db, DOWNLOAD_COLLECTION_NAME);

        return downloads?.length
            ? generateResponseData(downloads, true, 200, `${downloads?.length} download found`)
            : generateResponseData({}, false, 404, 'No download found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific download by fileName from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} fileName - The fileName of the download to retrieve.
 * @returns {Object} - The download details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getADownloadService = async (db, fileName) => {
    try {
        const download = await findByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

        return download
            ? generateResponseData(download, true, 200, `${fileName} found successfully`)
            : generateResponseData({}, false, 404, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific download by fileName from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} requestedBy - The user fileName making the request.
 * @param {string} fileName - The fileName of the download to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteADownloadService = async (db, requestedBy, fileName) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        if (!await isValidByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName))
            return generateResponseData({}, false, 404, `${fileName} not found`);

        const result = await deleteByFileName(db, DOWNLOAD_COLLECTION_NAME, fileName);

        return result
            ? generateResponseData({}, true, 200, `${fileName} deleted successfully`)
            : generateResponseData({}, false, 422, `${fileName} could not be deleted`);
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
