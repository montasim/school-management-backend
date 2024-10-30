/**
 * @fileoverview WebsiteBanner Controller for Express Application.
 *
 * This module provides controller functions for handling websiteBanner-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to websiteBanners,
 * interacting with the WebsiteBannerService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the websiteBanner-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires WebsiteBannerService - Service layer handling business logic related to websiteBanners.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module WebsiteBannerController - Exported websiteBanner controller functions.
 */

import { WebsiteBannerService } from "./websiteBanner.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createWebsiteBannerController
 * @description Controller for creating a new websiteBanner.
 * @param {express.Request} req - Express request object containing websiteBanner details.
 * @param {express.Response} res - Express response object to send data back to the client.
 */
const createWebsiteBannerController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req, [], []);

        await handleServiceResponse(res, WebsiteBannerService.createWebsiteBannerService, req, adminId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAWebsiteBanner
 * @description Controller for fetching a specific websiteBanner.
 *
 * @param {express.Request} req - Express a request object containing websiteBanner.
 * @param {express.Response} res - Express response object to send data back to the client.
 */
const getAWebsiteBannerController = async (req, res) => {
    try {
        const { db } = extractFromRequest(req, [], []);

        await handleServiceResponse(res, WebsiteBannerService.getAWebsiteBannerService, db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateWebsiteBannerController
 * @description Controller for updating a websiteBanner.
 * @param {express.Request} req - Express request object containing websiteBanner details.
 * @param {express.Response} res - Express response object to send data back to the client.
 */
const updateWebsiteBannerController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req, [], []);

        await handleServiceResponse(res, WebsiteBannerService.updateWebsiteBannerService, req, adminId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAWebsiteBannerController
 * @description Controller for deleting a websiteBanner.
 *
 * @param {express.Request} req - Express a request object containing websiteBanner ID in parameters.
 * @param {express.Response} res - Express response object to send data back to the client.
 */
const deleteAWebsiteBannerController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req, [], []);

        await handleServiceResponse(res, WebsiteBannerService.deleteAWebsiteBannerService, db, adminId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace WebsiteBannerController
 * @description Group of controllers for handling websiteBanner operations.
 */
export const WebsiteBannerController = {
    createWebsiteBannerController,
    getAWebsiteBannerController,
    updateWebsiteBannerController,
    deleteAWebsiteBannerController
};