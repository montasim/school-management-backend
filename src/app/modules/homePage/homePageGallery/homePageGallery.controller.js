/**
 * @fileoverview HomePageGallery Controller for Express Application.
 *
 * This module provides controller functions for handling homePageGallery-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to homePageGallery,
 * interacting with the HomePageGalleryService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the homePageGallery-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires HomePageGalleryService - Service layer handling business logic related to homePageGallery.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePageGalleryController - Exported homePageGallery controller functions.
 */

import { HomePageGalleryService } from "./homePageGallery.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createHomePageGalleryController
 * @description Controller for creating a new homePageGallery.
 * @param {express.Request} req - Express request object containing homePageGallery details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createHomePageGalleryController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newHomePageGalleryDetails = { title, adminId };

        await handleServiceResponse(res, HomePageGalleryService.createHomePageGalleryService, db, newHomePageGalleryDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getHomePageGalleryList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getHomePageGalleryListController = async (req, res) => {
    try {
        await handleServiceResponse(res, HomePageGalleryService.getHomePageGalleryListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAHomePageGallery
 * @description Controller for fetching a specific homePageGallery by ID.
 *
 * @param {express.Request} req - Express request object containing homePageGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAHomePageGalleryController = async (req, res) => {
    try {
        const { homePageGalleryId, db } = extractFromRequest(req, [], ['homePageGalleryId']);

        await handleServiceResponse(res, HomePageGalleryService.getAHomePageGalleryService, db, homePageGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAHomePageGalleryController
 * @description Controller for deleting a homePageGallery by ID.
 *
 * @param {express.Request} req - Express request object containing homePageGallery ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAHomePageGalleryController = async (req, res) => {
    try {
        const { homePageGalleryId, adminId, db } = extractFromRequest(req, [], ['homePageGalleryId']);

        await handleServiceResponse(res, HomePageGalleryService.deleteAHomePageGalleryService, db, adminId, homePageGalleryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageGalleryController
 * @description Group of controllers for handling homePageGallery operations.
 */
export const HomePageGalleryController = {
    createHomePageGalleryController,
    getHomePageGalleryListController,
    getAHomePageGalleryController,
    deleteAHomePageGalleryController
};