/**
 * @fileoverview HomePageGallery Service for Handling HomePageGallery Data Operations.
 *
 * This module provides services for managing homePageGallery-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting homePageGallery posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on homePageGallery data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePageGalleryService - Exported services for homePageGallery operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { HOME_PAGE_GALLERY_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePageGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new homePageGallery entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newHomePageGalleryDetails - Object containing details of the new homePageGallery.
 * @param {Object} file - The file object for the homePageGallery's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the homePageGallery.
 */
const createHomePageGalleryService = async (db, newHomePageGalleryDetails, file) => {
    try {
        const { title, category, description, adminId } = newHomePageGalleryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const homePageGalleryDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_GALLERY_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_GALLERY_COLLECTION_NAME, homePageGalleryDetails);
        const latestData = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, homePageGalleryDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${title} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all homePageHomePageGallery from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageHomePageGallery or an error message.
 * @throws {Error} Throws an error if any.
 */
const getHomePageGalleryListService = async (db) => {
    try {
        const homePageGallery = await getAllData(db, HOME_PAGE_GALLERY_COLLECTION_NAME);

        return homePageGallery?.length
            ? generateResponseData(homePageGallery, true, STATUS_OK, `${homePageGallery?.length} homePageGallery found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageHomePageGallery found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageHomePageGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePageGalleryId - The ID of the homePageHomePageGallery to retrieve.
 * @returns {Object} - The homePageHomePageGallery details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAHomePageGalleryService = async (db, homePageGalleryId) => {
    try {
        const homePageGallery = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, homePageGalleryId);

        delete homePageGallery?.createdBy;
        delete homePageGallery?.modifiedBy;
        delete homePageGallery.googleDriveFileId;

        return homePageGallery
            ? generateResponseData(homePageGallery, true, STATUS_OK, `${homePageGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageGalleryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageHomePageGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} homePageGalleryId - The ID of the homePageHomePageGallery to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAHomePageGalleryService = async (db, adminId, homePageGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, homePageGalleryId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageGalleryId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, homePageGalleryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${homePageGalleryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePageGalleryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageHomePageGalleryService
 * @description Group of services related to homePageHomePageGallery operations.
 */
export const HomePageGalleryService = {
    createHomePageGalleryService,
    getHomePageGalleryListService,
    getAHomePageGalleryService,
    deleteAHomePageGalleryService
};