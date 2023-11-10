/**
 * @fileoverview Services for managing result operations.
 *
 * This module contains services related to result operations within the application. It includes functions for
 * creating new result records, fetching a list of all results, retrieving specific results by filename, and
 * deleting results. Each service function interfaces with the application's database and performs specific
 * business logic operations, ensuring proper management and retrieval of result data. Additionally, these services
 * handle interactions with external storage services, like Google Drive, for file uploads and deletions.
 *
 * @requires uuid - Module to generate unique identifiers.
 * @requires RESULT_COLLECTION_NAME - Configured collection name for results in the database.
 * @requires constants - Application constants for various status codes and messages.
 * @requires ID_CONSTANTS - Constants for prefixing identifiers in the result module.
 * @requires isValidRequest - Utility function to validate request authenticity.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @requires addANewEntryToDatabase - Utility for adding new entries to the database.
 * @requires findById - Utility for finding a record by its identifier.
 * @requires getAllData - Utility for retrieving all records from a database collection.
 * @requires deleteByFileName - Utility for deleting records by filename.
 * @requires findByFileName - Utility for finding a record by its filename.
 * @requires GoogleDriveFileOperations - Helper for interacting with the Google Drive API.
 * @module ResultService - Exported object containing result-related service functions.
 */

import { v4 as uuidv4 } from 'uuid';
import { RESULT_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./result.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByFileName from "../../../shared/deleteByFileName.js";
import findByFileName from "../../../shared/findByFileName.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js";

/**
 * Creates a new result entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newResultDetails - New result's details.
 * @param file
 * @returns {Object} - The response after attempting result creation.
 * @throws {Error} Throws an error if any.
 */
const createResultService = async (db, newResultDetails, file) => {
    try {
        const { title, adminId } = newResultDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByFileName(db, RESULT_COLLECTION_NAME, file?.originalname))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`)

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const resultDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: file?.originalname,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, RESULT_COLLECTION_NAME, resultDetails);
        const latestData = await findById(db, RESULT_COLLECTION_NAME, resultDetails?.id);

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
 * Retrieves a list of all results from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of results or an error message.
 * @throws {Error} Throws an error if any.
 */
const getResultListService = async (db) => {
    try {
        const results = await getAllData(db, RESULT_COLLECTION_NAME);

        return results?.length
            ? generateResponseData(results, true, STATUS_OK, `${results?.length} result found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No result found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific result by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} fileName - The fileName of the result to retrieve.
 * @returns {Object} - The result details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAResultService = async (db, fileName) => {
    try {
        const result = await findByFileName(db, RESULT_COLLECTION_NAME, fileName);

        delete result?.googleDriveFileId;

        return result
            ? generateResponseData(result, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific result by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @param {string} fileName - The fileName of the result to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAResultService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByFileName(db, RESULT_COLLECTION_NAME, fileName);

        if (fileDetails) {
            await GoogleDriveFileOperations.deleteFileFromDrive(fileDetails?.googleDriveFileId);
            const result = await deleteByFileName(db, RESULT_COLLECTION_NAME, fileName);

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
 * @namespace ResultService
 * @description Group of services related to result operations.
 */
export const ResultService = {
    createResultService,
    getResultListService,
    getAResultService,
    deleteAResultService
};