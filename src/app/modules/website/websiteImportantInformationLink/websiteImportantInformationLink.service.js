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
import setMimeTypeFromExtension from "../../../../helpers/setMimeTypeFromExtension.js";
import { HandleGoogleDrive } from "../../../../helpers/handleGoogleDriveApi.js"
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new website details entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteImportantInformationLinkDetails
 * @returns {Object} - The response after attempting website creation.
 * @throws {Error} Throws an error if any.
 */
const createWebsiteImportantInformationLink = async (db, websiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinks, adminId } = websiteImportantInformationLinkDetails;
        const existingDetails = await getAllData(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website details already exists. Please update website details");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const prepareWebsiteDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            importantInformationLinks: importantInformationLinks,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findById(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME, prepareWebsiteDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website details added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves website details from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of website or an error message.
 * @throws {Error} Throws an error if any.
 */
const getWebsiteImportantInformationLink = async (db) => {
    try {
        const website = await getAllData(db, WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME);

        return website?.length
            ? generateResponseData(website, true, STATUS_OK, "Website details found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Update website details to the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteImportantInformationLinkDetails
 * @returns {Object} - The website details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateWebsiteImportantInformationLink = async (db, websiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinks, adminId } = websiteImportantInformationLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedWebsiteDetails = {
            ...(importantInformationLinks && { importantInformationLinks }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const result = await db.collection(WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME).findOneAndUpdate(
            {}, // Assuming you are updating a single document without a filter.
            { $set: updatedWebsiteDetails },
            { returnDocument: 'after' } // Returns the updated document
        );

        if (!result) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `Website details not updated`);
        }

        delete result._id;
        delete result.id;
        delete result.createdBy;
        delete result.modifiedBy;

        return generateResponseData(result, true, STATUS_OK, `Website details updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

/**
 * Deletes a website details from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteWebsiteImportantInformationLink = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Deletes all documents in the collection without deleting the collection itself
        const result = await db.collection(WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME).deleteMany({});

        return result.deletedCount > 0
            ? generateResponseData({}, true, STATUS_OK, `Website details deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `No website details were found to delete`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteImportantInformationLinkService
 * @description Group of services related to website important information link operations.
 */
export const WebsiteImportantInformationLinkService = {
    createWebsiteImportantInformationLink,
    getWebsiteImportantInformationLink,
    updateWebsiteImportantInformationLink,
    deleteWebsiteImportantInformationLink
};