/**
 * @fileoverview PhotoGallery Controller for Express Application.
 *
 * This module provides controller functions for handling photoGallery-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to photoGallery,
 * interacting with the VideoGalleryService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the photoGallery-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires PhotoGalleryService - Service layer handling business logic related to photoGallery.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module PhotoGalleryController - Exported photoGallery controller functions.
 */

import { PhotoGalleryService } from "./photoGallery.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createPhotoGalleryController
 * @description Controller for creating a new photoGallery.
 * @param {express.Request} req - Express request object containing photoGallery details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createPhotoGalleryController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newPhotoGalleryDetails = { title, adminId };

        await handleServiceResponse(res, PhotoGalleryService.createPhotoGalleryService, req, newPhotoGalleryDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getPhotoGalleryList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getPhotoGalleryListController = async (req, res) => {
    try {
        await handleServiceResponse(res, PhotoGalleryService.getPhotoGalleryListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAPhotoGallery
 * @description Controller for fetching a specific photoGallery by ID.
 *
 * @param {express.Request} req - Express request object containing photoGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAPhotoGalleryController = async (req, res) => {
    try {
        const { photoGalleryId, db } = extractFromRequest(req, [], ['photoGalleryId']);

        await handleServiceResponse(res, PhotoGalleryService.getAPhotoGalleryService, db, photoGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAPhotoGalleryController
 * @description Controller for deleting a photoGallery by ID.
 *
 * @param {express.Request} req - Express request object containing photoGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAPhotoGalleryController = async (req, res) => {
    try {
        const { photoGalleryId, adminId, db } = extractFromRequest(req, [], ['photoGalleryId']);

        await handleServiceResponse(res, PhotoGalleryService.deleteAPhotoGalleryService, db, adminId, photoGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace PhotoGalleryController
 * @description Group of controllers for handling photoGallery operations.
 */
export const PhotoGalleryController = {
    createPhotoGalleryController,
    getPhotoGalleryListController,
    getAPhotoGalleryController,
    deleteAPhotoGalleryController
};