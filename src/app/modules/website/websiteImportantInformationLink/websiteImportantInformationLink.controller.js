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
 * @requires WebsiteImportantInformationLinkService - Service layer handling business logic for website important information links.
 * @requires extractFromRequest - Helper function for extracting data from request objects.
 * @requires handleServiceResponse - Helper function for handling responses from the service layer.
 * @requires logger - Utility for logging errors.
 * @module WebsiteImportantInformationLinkController - Exported controllers for website important information link operations.
 */

import { WebsiteImportantInformationLinkService } from "./websiteImportantInformationLink.service.js";
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
const createWebsiteImportantInformationLinkController = async (req, res) => {
    try {
        const { importantInformationLinkTitle, importantInformationLink, adminId, db } = extractFromRequest(req, ['importantInformationLinkTitle', 'importantInformationLink']);
        const newWebsiteImportantInformationLink = { importantInformationLinkTitle, importantInformationLink, adminId };

        await handleServiceResponse(res, WebsiteImportantInformationLinkService.createWebsiteImportantInformationLinkService, db, newWebsiteImportantInformationLink);
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
const getWebsiteImportantInformationLinkListController = async (req, res) => {
    try {
        await handleServiceResponse(res, WebsiteImportantInformationLinkService.getWebsiteImportantInformationLinkListService, req?.db);
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
const getAWebsiteImportantInformationLinkController = async (req, res) => {
    try {
        const { websiteImportantInformationLinkId, db } = extractFromRequest(req, [], ['websiteImportantInformationLinkId']);

        await handleServiceResponse(res, WebsiteImportantInformationLinkService.getAWebsiteImportantInformationLinkService, db, websiteImportantInformationLinkId);
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
const updateAWebsiteImportantInformationLinkController = async (req, res) => {
    try {
        const { websiteImportantInformationLinkId, importantInformationLinkTitle, importantInformationLink, adminId, db } = extractFromRequest(req, ['importantInformationLinkTitle', 'importantInformationLink'], ['websiteImportantInformationLinkId']);
        const updatedWebsiteImportantInformationLinkDetails = { importantInformationLinkTitle, importantInformationLink, adminId };

        await handleServiceResponse(res, WebsiteImportantInformationLinkService.updateAWebsiteImportantInformationLinkService, db, websiteImportantInformationLinkId, updatedWebsiteImportantInformationLinkDetails);
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
const deleteAWebsiteImportantInformationLinkController = async (req, res) => {
    try {
        const { websiteImportantInformationLinkId, adminId, db } = extractFromRequest(req, [], ['websiteImportantInformationLinkId']);

        await handleServiceResponse(res, WebsiteImportantInformationLinkService.deleteAWebsiteImportantInformationLinkService, db, adminId, websiteImportantInformationLinkId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteImportantInformationLinkController
 * @description Group of controllers for handling websiteImportantInformationLink operations.
 */
export const WebsiteImportantInformationLinkController = {
    createWebsiteImportantInformationLinkController,
    getWebsiteImportantInformationLinkListController,
    getAWebsiteImportantInformationLinkController,
    updateAWebsiteImportantInformationLinkController,
    deleteAWebsiteImportantInformationLinkController
};