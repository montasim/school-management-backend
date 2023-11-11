/**
 * @fileoverview Website Contact Controllers.
 *
 * This file contains the controller functions for handling operations related
 * to website contact information. These operations include creating, retrieving,
 * updating, and deleting website contact details. The controllers use the
 * WebsiteContactService to interact with the database and return appropriate
 * responses. Each function is designed to handle specific types of requests
 * and ensure the proper management of website contact data.
 *
 * @requires WebsiteContactService - Service functions for handling website contact data.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service functions.
 * @requires logger - Logger utility for logging error information.
 * @module WebsiteContactController - Exports controller functions for website contact operations.
 */

import { WebsiteContactService } from "./websiteContact.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * Controller for Creating Website Contact.
 *
 * Handles the POST request to create new website contact details. Extracts the
 * necessary data from the request body, calls the service function to add the
 * data to the database, and returns the appropriate response.
 */
const createWebsiteContactController = async (req, res) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId, db } = extractFromRequest(req, ['address', 'googleMapLocation', 'mobile', 'phone', 'email', 'website']);
        const websiteContactDetails = { address, googleMapLocation, mobile, phone, email, website, adminId };

        await handleServiceResponse(res, WebsiteContactService.createWebsiteContactService, db, websiteContactDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for Retrieving Website Contact.
 *
 * Manages the GET request to fetch existing website contact details. Invokes the
 * service function to retrieve the data from the database and sends the response
 * back to the client.
 */
const getWebsiteContactController = async (req, res) => {
    try {
        await handleServiceResponse(res, WebsiteContactService.getWebsiteContactService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for Updating Website Contact.
 *
 * Processes the PUT request to update existing website contact details. Extracts
 * updated data from the request body, utilizes the service function to update the
 * database, and returns the response.
 */
const updateWebsiteContactController = async (req, res) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId, db } = extractFromRequest(req, ['address', 'googleMapLocation', 'mobile', 'phone', 'email', 'website'], []);
        const websiteContactDetails = { address, googleMapLocation, mobile, phone, email, website, adminId };

        await handleServiceResponse(res, WebsiteContactService.updateWebsiteContactService, db, websiteContactDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for Deleting Website Contact.
 *
 * Manages the DELETE request to remove specific website contact details.
 * Identifies the contact to be deleted based on the provided ID, calls the
 * service function for deletion, and returns the outcome.
 */
const deleteWebsiteContactController = async (req, res) => {
    try {
        const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

        await handleServiceResponse(res, WebsiteContactService.deleteWebsiteContactService, db, adminId, websiteId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteContactController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteContactController = {
    createWebsiteContactController,
    getWebsiteContactController,
    updateWebsiteContactController,
    deleteWebsiteContactController
};