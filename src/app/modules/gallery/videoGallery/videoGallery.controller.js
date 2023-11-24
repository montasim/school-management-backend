/**
 * @fileoverview Controllers for Video Gallery Operations.
 *
 * This module contains the controller functions for managing a video gallery.
 * These functions are responsible for handling requests related to creating, retrieving, updating,
 * and deleting a video gallery. Each function is designed to interact with
 * the service layer, process the incoming requests, and formulate appropriate responses to be sent
 * back to the client. The module is crucial for managing data flow and business logic related to
 * video gallery links, ensuring that client requests are handled efficiently and effectively.
 *
 * @requires VideoGalleryService - Service layer handling business logic for a video gallery.
 * @requires extractFromRequest - Helper function for extracting data from request objects.
 * @requires handleServiceResponse - Helper function for handling responses from the service layer.
 * @requires logger - Utility for logging errors.
 * @module VideoGalleryController - Exported controllers for video gallery link operations.
 */

import { VideoGalleryService } from "./videoGallery.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * Handles the creation of a new video gallery.
 * Processes the request to add a new video gallery, including the link title and URL,
 * using data extracted from the request body. It then invokes the service function for creating
 * the link and sends back the appropriate response.
 *
 * @param {express.Request} req - Request object containing important information link details.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const createVideoGalleryController = async (req, res) => {
    try {
        const { videoGalleryTitle, videoLink, adminId, db } = extractFromRequest(req, ['videoGalleryTitle', 'videoLink']);
        const newVideoGallery = { videoGalleryTitle, videoLink, adminId };

        await handleServiceResponse(res, VideoGalleryService.createVideoGalleryService, db, newVideoGallery);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all video galleries for the website.
 * Processes the request to fetch all existing video galleries and
 * sends back a list of these links or an appropriate message if none are found.
 *
 * @param {express.Request} req - Request object.
 * @param {express.Response} res - Response object for sending back data or messages.
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
 * Fetches details of a specific video gallery based on its ID.
 * Extracts the link ID from the request parameters, retrieves the specific information,
 * and sends back the details or an appropriate message if the link is not found.
 *
 * @param {express.Request} req - Request object containing the link's ID in parameters.
 * @param {express.Response} res - Response object for sending back data or messages.
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
 * Updates an existing video gallery.
 * Processes the request to update a video gallery details, such as title and URL, based on its ID.
 * It handles the response from the service layer and sends back a confirmation message or error.
 *
 * @param {express.Request} req - Request object containing the updated link details and ID.
 * @param {express.Response} res - Response object for sending back data or messages.
 */
const updateAVideoGalleryController = async (req, res) => {
    try {
        const { videoGalleryId, videoGalleryTitle, videoLink, adminId, db } = extractFromRequest(req, ['videoGalleryTitle', 'videoLink'], ['videoGalleryId']);
        const updatedVideoGalleryDetails = { videoGalleryTitle, videoLink, adminId };

        await handleServiceResponse(res, VideoGalleryService.updateAVideoGalleryService, db, videoGalleryId, updatedVideoGalleryDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific video gallery based on its ID.
 * Handles the request to remove a link from the website, processes the deletion through
 * the service layer, and returns a confirmation message or error message upon completion.
 *
 * @param {express.Request} req - Request object containing the ID of the link to be deleted.
 * @param {express.Response} res - Response object for sending back data or messages.
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
    updateAVideoGalleryController,
    deleteAVideoGalleryController
};