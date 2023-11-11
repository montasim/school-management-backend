/**
 * @fileoverview Service Functions for Website Configuration Management.
 *
 * This module provides a set of functions that interact with the database to perform
 * create, read, update, and delete (CRUD) operations on website configuration data.
 * It includes services for adding new configurations, retrieving existing configurations,
 * updating configurations, and deleting configurations. These functions are used by the
 * controllers to handle requests related to website configurations.
 *
 * @requires uuid - For generating unique identifiers.
 * @requires config - Application configuration settings.
 * @requires constants - Application-wide constants.
 * @requires GoogleDriveFileOperations - Helper functions for interacting with Google Drive.
 * @requires shared/helpers - Shared helper functions like isValidRequest and generateResponseData.
 * @module WebsiteConfigurationService - Exports service functions for website configurations.
 */

import { v4 as uuidv4 } from 'uuid';
import { WEBSITE_CONFIGURATION_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteConfiguration.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Service function to create a new website configuration.
 *
 * Handles the logic of adding a new website configuration to the database.
 * If a configuration already exists, it denies the creation process.
 * It also involves uploading the website logo to Google Drive and storing the
 * shareable link in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} websiteDetails - The details of the website to be added.
 * @param {Object} file - The file object representing the website logo.
 * @returns {Object} - The response data including success status and message.
 */
const createWebsiteConfigurationService = async (db, websiteDetails, file) => {
    try {
        const { name, slogan, adminId } = websiteDetails;
        const existingDetails = await getAllData(db, WEBSITE_CONFIGURATION_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website configuration already exists. Please update website configuration");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const prepareWebsiteDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            name: name,
            slogan: slogan,
            googleDriveWebsiteLogoFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveWebsiteLogoShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, WEBSITE_CONFIGURATION_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findById(db, WEBSITE_CONFIGURATION_COLLECTION_NAME, prepareWebsiteDetails?.id);

        delete latestData._id;
        delete latestData.id;
        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveWebsiteLogoFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website configuration added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service function to retrieve the current website configuration.
 *
 * Fetches the website configuration details from the database. If no configuration
 * is found, it returns a not found response.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @returns {Object} - The retrieved website configuration or an error message.
 */
const getWebsiteConfigurationService = async (db) => {
    try {
        const website = await getAllData(db, WEBSITE_CONFIGURATION_COLLECTION_NAME);

        return website?.length
            ? generateResponseData(website, true, STATUS_OK, "Website configuration found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service function to update an existing website configuration.
 *
 * Updates the website configuration details in the database, including uploading a new
 * website logo to Google Drive if provided. It ensures that the request is made by an
 * authorized admin and that the configuration to be updated exists.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} websiteDetails - New details for updating the website configuration.
 * @param {Object} file - The new file object for the website logo.
 * @returns {Object} - The response data including success status and updated configuration.
 */
const updateWebsiteConfigurationService = async (db, websiteDetails, file) => {
    try {
        const { adminId, name, slogan} = websiteDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldWebsiteDetails = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).findOne({});

        await GoogleDriveFileOperations.deleteFileFromDrive(oldWebsiteDetails?.googleDriveWebsiteLogoFileId);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const updatedWebsiteDetails = {
            ...(name && { name }),
            ...(slogan && { slogan }),
            googleDriveWebsiteLogoFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveWebsiteLogoShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).findOneAndUpdate(
            {}, // Assuming you are updating a single document without a filter.
            { $set: updatedWebsiteDetails },
            { returnDocument: 'after' } // Returns the updated document
        );

        if (!result) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `Website configuration not updated`);
        }

        delete result._id;
        delete result.id;
        delete result.createdBy;
        delete result.modifiedBy;
        delete result.googleDriveWebsiteLogoFileId;

        return generateResponseData(result, true, STATUS_OK, `Website configuration updated successfully`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service function to delete the existing website configuration.
 *
 * Removes the website configuration from the database. It also ensures the deletion
 * of the associated Google Drive file for the website logo. The function checks for
 * valid admin authorization and confirms the existence of the configuration before deletion.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} adminId - The identifier of the admin requesting the deletion.
 * @returns {Object} - The response data including success status and deletion confirmation.
 */
const deleteWebsiteConfigurationService = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        
        const oldDetails = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).findOne({});

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `Website configuration not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveWebsiteLogoFileId);

        // Deletes all documents in the collection without deleting the collection itself
        const result = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).deleteMany({});

        return result.deletedCount > 0
            ? generateResponseData({}, true, STATUS_OK, `Website configuration deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `No website configuration were found to delete`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteService
 * @description Group of services related to website operations.
 */
export const WebsiteConfigurationService = {
    createWebsiteConfigurationService,
    getWebsiteConfigurationService,
    updateWebsiteConfigurationService,
    deleteWebsiteConfigurationService
};