/**
 * @fileoverview Services for managing routine operations.
 *
 * This module contains services related to routine operations within the application. It includes functions for
 * creating new routine records, fetching a list of all routines, retrieving specific routines by filename, and
 * deleting routines. Each service function interfaces with the application's database and performs specific
 * business logic operations, ensuring proper management and retrieval of routine data. Additionally, these services
 * handle interactions with external storage services, like Google Drive, for file uploads and deletions.
 *
 * @requires ROUTINE_COLLECTION_NAME - Configured collection name for routines in the database.
 * @requires constants - Application constants for various status codes and messages.
 * @requires ID_CONSTANTS - Constants for prefixing identifiers in the routine module.
 * @requires isValidRequest - Utility function to validate request authenticity.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @requires createByDetails - Utility for adding new entries to the database.
 * @requires findByField - Utility for finding a record by its identifier.
 * @requires getAllData - Utility for retrieving all records from a database collection.
 * @requires deleteByField - Utility for deleting records by filename.
 * @requires GoogleDriveFileOperations - Helper for interacting with the Google Drive API.
 * @module RoutineService - Exported object containing routine-related service functions.
 */

import { ROUTINE_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ROUTINE_CONSTANTS } from "./routine.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import createByDetails from "../../../shared/createByDetails.js";
import findByField from "../../../shared/findByField.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByField from "../../../shared/deleteByField.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import fileManager from "../../../helpers/fileManager.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

/**
 * Creates a new routine entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newRoutineDetails - New routine's details.
 * @param file
 * @returns {Object} - The response after attempting routine creation.
 * @throws {Error} Throws an error if any.
 */
const createRoutineService = async (req, newRoutineDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newRoutineDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', file?.originalname))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`)

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const routineDetails = {
            id: generateUniqueID(ROUTINE_CONSTANTS?.ROUTINE_ID_PREFIX),
            title: title,
            fileName: file?.originalname,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            routineLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, ROUTINE_COLLECTION_NAME, routineDetails);
        const latestData = await findByField(db, ROUTINE_COLLECTION_NAME, 'id', routineDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.fileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${file?.originalname} uploaded successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all routines from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of routines or an error message.
 * @throws {Error} Throws an error if any.
 */
const getRoutineListService = async (db) => {
    try {
        const routines = await getAllData(db, ROUTINE_COLLECTION_NAME);

        return routines?.length
            ? generateResponseData(routines, true, STATUS_OK, `${routines?.length} routine found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No routine found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific routine by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} fileName - The fileName of the routine to retrieve.
 * @returns {Object} - The routine details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getARoutineService = async (db, fileName) => {
    try {
        const routine = await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

        delete routine?.fileId;

        return routine
            ? generateResponseData(routine, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific routine by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @param {string} fileName - The fileName of the routine to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteARoutineService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

        if (fileDetails) {
            await fileManager.deleteFile(fileDetails.fileId);

            const result = await deleteByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

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
 * @namespace RoutineService
 * @description Group of services related to routine operations.
 */
export const RoutineService = {
    createRoutineService,
    getRoutineListService,
    getARoutineService,
    deleteARoutineService
};
