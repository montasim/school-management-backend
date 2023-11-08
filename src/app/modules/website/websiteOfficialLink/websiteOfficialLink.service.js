import { v4 as uuidv4 } from 'uuid';
import { WEBSITE_OFFICIAL_LINK_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteOfficialLink.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new website official link entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteOfficialLinkDetails
 * @returns {Object} - The response after attempting website creation.
 * @throws {Error} Throws an error if any.
 */
const createWebsiteOfficialLink = async (db, websiteOfficialLinkDetails) => {
    try {
        const { officialLinks, adminId } = websiteOfficialLinkDetails;
        const existingDetails = await getAllData(db, WEBSITE_OFFICIAL_LINK_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website official link already exists. Please update website official link");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const prepareWebsiteDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            officialLinks: officialLinks,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, WEBSITE_OFFICIAL_LINK_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findById(db, WEBSITE_OFFICIAL_LINK_COLLECTION_NAME, prepareWebsiteDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website official link added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves website official link from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of website or an error message.
 * @throws {Error} Throws an error if any.
 */
const getWebsiteOfficialLink = async (db) => {
    try {
        const website = await getAllData(db, WEBSITE_OFFICIAL_LINK_COLLECTION_NAME);

        return website?.length
            ? generateResponseData(website, true, STATUS_OK, "Website official link found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Update website official link to the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteOfficialLinkDetails
 * @returns {Object} - The website official link or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateWebsiteOfficialLink = async (db, websiteOfficialLinkDetails) => {
    try {
        const { officialLinks, adminId } = websiteOfficialLinkDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedWebsiteDetails = {
            ...(officialLinks && { officialLinks }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const result = await db.collection(WEBSITE_OFFICIAL_LINK_COLLECTION_NAME).findOneAndUpdate(
            {}, // Assuming you are updating a single document without a filter.
            { $set: updatedWebsiteDetails },
            { returnDocument: 'after' } // Returns the updated document
        );

        if (!result) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `Website official link not updated`);
        }

        delete result._id;
        delete result.id;
        delete result.createdBy;
        delete result.modifiedBy;

        return generateResponseData(result, true, STATUS_OK, `Website official link updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

/**
 * Deletes a website official link from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteWebsiteOfficialLink = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Deletes all documents in the collection without deleting the collection itself
        const result = await db.collection(WEBSITE_OFFICIAL_LINK_COLLECTION_NAME).deleteMany({});

        return result.deletedCount > 0
            ? generateResponseData({}, true, STATUS_OK, `Website official link deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `No website official link were found to delete`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteOfficialLinkService
 * @description Group of services related to website important information link operations.
 */
export const WebsiteOfficialLinkService = {
    createWebsiteOfficialLink,
    getWebsiteOfficialLink,
    updateWebsiteOfficialLink,
    deleteWebsiteOfficialLink
};