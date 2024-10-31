/**
 * @fileoverview Controllers for Website Configuration Management.
 *
 * This module provides controllers for managing website configuration through CRUD operations.
 * It includes controllers for creating, retrieving, updating, and deleting website configurations.
 * These controllers handle the request and response flow, extracting data from requests,
 * invoking service functions, and sending appropriate responses to the client.
 *
 * @requires WebsiteConfigurationService - Service layer handling the business logic for website configurations.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle and send service responses.
 * @requires logger - Logger for error logging.
 * @module WebsiteConfigurationController - Exported controllers for website configuration routes.
 */

import { WebsiteConfigurationService } from "./websiteConfiguration.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * Controller for creating a new website configuration.
 *
 * @async
 * @function createWebsiteConfigurationController
 * @param {express.Request} req - Express request object containing website configuration details.
 * @param {express.Response} res - Express response object for sending responses to the client.
 * @returns {Promise<void>} - Asynchronous function, sends response on completion.
 */
const createWebsiteConfigurationController = async (req, res) => {
    try {
        const { name, slogan, adminId, db } = extractFromRequest(req, ['name', 'slogan']);
        const newWebsiteConfigurationDetails = { name, slogan, adminId };

        await handleServiceResponse(res, WebsiteConfigurationService.createWebsiteConfigurationService, req, newWebsiteConfigurationDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for retrieving the current website configuration.
 *
 * @async
 * @function getWebsiteConfigurationController
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object for sending responses to the client.
 * @returns {Promise<void>} - Asynchronous function, sends response on completion.
 */
const getWebsiteConfigurationController = async (req, res) => {
    try {
        await handleServiceResponse(res, WebsiteConfigurationService.getWebsiteConfigurationService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for updating an existing website configuration.
 *
 * This function processes the request to update website configuration details,
 * such as the website's name, slogan, or logo. It extracts the necessary information
 * from the request, calls the appropriate service function to handle the update logic,
 * and sends back a response to the client based on the outcome.
 *
 * @async
 * @function updateWebsiteConfigurationController
 * @param {express.Request} req - Express request object, containing updated website configuration data.
 * @param {express.Response} res - Express response object for sending responses to the client.
 * @returns {Promise<void>} - Asynchronous function, sends response on completion.
 */
const updateWebsiteConfigurationController = async (req, res) => {
    try {
        const { name, slogan, adminId, db } = extractFromRequest(req, ['name', 'slogan'], []);
        const websiteDetails = { name, slogan, adminId };

        await handleServiceResponse(res, WebsiteConfigurationService.updateWebsiteConfigurationService, req, websiteDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Controller for deleting a website configuration.
 *
 * Handles requests to delete a specific website configuration. The function
 * invokes the service function responsible for the deletion, and sends a response
 * indicating the success or failure of the operation.
 *
 * @async
 * @function deleteWebsiteConfigurationController
 * @param {express.Request} req - Express request object, for the website configuration to delete.
 * @param {express.Response} res - Express response object for sending responses to the client.
 * @returns {Promise<void>} - Asynchronous function, sends response on completion.
 */
const deleteWebsiteConfigurationController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req, [], []);

        await handleServiceResponse(res, WebsiteConfigurationService.deleteWebsiteConfigurationService, db, adminId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteConfigurationController = {
    createWebsiteConfigurationController,
    getWebsiteConfigurationController,
    updateWebsiteConfigurationController,
    deleteWebsiteConfigurationController
};
