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
import setMimeTypeFromExtension from "../../../../helpers/setMimeTypeFromExtension.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new website configuration entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} websiteDetails - New website configuration.
 * @returns {Object} - The response after attempting website creation.
 * @throws {Error} Returns an error if any.
 */
const createWebsiteConfiguration = async (db, websiteDetails) => {
    try {
        const { name, slogan, websiteLogo, websiteFavIcon, adminId } = websiteDetails;
        const existingDetails = await getAllData(db, WEBSITE_CONFIGURATION_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website configuration already exists. Please update website configuration");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const websiteLogoMimeType = setMimeTypeFromExtension(websiteLogo?.fileName);
        const uploadLogoResponse = await GoogleDriveFileOperations.uploadFileToDrive(websiteLogo?.fileName, websiteLogo?.fileBuffer, websiteLogoMimeType);

        if (!uploadLogoResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        
        const websiteFavIconMimeType = setMimeTypeFromExtension(websiteFavIcon?.fileName);
        const uploadFavIconResponse = await GoogleDriveFileOperations.uploadFileToDrive(websiteFavIcon?.fileName, websiteFavIcon?.fileBuffer, websiteFavIconMimeType);

        if (!uploadFavIconResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        
        const prepareWebsiteDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            name: name,
            slogan: slogan,
            googleDriveLogoId: uploadLogoResponse?.fileId,
            websiteLogo: uploadLogoResponse?.shareableLink,
            googleDriveFavIconId: uploadFavIconResponse?.fileId,
            websiteFavIcon: uploadFavIconResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, WEBSITE_CONFIGURATION_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findById(db, WEBSITE_CONFIGURATION_COLLECTION_NAME, prepareWebsiteDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveLogoId;
        delete latestData.googleDriveFavIconId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website configuration added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves website configuration from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The website configuration or an error message.
 * @throws {Error} Returns an error if any.
 */
const getWebsiteConfiguration = async (db) => {
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
 * Update website configuration to the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteDetails
 * @returns {Object} - The website configuration or an error message.
 * @throws {Error} Returns an error if any.
 */
const updateWebsiteConfiguration = async (db, websiteDetails) => {
    try {
        const { adminId, name, websiteLogo, websiteFavIcon, slogan, contact, socialMediaLinks, officialLinks, importantInformationLinks } = websiteDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldWebsiteDetails = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).findOne({});

        await GoogleDriveFileOperations.deleteFileFromDrive(oldWebsiteDetails?.googleDriveLogoId);
        await GoogleDriveFileOperations.deleteFileFromDrive(oldWebsiteDetails?.googleDriveFavIconId);

        const websiteLogoMimeType = setMimeTypeFromExtension(websiteLogo?.fileName);
        const uploadLogoResponse = await GoogleDriveFileOperations.uploadFileToDrive(websiteLogo?.fileName, websiteLogo?.fileBuffer, websiteLogoMimeType);

        if (!uploadLogoResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        
        const websiteFavIconMimeType = setMimeTypeFromExtension(websiteFavIcon?.fileName);
        const uploadFavIconResponse = await GoogleDriveFileOperations.uploadFileToDrive(websiteFavIcon?.fileName, websiteFavIcon?.fileBuffer, websiteFavIconMimeType);

        if (!uploadFavIconResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
       
        const updatedWebsiteDetails = {
            ...(name && { name }),
            ...(slogan && { slogan }),
            googleDriveLogoId: uploadLogoResponse?.fileId,
            websiteLogo: uploadLogoResponse?.shareableLink,
            googleDriveFavIconId: uploadFavIconResponse?.fileId,
            websiteFavIcon: uploadFavIconResponse?.shareableLink,
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
        delete result.googleDriveLogoId;
        delete result.googleDriveFavIconId;

        return generateResponseData(result, true, STATUS_OK, `Website configuration updated successfully`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a website configuration from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Returns an error if any.
 */
const deleteWebsiteConfiguration = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        
        const websiteDetails = await db.collection(WEBSITE_CONFIGURATION_COLLECTION_NAME).findOne({});
        
        await GoogleDriveFileOperations.deleteFileFromDrive(websiteDetails?.googleDriveLogoId);
        await GoogleDriveFileOperations.deleteFileFromDrive(websiteDetails?.googleDriveFavIconId);

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
    createWebsiteConfiguration,
    getWebsiteConfiguration,
    updateWebsiteConfiguration,
    deleteWebsiteConfiguration
};
