/**
 * @fileoverview HomePagePost Controller for Express Application.
 *
 * This module provides controller functions for handling homePagePost-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to homePagePosts,
 * interacting with the HomePagePostService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the homePagePost-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires HomePagePostService - Service layer handling business logic related to homePagePosts.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module HomePagePostController - Exported homePagePost controller functions.
 */

import { HomePagePostService } from "./homePagePost.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createHomePagePostController
 * @description Controller for creating a new homePagePost.
 * @param {express.Request} req - Express request object containing homePagePost details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createHomePagePostController = async (req, res) => {
    try {
        const { title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description']);
        const newHomePagePostDetails = { title, category, description, adminId };

        await handleServiceResponse(res, HomePagePostService.createHomePagePostService, db, newHomePagePostDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getHomePagePostList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getHomePagePostListController = async (req, res) => {
    try {
        await handleServiceResponse(res, HomePagePostService.getHomePagePostListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAHomePagePost
 * @description Controller for fetching a specific homePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAHomePagePostController = async (req, res) => {
    try {
        const { homePagePostId, db } = extractFromRequest(req, [], ['homePagePostId']);

        await handleServiceResponse(res, HomePagePostService.getAHomePagePostService, db, homePagePostId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAHomePagePost
 * @description Controller for updating a specific homePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAHomePagePostController = async (req, res) => {
    try {
        const { homePagePostId, title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description'], ['homePagePostId']);
        const updatedHomePagePostDetails = { title, category, description, adminId };

        await handleServiceResponse(res, HomePagePostService.updateAHomePagePostService, db, homePagePostId, updatedHomePagePostDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAHomePagePostController
 * @description Controller for deleting a homePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAHomePagePostController = async (req, res) => {
    try {
        const { homePagePostId, adminId, db } = extractFromRequest(req, [], ['homePagePostId']);

        await handleServiceResponse(res, HomePagePostService.deleteAHomePagePostService, db, adminId, homePagePostId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePagePostController
 * @description Group of controllers for handling homePagePost operations.
 */
export const HomePagePostController = {
    createHomePagePostController,
    getHomePagePostListController,
    getAHomePagePostController,
    updateAHomePagePostController,
    deleteAHomePagePostController
};