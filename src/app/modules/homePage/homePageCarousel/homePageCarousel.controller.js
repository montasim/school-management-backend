/**
 * @fileoverview HomePageCarousel Controller for Express Application.
 *
 * This module provides controller functions for handling homePageCarousel-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to homePageCarousels,
 * interacting with the HomePageCarouselService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the homePageCarousel-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires HomePageCarouselService - Service layer handling business logic related to homePageCarousels.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePageCarouselController - Exported homePageCarousel controller functions.
 */

import { HomePageCarouselService } from "./homePageCarousel.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createHomePageCarouselController
 * @description Controller for creating a new homePageCarousel.
 * @param {express.Request} req - Express request object containing homePageCarousel details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createHomePageCarouselController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newHomePageCarouselDetails = { title, adminId };

        await handleServiceResponse(res, HomePageCarouselService.createHomePageCarouselService, db, newHomePageCarouselDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getHomePageCarouselList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getHomePageCarouselListController = async (req, res) => {
    try {
        await handleServiceResponse(res, HomePageCarouselService.getHomePageCarouselListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAHomePageCarousel
 * @description Controller for fetching a specific homePageCarousel by ID.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAHomePageCarouselController = async (req, res) => {
    try {
        const { homePageCarouselId, db } = extractFromRequest(req, [], ['homePageCarouselId']);

        await handleServiceResponse(res, HomePageCarouselService.getAHomePageCarouselService, db, homePageCarouselId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAHomePageCarouselController
 * @description Controller for deleting a homePageCarousel by ID.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAHomePageCarouselController = async (req, res) => {
    try {
        const { homePageCarouselId, adminId, db } = extractFromRequest(req, [], ['homePageCarouselId']);

        await handleServiceResponse(res, HomePageCarouselService.deleteAHomePageCarouselService, db, adminId, homePageCarouselId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageCarouselController
 * @description Group of controllers for handling homePageCarousel operations.
 */
export const HomePageCarouselController = {
    createHomePageCarouselController,
    getHomePageCarouselListController,
    getAHomePageCarouselController,
    deleteAHomePageCarouselController
};