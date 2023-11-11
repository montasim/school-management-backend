/**
 * @fileoverview Gallery Service for Handling Gallery Data Operations.
 *
 * This module provides services for managing gallery-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting gallery posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on gallery data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module GalleryService - Exported services for gallery operations.
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
import { ID_CONSTANTS } from "./gallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new gallery entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newGalleryDetails - Object containing details of the new gallery.
 * @param {Object} file - The file object for the gallery's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the gallery.
 */
const createGalleryService = async (db, newGalleryDetails, file) => {
    try {
        const { title, adminId } = newGalleryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const galleryDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_GALLERY_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_GALLERY_COLLECTION_NAME, galleryDetails);
        const latestData = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, galleryDetails?.id);

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
 * Retrieves a list of all homePageGallery from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageGallery or an error message.
 * @throws {Error} Throws an error if any.
 */
const getGalleryListService = async (db) => {
    try {
        const gallery = await getAllData(db, HOME_PAGE_GALLERY_COLLECTION_NAME);

        return gallery?.length
            ? generateResponseData(gallery, true, STATUS_OK, `${gallery?.length} gallery found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageGallery found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} galleryId - The ID of the homePageGallery to retrieve.
 * @returns {Object} - The homePageGallery details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAGalleryService = async (db, galleryId) => {
    try {
        const gallery = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, galleryId);

        delete gallery?.createdBy;
        delete gallery?.modifiedBy;
        delete gallery.googleDriveFileId;

        return gallery
            ? generateResponseData(gallery, true, STATUS_OK, `${galleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${galleryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} galleryId - The ID of the homePageGallery to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAGalleryService = async (db, adminId, galleryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, galleryId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${galleryId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, HOME_PAGE_GALLERY_COLLECTION_NAME, galleryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${galleryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${galleryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageGalleryService
 * @description Group of services related to homePageGallery operations.
 */
export const GalleryService = {
    createGalleryService,
    getGalleryListService,
    getAGalleryService,
    deleteAGalleryService
};