/**
 * @fileoverview Services for Video Gallery Operations.
 *
 * This module contains service functions for a managing video gallery. These services
 * handle the database interactions and business logic for creating, retrieving, updating, and deleting
 * important information links on a website. Each service function is tailored to process specific data
 * and execute corresponding database operations. This module is integral to managing the data layer of
 * the application, ensuring that video gallery is handled consistently and reliably.
 *
 * @requires DatabaseMiddleware - Middleware for database interactions.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires generateResponseData - Helper function for generating standardized response data.
 * @requires logger - Utility for logging errors.
 * @requires createByDetails - Helper function for adding new entries to the database.
 * @requires findByField - Helper function for finding database entries by ID.
 * @requires getAllData - Helper function for retrieving all data from a database collection.
 * @requires updateById - Helper function for updating database entries by ID.
 * @requires deleteByField - Helper function for deleting database entries by ID.
 * @module VideoGalleryService - Exported services for video gallery operations.
 */

import { VIDEO_GALLERY_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { VIDEO_GALLERY_CONSTANTS } from "./videoGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import logger from "../../../../shared/logger.js";
import createByDetails from "../../../../shared/createByDetails.js";
import findByField from "../../../../shared/findByField.js";
import getAllData from "../../../../shared/getAllData.js";
import updateById from "../../../../shared/updateById.js";
import deleteByField from "../../../../shared/deleteByField.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import extractYoutubeVideoID from "../../../../helpers/extractYoutubeVideoID.js";

/**
 * Creates a new entry for a video gallery in the database.
 * The Processes provided link details and added them to the database. It ensures that the admin ID is valid
 * and then constructs a new entry with the provided link details. The function returns a response indicating
 * successful creation or an error.
 *
 * @param {Object} db - Database connection object.
 * @param {Object} newVideoGalleryDetails - Details of the new link to be created.
 * @returns {Object} Response indicating the outcome of the operation.
 */
const createVideoGalleryService = async (db, newVideoGalleryDetails) => {
    try {
        const { videoGalleryTitle, videoLink, adminId } = newVideoGalleryDetails;
        const videoID = extractYoutubeVideoID(videoLink);

        if (!videoID)
            return generateResponseData({}, false, STATUS_BAD_REQUEST, 'Invalid YouTube URL');

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const videoGalleryDetails = {
            id: generateUniqueID(VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_PREFIX),
            videoGalleryTitle: videoGalleryTitle,
            videoLink: videoLink,
            videoID: videoID, // Include the extracted video ID
            createdBy: adminId,
            createdAt: new Date(),
        };
        const result = await createByDetails(db, VIDEO_GALLERY_COLLECTION_NAME, videoGalleryDetails);
        const latestData = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryDetails?.id);

        delete latestData?._id;
        delete latestData?.createdBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${latestData?.videoGalleryTitle} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves all existing video galleries from the database.
 * Queries the database for all links and returns them, or a message if no links are found.
 *
 * @param {Object} db - Database connection object.
 * @returns {Object} List of links or a message indicating no links found.
 */
const getVideoGalleryListService = async (db) => {
    try {
        const videoGallery = await getAllData(db, VIDEO_GALLERY_COLLECTION_NAME);

        return videoGallery?.length
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGallery?.length} video found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No video found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Fetches a specific video gallery by its ID.
 * Looks for a link with the provided ID in the database and return its details, or a message if not found.
 *
 * @param {Object} db - Database connection object.
 * @param {string} videoGalleryId - ID of the link to be retrieved.
 * @returns {Object} Link details or a message indicating link not found.
 */
const getAVideoGalleryService = async (db, videoGalleryId) => {
    try {
        const videoGallery = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId);

        return videoGallery
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Updates an existing video gallery in the database.
 * Processes the updated link details and applies the changes to the corresponding entry in the database.
 * Returns a response indicating the outcome of the update operation.
 *
 * @param {Object} db - Database connection object.
 * @param {string} videoGalleryId - ID of the link to be updated.
 * @param {Object} updateVideoGalleryDetails - Updated link details.
 * @returns {Object} Response indicating the outcome of the update operation.
 */
const updateAVideoGalleryService = async (db, videoGalleryId, updateVideoGalleryDetails) => {
    try {
        const { videoGalleryTitle, videoLink, adminId } = updateVideoGalleryDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);

        // Extract the video ID if a new video link is provided
        const videoID = videoLink ? extractYoutubeVideoID(videoLink) : null;

        const updatedVideoGallery = {
            ...(videoGalleryTitle && { videoGalleryTitle }),
            ...(videoLink && { videoLink }),
            ...(videoID && { videoID }), // Include the video ID in the update if it's available
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, VIDEO_GALLERY_COLLECTION_NAME, videoGalleryId, updatedVideoGallery);
        const latestData = await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${videoGalleryId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${videoGalleryId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific video gallery from the database.
 * Verifies the admin authority and the existence of the link, then proceeds to delete the link from the database.
 * Returns a response indicating the outcome of the deletion operation.
 *
 * @param {Object} db - Database connection object.
 * @param {string} adminId - Admin ID performing the operation.
 * @param {string} videoGalleryId - ID of the link to be deleted.
 * @returns {Object} Response indicating the outcome of the deletion operation.
 */
const deleteAVideoGalleryService = async (db, adminId, videoGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, VIDEO_GALLERY_COLLECTION_NAME, 'id', videoGalleryId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);

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
    updateAVideoGalleryService,
    deleteAVideoGalleryService
};