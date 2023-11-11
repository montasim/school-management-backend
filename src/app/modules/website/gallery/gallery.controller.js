/**
 * @fileoverview Gallery Controller for Express Application.
 *
 * This module provides controller functions for handling gallery-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to gallery,
 * interacting with the GalleryService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the gallery-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires GalleryService - Service layer handling business logic related to gallery.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module GalleryController - Exported gallery controller functions.
 */

import { GalleryService } from "./gallery.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createGalleryController
 * @description Controller for creating a new gallery.
 * @param {express.Request} req - Express request object containing gallery details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createGalleryController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newGalleryDetails = { title, adminId };

        await handleServiceResponse(res, GalleryService.createGalleryService, db, newGalleryDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getGalleryList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getGalleryListController = async (req, res) => {
    try {
        await handleServiceResponse(res, GalleryService.getGalleryListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAGallery
 * @description Controller for fetching a specific gallery by ID.
 *
 * @param {express.Request} req - Express request object containing gallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAGalleryController = async (req, res) => {
    try {
        const { galleryId, db } = extractFromRequest(req, [], ['galleryId']);

        await handleServiceResponse(res, GalleryService.getAGalleryService, db, galleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAGalleryController
 * @description Controller for deleting a gallery by ID.
 *
 * @param {express.Request} req - Express request object containing gallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAGalleryController = async (req, res) => {
    try {
        const { galleryId, adminId, db } = extractFromRequest(req, [], ['galleryId']);

        await handleServiceResponse(res, GalleryService.deleteAGalleryService, db, adminId, galleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace GalleryController
 * @description Group of controllers for handling gallery operations.
 */
export const GalleryController = {
    createGalleryController,
    getGalleryListController,
    getAGalleryController,
    deleteAGalleryController
};