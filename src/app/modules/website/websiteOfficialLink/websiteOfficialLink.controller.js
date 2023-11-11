/**
 * @fileoverview Controllers for Website Important Information Link Operations.
 *
 * This module contains the controller functions for managing website important information links.
 * These functions are responsible for handling requests related to creating, retrieving, updating,
 * and deleting important information links on a website. Each function is designed to interact with
 * the service layer, process the incoming requests, and formulate appropriate responses to be sent
 * back to the client. The module is crucial for managing data flow and business logic related to
 * website important information links, ensuring that client requests are handled efficiently and effectively.
 *
 * @requires WebsiteOfficialLinkService - Service layer handling business logic for website important information links.
 * @requires extractFromRequest - Helper function for extracting data from request objects.
 * @requires handleServiceResponse - Helper function for handling responses from the service layer.
 * @requires logger - Utility for logging errors.
 * @module WebsiteOfficialLinkController - Exported controllers for website important information link operations.
 */

import { WebsiteOfficialLinkService } from "./websiteOfficialLink.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * Handles the creation of a new website important information link.
 * Processes the request to add a new important information link, including the link title and URL,
 * using data extracted from the request body. It then invokes the service function for creating
 * the link and sends back the appropriate response.
 *
 * @param {express.Request} req - Request object containing important information link details.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const createWebsiteOfficialLinkController = async (req, res) => {
    try {
        const { officialLinkTitle, officialLink, adminId, db } = extractFromRequest(req, ['officialLinkTitle', 'officialLink']);
        const newWebsiteOfficialLink = { officialLinkTitle, officialLink, adminId };

        await handleServiceResponse(res, WebsiteOfficialLinkService.createWebsiteOfficialLinkService, db, newWebsiteOfficialLink);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all important information links for the website.
 * Processes the request to fetch all existing important information links and
 * sends back a list of these links or an appropriate message if none are found.
 *
 * @param {express.Request} req - Request object.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const getWebsiteOfficialLinkListController = async (req, res) => {
    try {
        await handleServiceResponse(res, WebsiteOfficialLinkService.getWebsiteOfficialLinkListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Fetches details of a specific website important information link based on its ID.
 * Extracts the link ID from the request parameters, retrieves the specific link information,
 * and sends back the details or an appropriate message if the link is not found.
 *
 * @param {express.Request} req - Request object containing the link's ID in parameters.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const getAWebsiteOfficialLinkController = async (req, res) => {
    try {
        const { websiteOfficialLinkId, db } = extractFromRequest(req, [], ['websiteOfficialLinkId']);

        await handleServiceResponse(res, WebsiteOfficialLinkService.getAWebsiteOfficialLinkService, db, websiteOfficialLinkId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Updates an existing website important information link.
 * Processes the request to update a link's details, such as title and URL, based on its ID.
 * It handles the response from the service layer and sends back a confirmation message or error.
 *
 * @param {express.Request} req - Request object containing the updated link details and ID.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const updateAWebsiteOfficialLinkController = async (req, res) => {
    try {
        const { websiteOfficialLinkId, officialLinkTitle, officialLink, adminId, db } = extractFromRequest(req, ['officialLinkTitle', 'officialLink'], ['websiteOfficialLinkId']);
        const updatedWebsiteOfficialLinkDetails = { officialLinkTitle, officialLink, adminId };

        await handleServiceResponse(res, WebsiteOfficialLinkService.updateAWebsiteOfficialLinkService, db, websiteOfficialLinkId, updatedWebsiteOfficialLinkDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific website important information link based on its ID.
 * Handles the request to remove a link from the website, processes the deletion through
 * the service layer, and returns a confirmation message or error message upon completion.
 *
 * @param {express.Request} req - Request object containing the ID of the link to be deleted.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const deleteAWebsiteOfficialLinkController = async (req, res) => {
    try {
        const { websiteOfficialLinkId, adminId, db } = extractFromRequest(req, [], ['websiteOfficialLinkId']);

        await handleServiceResponse(res, WebsiteOfficialLinkService.deleteAWebsiteOfficialLinkService, db, adminId, websiteOfficialLinkId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteOfficialLinkController
 * @description Group of controllers for handling websiteOfficialLink operations.
 */
export const WebsiteOfficialLinkController = {
    createWebsiteOfficialLinkController,
    getWebsiteOfficialLinkListController,
    getAWebsiteOfficialLinkController,
    updateAWebsiteOfficialLinkController,
    deleteAWebsiteOfficialLinkController
};