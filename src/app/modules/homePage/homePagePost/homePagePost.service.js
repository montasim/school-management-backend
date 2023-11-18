/**
 * @fileoverview HomePagePost Service for Handling HomePagePost Data Operations.
 *
 * This module provides services for managing HomePagePost-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting HomePagePosts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract database and file system interactions, providing a
 * streamlined interface for the controller layer to perform CRUD operations on HomePagePost data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePagePostService - Exported services for HomePagePost operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { HOME_PAGE_POST_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE, STATUS_BAD_REQUEST,
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
import findByField from "../../../../shared/findByField.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../../shared/updateById.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new HomePagePost entry in the database.
 * This function handles the creation of a new HomePagePost, including uploading an associated file
 * to Google Drive and storing the post details in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newHomePagePostDetails - Object containing details of the new HomePagePost.
 * @param {Object} file - The file object for the HomePagePost's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the HomePagePost.
 * @throws {Error} Throws an error if the database operation or file upload fails.
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
        const latestData = await findByField(db, HOME_PAGE_POST_COLLECTION_NAME, 'id', homePagePostDetails?.id);

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
 * Retrieves a list of all HomePagePosts from the database.
 * This function fetches all entries from the HomePagePost collection and returns them.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @returns {Promise<Object>} A promise that resolves to an object containing a list of HomePagePosts.
 * @throws {Error} Throws an error if the database operation fails.
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
 * Retrieves a specific HomePagePost by its ID from the database.
 * This function fetches details of a single HomePagePost based on the provided ID.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} homePagePostId - The ID of the HomePagePost to retrieve.
 * @returns {Promise<Object>} A promise that resolves to an object containing details of the requested HomePagePost.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAHomePagePostService = async (db, homePagePostId) => {
    try {
        const homePagePost = await findByField(db, HOME_PAGE_POST_COLLECTION_NAME, 'id', homePagePostId);

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
 * Updates a specific HomePagePost entry in the database.
 *
 * This function handles the updating of HomePagePost details based on the provided ID.
 * It allows updating fields such as title, category, description, and the post image.
 * If a new image is provided, it replaces the old one in Google Drive and updates
 * the corresponding fields in the database.
 *
 * @async
 * @function updateAHomePagePostService
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newHomePagePostDetails - Object containing the new details of the HomePagePost.
 * @param {string} newHomePagePostDetails.homePagePostId - The ID of the HomePagePost to update.
 * @param {string} newHomePagePostDetails.title - The new title of the HomePagePost.
 * @param {string} newHomePagePostDetails.category - The new category of the HomePagePost.
 * @param {string} newHomePagePostDetails.description - The new description of the HomePagePost.
 * @param {string} newHomePagePostDetails.adminId - The ID of the admin performing the update.
 * @param {Object} postImage - The new image file for the HomePagePost, if provided.
 * @returns {Promise<Object>} A promise that resolves to the response object containing the updated details or an error message.
 * @throws {Error} If an error occurs during the database operation or file upload.
 */
const updateAHomePagePostService = async (db, newHomePagePostDetails, postImage) => {
    try {
        const { homePagePostId, title, category, description, adminId } = newHomePagePostDetails;

        if (!title && !category && !description && !postImage)
            return generateResponseData({}, false, STATUS_BAD_REQUEST, "All fields cannot be empty");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Retrieve the current details of the home page post
        const oldDetails = await findByField(db, HOME_PAGE_POST_COLLECTION_NAME, 'id', homePagePostId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);

        // Initialize the object to store updated details
        const updatedHomePagePostDetails = { ...oldDetails };

        // Update file if provided
        if (postImage) {
            await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails.googleDriveFileId);
            const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(postImage);

            if (!uploadGoogleDriveFileResponse?.shareableLink)
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

            updatedHomePagePostDetails.googleDriveFileId = uploadGoogleDriveFileResponse.fileId;
            updatedHomePagePostDetails.googleDriveShareableLink = uploadGoogleDriveFileResponse.shareableLink;
        }

        // Update title, category, and description if provided
        if (title) updatedHomePagePostDetails.title = title;
        if (category) updatedHomePagePostDetails.category = category;
        if (description) updatedHomePagePostDetails.description = description;

        // Update modifiedBy and modifiedAt
        updatedHomePagePostDetails.modifiedBy = adminId;
        updatedHomePagePostDetails.modifiedAt = new Date();

        // Update the home page post
        const result = await updateById(db, HOME_PAGE_POST_COLLECTION_NAME, homePagePostId, updatedHomePagePostDetails);

        // Retrieve the updated data
        const latestData = await findByField(db, HOME_PAGE_POST_COLLECTION_NAME, 'id', homePagePostId);

        // Remove unnecessary data before sending response
        delete latestData._id;
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
 * Deletes a specific HomePagePost by its ID from the database.
 * This function handles the deletion of a HomePagePost, including removing any associated file from Google Drive.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} adminId - The ID of the admin requesting the deletion.
 * @param {string} homePagePostId - The ID of the HomePagePost to delete.
 * @returns {Promise<Object>} A promise that resolves to a confirmation message or an error message.
 * @throws {Error} Throws an error if the database operation or file deletion fails.
 */
const deleteAHomePagePostService = async (db, adminId, homePagePostId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, HOME_PAGE_POST_COLLECTION_NAME, 'id', homePagePostId);

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