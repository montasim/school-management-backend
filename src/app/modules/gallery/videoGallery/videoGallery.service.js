/**
 * @fileoverview VideoGallery Service for Handling VideoGallery Data Operations.
 *
 * This module provides services for managing videoGallery-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting videoGallery posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on videoGallery data.
 *
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module VideoGalleryService - Exported services for videoGallery operations.
 */

import { VIDEO_GALLERY_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./videoGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteByField from "../../../../shared/deleteByField.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findByField from "../../../../shared/findByField.js";
import createByDetails from "../../../../shared/createByDetails.js";
import getAllData from "../../../../shared/getAllData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

/**
 * Creates a new videoGallery entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newVideoGalleryDetails - Object containing details of the new videoGallery.
 * @param {Object} file - The file object for the videoGallery's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the videoGallery.
 */
const createVideoGalleryService = async (db, newVideoGalleryDetails, file) => {
    try {
        const { title, adminId } = newVideoGalleryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const videoGalleryDetails = {
            id: generateUniqueID(ID_CONSTANTS?.VIDEO_GALLERY_PREFIX),
            title: title,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            downloadLink: uploadGoogleDriveFileResponse?.downloadLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, VIDEO_GALLERY_COLLECTION_NAME, videoGalleryDetails);
        const latestData = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData?.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${title} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all videoGallery from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of videoGallery or an error message.
 * @throws {Error} Throws an error if any.
 */
const getVideoGalleryListService = async (db) => {
    try {
        const videoGallery = await getAllData(db, VIDEO_GALLERY_COLLECTION_NAME);

        return videoGallery?.length
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGallery?.length} home page gallery found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No home page gallery found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific videoGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} videoGalleryId - The ID of the videoGallery to retrieve.
 * @returns {Object} - The videoGallery details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAVideoGalleryService = async (db, videoGalleryId) => {
    try {
        const videoGallery = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId);

        delete videoGallery?.createdBy;
        delete videoGallery?.modifiedBy;
        delete videoGallery.googleDriveFileId;

        return videoGallery
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific videoGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} videoGalleryId - The ID of the videoGallery to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAVideoGalleryService = async (db, adminId, videoGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${videoGalleryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${videoGalleryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace VideoGalleryService
 * @description Group of services related to videoGallery operations.
 */
export const VideoGalleryService = {
    createVideoGalleryService,
    getVideoGalleryListService,
    getAVideoGalleryService,
    deleteAVideoGalleryService
};