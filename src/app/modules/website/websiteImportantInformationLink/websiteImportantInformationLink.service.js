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
 * @requires createByDetails - Helper function for adding new entries to the database.
 * @requires findByField - Helper function for finding database entries by ID.
 * @requires getAllData - Helper function for retrieving all data from a database collection.
 * @requires updateById - Helper function for updating database entries by ID.
 * @requires deleteByField - Helper function for deleting database entries by ID.
 * @module WebsiteImportantInformationLinkService - Exported services for website important information link operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteImportantInformationLink.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import logger from "../../../../shared/logger.js";
import createByDetails from "../../../../shared/createByDetails.js";
import findByField from "../../../../shared/findByField.js";
import getAllData from "../../../../shared/getAllData.js";
import updateById from "../../../../shared/updateById.js";
import deleteByField from "../../../../shared/deleteByField.js";

/**
 * Creates a new entry for a website important information link in the database.
 * Processes the provided link details and adds them to the database. It ensures that the admin ID is valid
 * and then constructs a new entry with the provided link details. The function returns a response indicating
 * successful creation or an error.
 *
 * @param {Object} db - Database connection object.
 * @param {Object} newWebsiteImportantInformationLinkDetails - Details of the new link to be created.
 * @returns {Object} Response indicating the outcome of the operation.
 */
const createWebsiteImportantInformationLinkService = async (db, newWebsiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinkTitle, importantInformationLink, adminId } = newWebsiteImportantInformationLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const websiteImportantInformationLinkDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            importantInformationLinkTitle: importantInformationLinkTitle,
            importantInformationLink: importantInformationLink,
            createdBy: adminId,
            createdAt: new Date(),
        };
        const result = await createByDetails(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, websiteImportantInformationLinkDetails);
        const latestData = await findByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkDetails?.id);

        delete latestData?._id;
        delete latestData?.createdBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${latestData?.importantInformationLinkTitle} created successfully`)
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
const getWebsiteImportantInformationLinkListService = async (db) => {
    try {
        const websiteImportantInformationLinks = await getAllData(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME);

        return websiteImportantInformationLinks?.length
            ? generateResponseData(websiteImportantInformationLinks, true, STATUS_OK, `${websiteImportantInformationLinks?.length} websiteImportantInformationLink found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No websiteImportantInformationLink found');
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
 * @param {string} websiteImportantInformationLinkId - ID of the link to be retrieved.
 * @returns {Object} Link details or a message indicating link not found.
 */
const getAWebsiteImportantInformationLinkService = async (db, websiteImportantInformationLinkId) => {
    try {
        const websiteImportantInformationLink = await findByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkId);

        return websiteImportantInformationLink
            ? generateResponseData(websiteImportantInformationLink, true, STATUS_OK, `${websiteImportantInformationLinkId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteImportantInformationLinkId} not found`);
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
 * @param {string} websiteImportantInformationLinkId - ID of the link to be updated.
 * @param {Object} updateWebsiteImportantInformationLinkDetails - Updated link details.
 * @returns {Object} Response indicating the outcome of the update operation.
 */
const updateAWebsiteImportantInformationLinkService = async (db, websiteImportantInformationLinkId, updateWebsiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinkTitle, importantInformationLink, adminId } = updateWebsiteImportantInformationLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteImportantInformationLinkId} not found`);

        const updatedWebsiteImportantInformationLink = {
            ...(importantInformationLinkTitle && { importantInformationLinkTitle }),
            ...(importantInformationLink && { importantInformationLink }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, websiteImportantInformationLinkId, updatedWebsiteImportantInformationLink);
        const latestData = await findByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${websiteImportantInformationLinkId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${websiteImportantInformationLinkId} not updated`);

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
 * @param {string} websiteImportantInformationLinkId - ID of the link to be deleted.
 * @returns {Object} Response indicating the outcome of the deletion operation.
 */
const deleteAWebsiteImportantInformationLinkService = async (db, adminId, websiteImportantInformationLinkId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await findByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteImportantInformationLinkId} not found`);

        const result = await deleteByField(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, 'id', websiteImportantInformationLinkId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${websiteImportantInformationLinkId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${websiteImportantInformationLinkId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteImportantInformationLinkService
 * @description Group of services related to websiteImportantInformationLink operations.
 */
export const WebsiteImportantInformationLinkService = {
    createWebsiteImportantInformationLinkService,
    getWebsiteImportantInformationLinkListService,
    getAWebsiteImportantInformationLinkService,
    updateAWebsiteImportantInformationLinkService,
    deleteAWebsiteImportantInformationLinkService
};