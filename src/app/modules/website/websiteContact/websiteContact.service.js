import { v4 as uuidv4 } from 'uuid';
import { WEBSITE_CONTACT_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteContact.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new website contact entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} websiteContactDetails - New website contact.
 * @returns {Object} - The response after attempting website creation.
 * @throws {Error} Returns an error if any.
 */
const createWebsiteContact = async (db, websiteContactDetails) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId } = websiteContactDetails;
        const existingDetails = await getAllData(db, WEBSITE_CONTACT_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website contact already exists. Please update website contact");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const prepareWebsiteDetails = {
            id: `${ID_CONSTANTS?.WEBSITE_PREFIX}-${uuidv4().substr(0, 6)}`,
            address: address,
            googleMapLocation: googleMapLocation,
            mobile: mobile,
            phone: phone,
            email: email,
            website: website,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, WEBSITE_CONTACT_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findById(db, WEBSITE_CONTACT_COLLECTION_NAME, prepareWebsiteDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Website contact added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves website contact from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The website contact or an error message.
 * @throws {Error} Returns an error if any.
 */
const getWebsiteContact = async (db) => {
    try {
        const website = await getAllData(db, WEBSITE_CONTACT_COLLECTION_NAME);

        return website?.length
            ? generateResponseData(website, true, STATUS_OK, "Website contact found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Update website contact to the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param websiteContactDetails
 * @returns {Object} - The website contact or an error message.
 * @throws {Error} Returns an error if any.
 */
const updateWebsiteContact = async (db, websiteContactDetails) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId } = websiteContactDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedWebsiteDetails = {
            ...(address && { address }),
            ...(googleMapLocation && { googleMapLocation }),
            ...(mobile && { mobile }),
            ...(phone && { phone }),
            ...(email && { email }),
            ...(website && { website }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await db.collection(WEBSITE_CONTACT_COLLECTION_NAME).findOneAndUpdate(
            {}, // Assuming you are updating a single document without a filter.
            { $set: updatedWebsiteDetails },
            { returnDocument: 'after' } // Returns the updated document
        );

        if (!result) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `Website contact not updated`);
        }

        delete result._id;
        delete result.id;
        delete result.createdBy;
        delete result.modifiedBy;

        return generateResponseData(result, true, STATUS_OK, `Website contact updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

/**
 * Deletes a website contact from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Returns an error if any.
 */
const deleteWebsiteContact = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Deletes all documents in the collection without deleting the collection itself
        const result = await db.collection(WEBSITE_CONTACT_COLLECTION_NAME).deleteMany({});

        return result.deletedCount > 0
            ? generateResponseData({}, true, STATUS_OK, `Website contact deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `No website contact were found to delete`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteService
 * @description Group of services related to website operations.
 */
export const WebsiteContactService = {
    createWebsiteContact,
    getWebsiteContact,
    updateWebsiteContact,
    deleteWebsiteContact
};
