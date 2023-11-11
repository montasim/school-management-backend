/**
 * @fileoverview HomePagePost Service for Handling HomePagePost Data Operations.
 *
 * This module provides services for managing homePagePost-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting homePagePost posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on homePagePost data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePagePostService - Exported services for homePagePost operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { HOME_PAGE_POST_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePagePost.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../../shared/updateById.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new homePagePost entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newHomePagePostDetails - Object containing details of the new homePagePost.
 * @param {Object} file - The file object for the homePagePost's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the homePagePost.
 */
const createHomePagePostService = async (db, newHomePagePostDetails, file) => {
    try {
        const { title, category, description, adminId } = newHomePagePostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const homePagePostDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_POST_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            category: category,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            description: description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostDetails);
        const latestData = await findById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostDetails?.id);

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
 * Retrieves a list of all homePageHomePagePost from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageHomePagePost or an error message.
 * @throws {Error} Throws an error if any.
 */
const getHomePagePostListService = async (db) => {
    try {
        const homePagePost = await getAllData(db, HOME_PAGE_POST_COLLECTION_NAME);

        return homePagePost?.length
            ? generateResponseData(homePagePost, true, STATUS_OK, `${homePagePost?.length} homePagePost found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageHomePagePost found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to retrieve.
 * @returns {Object} - The homePageHomePagePost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAHomePagePostService = async (db, homePagePostId) => {
    try {
        const homePagePost = await findById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId);

        delete homePagePost?.createdBy;
        delete homePagePost?.modifiedBy;
        delete homePagePost.googleDriveFileId;

        return homePagePost
            ? generateResponseData(homePagePost, true, STATUS_OK, `${homePagePostId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to retrieve.
 * @param newHomePagePostDetails
 * @param {Object} file - The file object for the homePagePost's associated image or content.
 * @returns {Object} - The homePageHomePagePost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAHomePagePostService = async (db, homePagePostId, newHomePagePostDetails, file) => {
    try {
        const { title, category, description, adminId } = newHomePagePostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const updatedHomePagePostDetails = {
            ...(title && { title }),
            ...(category && { category }),
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            ...(description && { description }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId, updatedHomePagePostDetails);
        const latestData = await findById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId);

        delete latestData.createdBy;
        delete latestData.modifiedBy;
        delete latestData.googleDriveFileId;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${homePagePostId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePagePostId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAHomePagePostService = async (db, adminId, homePagePostId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${homePagePostId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePagePostId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageHomePagePostService
 * @description Group of services related to homePageHomePagePost operations.
 */
export const HomePagePostService = {
    createHomePagePostService,
    getHomePagePostListService,
    getAHomePagePostService,
    updateAHomePagePostService,
    deleteAHomePagePostService
};