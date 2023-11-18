/**
 * @fileoverview VideoGallery Controller for Express Application.
 *
 * This module provides controller functions for handling videoGallery-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to videoGallery,
 * interacting with the VideoGalleryService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the videoGallery-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires VideoGalleryService - Service layer handling business logic related to videoGallery.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module VideoGalleryController - Exported videoGallery controller functions.
 */

import { VideoGalleryService } from "./videoGallery.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createVideoGalleryController
 * @description Controller for creating a new videoGallery.
 * @param {express.Request} req - Express request object containing videoGallery details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createVideoGalleryController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newVideoGalleryDetails = { title, adminId };

        await handleServiceResponse(res, VideoGalleryService.createVideoGalleryService, db, newVideoGalleryDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getVideoGalleryList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getVideoGalleryListController = async (req, res) => {
    try {
        await handleServiceResponse(res, VideoGalleryService.getVideoGalleryListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAVideoGallery
 * @description Controller for fetching a specific videoGallery by ID.
 *
 * @param {express.Request} req - Express request object containing videoGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAVideoGalleryController = async (req, res) => {
    try {
        const { videoGalleryId, db } = extractFromRequest(req, [], ['videoGalleryId']);

        await handleServiceResponse(res, VideoGalleryService.getAVideoGalleryService, db, videoGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAVideoGalleryController
 * @description Controller for deleting a videoGallery by ID.
 *
 * @param {express.Request} req - Express request object containing videoGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAVideoGalleryController = async (req, res) => {
    try {
        const { videoGalleryId, adminId, db } = extractFromRequest(req, [], ['videoGalleryId']);

        await handleServiceResponse(res, VideoGalleryService.deleteAVideoGalleryService, db, adminId, videoGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace VideoGalleryController
 * @description Group of controllers for handling videoGallery operations.
 */
export const VideoGalleryController = {
    createVideoGalleryController,
    getVideoGalleryListController,
    getAVideoGalleryController,
    deleteAVideoGalleryController
};