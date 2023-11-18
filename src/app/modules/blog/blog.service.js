/**
 * @fileoverview Blog Service for Handling Blog Data Operations.
 *
 * This module provides services for managing blog-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting blog posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on blog data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module BlogService - Exported services for blog operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { BLOG_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./blog.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../shared/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new blog entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newBlogDetails - Object containing details of the new blog.
 * @param {Object} file - The file object for the blog's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the blog.
 */
const createBlogService = async (db, newBlogDetails, file) => {
    try {
        const { title, category, description, adminId } = newBlogDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const blogDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_POST_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            category: category,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            description: description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, BLOG_COLLECTION_NAME, blogDetails);
        const latestData = await findByField(db, BLOG_COLLECTION_NAME, 'id', blogDetails?.id);

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
 * Retrieves a list of all blog from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of blog or an error message.
 * @throws {Error} Throws an error if any.
 */
const getBlogListService = async (db) => {
    try {
        const blog = await getAllData(db, BLOG_COLLECTION_NAME);

        return blog?.length
            ? generateResponseData(blog, true, STATUS_OK, `${blog?.length} blog found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No blog found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific blog by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} blogId - The ID of the blog to retrieve.
 * @returns {Object} - The blog details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getABlogService = async (db, blogId) => {
    try {
        const blog = await findByField(db, BLOG_COLLECTION_NAME, 'id', blogId);

        delete blog?.createdBy;
        delete blog?.modifiedBy;
        delete blog.googleDriveFileId;

        return blog
            ? generateResponseData(blog, true, STATUS_OK, `${blogId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific blog by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} blogId - The ID of the blog to retrieve.
 * @param newBlogDetails
 * @param {Object} file - The file object for the blog's associated image or content.
 * @returns {Object} - The blog details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateABlogService = async (db, blogId, newBlogDetails, file) => {
    try {
        const { title, category, description, adminId } = newBlogDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Retrieve the current details of the blog
        const oldDetails = await findByField(db, BLOG_COLLECTION_NAME, 'id', blogId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);

        // Initialize the object to store updated details
        const updatedBlogDetails = { ...oldDetails };

        // Update file if provided
        if (file) {
            await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails.googleDriveFileId);
            const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

            if (!uploadGoogleDriveFileResponse?.shareableLink)
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

            updatedBlogDetails.googleDriveFileId = uploadGoogleDriveFileResponse.fileId;
            updatedBlogDetails.googleDriveShareableLink = uploadGoogleDriveFileResponse.shareableLink;
        }

        // Update title, category, and description if provided
        if (title) updatedBlogDetails.title = title;
        if (category) updatedBlogDetails.category = category;
        if (description) updatedBlogDetails.description = description;

        // Update modifiedBy and modifiedAt
        updatedBlogDetails.modifiedBy = adminId;
        updatedBlogDetails.modifiedAt = new Date();

        // Update the blog
        const result = await updateById(db, BLOG_COLLECTION_NAME, blogId, updatedBlogDetails);

        // Retrieve the updated data
        const latestData = await findByField(db, BLOG_COLLECTION_NAME, 'id', blogId);

        // Remove unnecessary data before sending response
        delete latestData._id;
        delete latestData.createdBy;
        delete latestData.modifiedBy;
        delete latestData.googleDriveFileId;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${blogId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${blogId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific blog by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} blogId - The ID of the blog to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteABlogService = async (db, adminId, blogId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, BLOG_COLLECTION_NAME, 'id', blogId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, BLOG_COLLECTION_NAME, blogId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${blogId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${blogId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace BlogService
 * @description Group of services related to blog operations.
 */
export const BlogService = {
    createBlogService,
    getBlogListService,
    getABlogService,
    updateABlogService,
    deleteABlogService
};