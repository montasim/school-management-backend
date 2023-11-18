/**
 * @fileoverview PhotoGallery Service for Handling PhotoGallery Data Operations.
 *
 * This module provides services for managing photoGallery-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting photoGallery posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on photoGallery data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module PhotoGalleryService - Exported services for photoGallery operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { PHOTO_GALLERY_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./photoGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new photoGallery entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newPhotoGalleryDetails - Object containing details of the new photoGallery.
 * @param {Object} file - The file object for the photoGallery's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the photoGallery.
 */
const createPhotoGalleryService = async (db, newPhotoGalleryDetails, file) => {
    try {
        const { title, adminId } = newPhotoGalleryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const photoGalleryDetails = {
            id: `${ID_CONSTANTS?.PHOTO_GALLERY_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, PHOTO_GALLERY_COLLECTION_NAME, photoGalleryDetails);
        const latestData = await findById(db, PHOTO_GALLERY_COLLECTION_NAME, photoGalleryDetails?.id);

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
 * Retrieves a list of all homePagePhotoGallery from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePagePhotoGallery or an error message.
 * @throws {Error} Throws an error if any.
 */
const getPhotoGalleryListService = async (db) => {
    try {
        const photoGallery = await getAllData(db, PHOTO_GALLERY_COLLECTION_NAME);

        return photoGallery?.length
            ? generateResponseData(photoGallery, true, STATUS_OK, `${photoGallery?.length} home page gallery found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No home page gallery found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePagePhotoGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} photoGalleryId - The ID of the homePagePhotoGallery to retrieve.
 * @returns {Object} - The homePagePhotoGallery details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAPhotoGalleryService = async (db, photoGalleryId) => {
    try {
        const photoGallery = await findById(db, PHOTO_GALLERY_COLLECTION_NAME, photoGalleryId);

        delete photoGallery?.createdBy;
        delete photoGallery?.modifiedBy;
        delete photoGallery.googleDriveFileId;

        return photoGallery
            ? generateResponseData(photoGallery, true, STATUS_OK, `${photoGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${photoGalleryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePagePhotoGallery by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} photoGalleryId - The ID of the homePagePhotoGallery to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAPhotoGalleryService = async (db, adminId, photoGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, PHOTO_GALLERY_COLLECTION_NAME, photoGalleryId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${photoGalleryId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, PHOTO_GALLERY_COLLECTION_NAME, photoGalleryId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${photoGalleryId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${photoGalleryId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePagePhotoGalleryService
 * @description Group of services related to homePagePhotoGallery operations.
 */
export const PhotoGalleryService = {
    createPhotoGalleryService,
    getPhotoGalleryListService,
    getAPhotoGalleryService,
    deleteAPhotoGalleryService
};