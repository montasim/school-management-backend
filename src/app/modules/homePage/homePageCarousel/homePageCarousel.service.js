/**
 * @fileoverview HomePageCarousel Service for Handling HomePageCarousel Data Operations.
 *
 * This module provides services for managing homePageCarousel-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting homePageCarousel posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on homePageCarousel data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePageCarouselService - Exported services for homePageCarousel operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { HOME_PAGE_CAROUSEL_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePageCarousel.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findByField from "../../../../shared/findByField.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new homePageCarousel entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newHomePageCarouselDetails - Object containing details of the new homePageCarousel.
 * @param {Object} file - The file object for the homePageCarousel's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the homePageCarousel.
 */
const createHomePageCarouselService = async (db, newHomePageCarouselDetails, file) => {
    try {
        const { title, category, description, adminId } = newHomePageCarouselDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const homePageCarouselDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_CAROUSEL_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselDetails);
        const latestData = await findByField(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, 'id', homePageCarouselDetails?.id);

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
 * Retrieves a list of all homePageHomePageCarousel from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageHomePageCarousel or an error message.
 * @throws {Error} Throws an error if any.
 */
const getHomePageCarouselListService = async (db) => {
    try {
        const homePageCarousel = await getAllData(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME);

        return homePageCarousel?.length
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarousel?.length} homePageCarousel found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageHomePageCarousel found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageHomePageCarousel by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePageCarouselId - The ID of the homePageHomePageCarousel to retrieve.
 * @returns {Object} - The homePageHomePageCarousel details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAHomePageCarouselService = async (db, homePageCarouselId) => {
    try {
        const homePageCarousel = await findByField(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, 'id', homePageCarouselId);

        delete homePageCarousel?.createdBy;
        delete homePageCarousel?.modifiedBy;
        delete homePageCarousel.googleDriveFileId;

        return homePageCarousel
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarouselId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageHomePageCarousel by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} homePageCarouselId - The ID of the homePageHomePageCarousel to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAHomePageCarouselService = async (db, adminId, homePageCarouselId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, 'id', homePageCarouselId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${homePageCarouselId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePageCarouselId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageHomePageCarouselService
 * @description Group of services related to homePageHomePageCarousel operations.
 */
export const HomePageCarouselService = {
    createHomePageCarouselService,
    getHomePageCarouselListService,
    getAHomePageCarouselService,
    deleteAHomePageCarouselService
};