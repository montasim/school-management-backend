// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configurations
import { BLOG_COLLECTION_NAME } from "../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./blog.constants.js";

// Shared utilities
import isValidRequest from "../../../shared/isValidRequest.js";
import setMimeTypeFromExtension from "../../../helpers/setMimeTypeFromExtension.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../shared/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new homePageBlogPost-entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newBlogPostDetails - New homePageBlogPost details.
 * @returns {Object} - The response after attempting homePageBlogPost creation.
 * @throws {Error} Throws an error if any.
 */
const createBlogPost = async (db, newBlogPostDetails) => {
    try {
        const { title, category, postImage, description, adminId } = newBlogPostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const postImageMimeType = setMimeTypeFromExtension(postImage?.fileName);
        const uploadPostImageResponse = await GoogleDriveFileOperations.uploadFileToDrive(postImage?.fileName, postImage?.fileBuffer, postImageMimeType);

        if (!uploadPostImageResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
            
        const blogPostDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_POST_PREFIX}-${uuidv4().substr(0, 6)}`,
            title,
            category,
            googleDriveImageId: uploadPostImageResponse?.fileId,
            imageLink: uploadPostImageResponse?.shareableLink,
            description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, BLOG_COLLECTION_NAME, blogPostDetails);
        const latestData = await findById(db, BLOG_COLLECTION_NAME, blogPostDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveImageId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${title} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all homePageBlogPost from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageBlogPost or an error message.
 * @throws {Error} Throws an error if any.
 */
const getBlogPostList = async (db) => {
    try {
        const blogPost = await getAllData(db, BLOG_COLLECTION_NAME);

        return blogPost?.length
            ? generateResponseData(blogPost, true, STATUS_OK, `${blogPost?.length} blogPost found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageBlogPost found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageBlogPost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} blogPostId - The ID of the homePageBlogPost to retrieve.
 * @returns {Object} - The homePageBlogPost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getABlogPost = async (db, blogPostId) => {
    try {
        const blogPost = await findById(db, BLOG_COLLECTION_NAME, blogPostId);

        delete blogPost?.createdBy;
        delete blogPost?.modifiedBy;
        delete blogPost.googleDriveImageId;

        return blogPost
            ? generateResponseData(blogPost, true, STATUS_OK, `${blogPostId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${blogPostId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageBlogPost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} blogPostId - The ID of the homePageBlogPost to retrieve.
 * @param newBlogPostDetails
 * @returns {Object} - The homePageBlogPost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateABlogPost = async (db, blogPostId, newBlogPostDetails) => {
    try {
        const { title, category, postImage, description, adminId } = newBlogPostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, BLOG_COLLECTION_NAME, blogPostId);
        
        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogPostId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveImageId);

        const postImageMimeType = setMimeTypeFromExtension(postImage?.fileName);
        const uploadPostImageResponse = await GoogleDriveFileOperations.uploadFileToDrive(postImage?.fileName, postImage?.fileBuffer, postImageMimeType);

        if (!uploadPostImageResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
         
        const updatedBlogPostDetails = {
            ...(title && { title }),
            ...(category && { category }),
            googleDriveImageId: uploadPostImageResponse?.fileId,
            imageLink: uploadPostImageResponse?.shareableLink,
            ...(description && { description }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, BLOG_COLLECTION_NAME, blogPostId, updatedBlogPostDetails);
        const latestData = await findById(db, BLOG_COLLECTION_NAME, blogPostId);
        
        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${blogPostId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${blogPostId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageBlogPost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} blogPostId - The ID of the homePageBlogPost to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteABlogPost = async (db, adminId, blogPostId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, BLOG_COLLECTION_NAME, blogPostId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogPostId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveImageId);
        
        const result = await deleteById(db, BLOG_COLLECTION_NAME, blogPostId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${blogPostId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${blogPostId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageBlogPostService
 * @description Group of services related to homePageBlogPost operations.
 */
export const BlogPostService = {
    createBlogPost,
    getBlogPostList,
    getABlogPost,
    updateABlogPost,
    deleteABlogPost
};
