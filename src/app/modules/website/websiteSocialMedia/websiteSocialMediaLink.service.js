/**
 * @fileoverview Services for Website Important Information Link Operations.
 *
 * This module contains service functions for managing website important information links. These services
 * handle the database interactions and business logic for creating, retrieving, updating, and deleting
 * important information links on a website. Each service function is tailored to process specific data
 * and execute corresponding database operations. This module is integral to managing the data layer of
 * the application, ensuring that website important information links are handled consistently and reliably.
 *
 * @requires DatabaseMiddleware - Middleware for database interactions.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires generateResponseData - Helper function for generating standardized response data.
 * @requires logger - Utility for logging errors.
 * @requires addANewEntryToDatabase - Helper function for adding new entries to the database.
 * @requires findByField - Helper function for finding database entries by ID.
 * @requires getAllData - Helper function for retrieving all data from a database collection.
 * @requires updateById - Helper function for updating database entries by ID.
 * @requires deleteById - Helper function for deleting database entries by ID.
 * @module WebsiteSocialMediaLinkService - Exported services for website important information link operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteSocialMediaLink.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import logger from "../../../../shared/logger.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import findByField from "../../../../shared/findByField.js";
import getAllData from "../../../../shared/getAllData.js";
import updateById from "../../../../shared/updateById.js";
import deleteById from "../../../../shared/deleteById.js";

/**
 * Creates a new entry for a website important information link in the database.
 * Processes the provided link details and adds them to the database. It ensures that the admin ID is valid
 * and then constructs a new entry with the provided link details. The function returns a response indicating
 * successful creation or an error.
 *
 * @param {Object} db - Database connection object.
 * @param {Object} newWebsiteSocialMediaLinkDetails - Details of the new link to be created.
 * @returns {Object} Response indicating the outcome of the operation.
 */
const createWebsiteSocialMediaLinkService = async (db, newWebsiteSocialMediaLinkDetails) => {
    try {
        const { socialMediaLinkTitle, socialMediaLink, adminId } = newWebsiteSocialMediaLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const websiteSocialMediaLinkDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            socialMediaLinkTitle: socialMediaLinkTitle,
            socialMediaLink: socialMediaLink,
            createdBy: adminId,
            createdAt: new Date(),
        };
        const result = await addANewEntryToDatabase(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkDetails);
        const latestData = await findByField(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkDetails?.id);

        delete latestData?._id;
        delete latestData?.createdBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${latestData?.socialMediaLinkTitle} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves all existing website important information links from the database.
 * Queries the database for all links and returns them, or a message if no links are found.
 *
 * @param {Object} db - Database connection object.
 * @returns {Object} List of links or a message indicating no links found.
 */
const getWebsiteSocialMediaLinkListService = async (db) => {
    try {
        const websiteSocialMediaLinks = await getAllData(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME);

        return websiteSocialMediaLinks?.length
            ? generateResponseData(websiteSocialMediaLinks, true, STATUS_OK, `${websiteSocialMediaLinks?.length} website social media link found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website social media link found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Fetches a specific website important information link by its ID.
 * Looks for a link with the provided ID in the database and returns its details, or a message if not found.
 *
 * @param {Object} db - Database connection object.
 * @param {string} websiteSocialMediaLinkId - ID of the link to be retrieved.
 * @returns {Object} Link details or a message indicating link not found.
 */
const getAWebsiteSocialMediaLinkService = async (db, websiteSocialMediaLinkId) => {
    try {
        const websiteSocialMediaLink = await findByField(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId);

        return websiteSocialMediaLink
            ? generateResponseData(websiteSocialMediaLink, true, STATUS_OK, `${websiteSocialMediaLinkId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteSocialMediaLinkId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Updates an existing website important information link in the database.
 * Processes the updated link details and applies the changes to the corresponding entry in the database.
 * Returns a response indicating the outcome of the update operation.
 *
 * @param {Object} db - Database connection object.
 * @param {string} websiteSocialMediaLinkId - ID of the link to be updated.
 * @param {Object} updateWebsiteSocialMediaLinkDetails - Updated link details.
 * @returns {Object} Response indicating the outcome of the update operation.
 */
const updateAWebsiteSocialMediaLinkService = async (db, websiteSocialMediaLinkId, updateWebsiteSocialMediaLinkDetails) => {
    try {
        const { socialMediaLinkTitle, socialMediaLink, adminId } = updateWebsiteSocialMediaLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteSocialMediaLinkId} not found`);

        const updatedWebsiteSocialMediaLink = {
            ...(socialMediaLinkTitle && { socialMediaLinkTitle }),
            ...(socialMediaLink && { socialMediaLink }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId, updatedWebsiteSocialMediaLink);
        const latestData = await findByField(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${websiteSocialMediaLinkId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${websiteSocialMediaLinkId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific website important information link from the database.
 * Verifies the admin authority and the existence of the link, then proceeds to delete the link from the database.
 * Returns a response indicating the outcome of the deletion operation.
 *
 * @param {Object} db - Database connection object.
 * @param {string} adminId - Admin ID performing the operation.
 * @param {string} websiteSocialMediaLinkId - ID of the link to be deleted.
 * @returns {Object} Response indicating the outcome of the deletion operation.
 */
const deleteAWebsiteSocialMediaLinkService = async (db, adminId, websiteSocialMediaLinkId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteSocialMediaLinkId} not found`);

        const result = await deleteById(db, WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME, websiteSocialMediaLinkId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${websiteSocialMediaLinkId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${websiteSocialMediaLinkId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteSocialMediaLinkService
 * @description Group of services related to website social media link operations.
 */
export const WebsiteSocialMediaLinkService = {
    createWebsiteSocialMediaLinkService,
    getWebsiteSocialMediaLinkListService,
    getAWebsiteSocialMediaLinkService,
    updateAWebsiteSocialMediaLinkService,
    deleteAWebsiteSocialMediaLinkService
};