/**
 * @fileoverview Website Contact Services.
 *
 * This file contains the service functions for handling operations related
 * to website contact information. These operations include creating, retrieving,
 * updating, and deleting website contact details. The services interact directly
 * with the database to perform these operations, providing a layer of abstraction
 * between the database and the controllers. Each service function is tailored to
 * handle specific types of operations, ensuring efficient and effective management
 * of website contact data.
 *
 * @requires isValidRequest - Helper function to validate the requester authority.
 * @requires generateResponseData - Utility to format the response data.
 * @requires findByField, createByDetails - Database utility functions.
 * @requires logger - Logger utility for logging information.
 * @module WebsiteContactService - Exports service functions for website contact operations.
 */

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
import findByField from "../../../../shared/findByField.js";
import createByDetails from "../../../../shared/createByDetails.js";
import getAllData from "../../../../shared/getAllData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

/**
 * Service Function for Creating Website Contact.
 *
 * Manages the creation of new website contact details in the database. Validates
 * if similar contact already exists and if the request is valid before creating
 * new contact details. Returns the created contact information or an error message.
 */
const createWebsiteContactService = async (db, websiteContactDetails) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId } = websiteContactDetails;
        const existingDetails = await getAllData(db, WEBSITE_CONTACT_COLLECTION_NAME);

        if (existingDetails?.length > 0)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website contact already exists. Please update website contact");

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const prepareWebsiteDetails = {
            id: generateUniqueID(ID_CONSTANTS?.WEBSITE_PREFIX),
            address: address,
            googleMapLocation: googleMapLocation,
            mobile: mobile,
            phone: phone,
            email: email,
            website: website,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, WEBSITE_CONTACT_COLLECTION_NAME, prepareWebsiteDetails);
        const latestData = await findByField(db, WEBSITE_CONTACT_COLLECTION_NAME, 'id', prepareWebsiteDetails?.id);

        delete latestData?._id;
        delete latestData?.id;
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
 * Service Function for Retrieving Website Contact.
 *
 * Retrieves the existing website contact details from the database. Formats and
 * returns the contact information or a message indicating if no contact is found.
 */
const getWebsiteContactService = async (db) => {
    try {
        const website = await db.collection(WEBSITE_CONTACT_COLLECTION_NAME).findOne({});

        delete website?._id;
        delete website?.id;
        delete website?.createdBy;
        delete website?.modifiedBy;

        return website
            ? generateResponseData(website, true, STATUS_OK, "Website contact found successfully")
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No website found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service Function for Updating Website Contact.
 *
 * Handles the updating of existing website contact details in the database.
 * Verifies request validity and updates the contact information based on provided
 * details, returning the updated information or an error response.
 */
const updateWebsiteContactService = async (db, websiteContactDetails) => {
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
 * Service Function for Deleting Website Contact.
 *
 * Manages the deletion of website contact details from the database. Validates the
 * request authority and deletes the contact, providing confirmation or an error
 * message upon completion.
 */
const deleteWebsiteContactService = async (db, adminId) => {
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
    createWebsiteContactService,
    getWebsiteContactService,
    updateWebsiteContactService,
    deleteWebsiteContactService
};