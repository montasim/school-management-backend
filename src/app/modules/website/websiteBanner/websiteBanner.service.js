/**
 * @fileoverview WebsiteBanner Service for Handling WebsiteBanner Data Operations.
 *
 * This module provides services for managing websiteBanner-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting websiteBanner posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on websiteBanner data.
 *
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module WebsiteBannerService - Exported services for websiteBanner operations.
 */

import { WEBSITE_BANNER_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { WEBSITE_BANNER_CONSTANTS } from "./websiteBanner.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findByField from "../../../../shared/findByField.js";
import createByDetails from "../../../../shared/createByDetails.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new websiteBanner entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} adminId - Admin ID.
 * @param {Object} file - The file object for the websiteBanner's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the websiteBanner.
 */
const createWebsiteBannerService = async (db, adminId, file) => {
    try {
        const existingDetails = await getAllData(db, WEBSITE_BANNER_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website banner already exists. Please delete website banner, then add a new banner");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const websiteBannerDetails = {
            id: generateUniqueID(WEBSITE_BANNER_CONSTANTS?.WEBSITE_BANNER_ID_PREFIX),
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            downloadLink: uploadGoogleDriveFileResponse?.downloadLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, WEBSITE_BANNER_COLLECTION_NAME, websiteBannerDetails);
        const latestData = await findByField(db, WEBSITE_BANNER_COLLECTION_NAME, 'id', websiteBannerDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData?.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website banner created successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific websiteBanner by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The websiteBanner details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAWebsiteBannerService = async (db) => {
    try {
        const websiteBanner = await db.collection(WEBSITE_BANNER_COLLECTION_NAME).findOne({});

        delete websiteBanner?.createdBy;
        delete websiteBanner?.modifiedBy;
        delete websiteBanner.googleDriveFileId;

        return websiteBanner
            ? generateResponseData(websiteBanner, true, STATUS_OK, "Website banner found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, "Website banner not found");
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific websiteBanner by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAWebsiteBannerService = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await db.collection(WEBSITE_BANNER_COLLECTION_NAME).findOne({});

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, "Website banner not found");

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        // Deletes all documents in the collection without deleting the collection itself
        const result = await db.collection(WEBSITE_BANNER_COLLECTION_NAME).deleteMany({});

        return result
            ? generateResponseData({}, true, STATUS_OK, "Website banner deleted successfully")
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website banner could not be deleted");
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteBannerService
 * @description Group of services related to websiteBanner operations.
 */
export const WebsiteBannerService = {
    createWebsiteBannerService,
    getAWebsiteBannerService,
    deleteAWebsiteBannerService
};