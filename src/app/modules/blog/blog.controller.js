/**
 * @fileoverview Blog Controller for Express Application.
 *
 * This module provides controller functions for handling blog-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to blogs,
 * interacting with the BlogService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the blog-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires BlogService - Service layer handling business logic related to blogs.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module BlogController - Exported blog controller functions.
 */

import { BlogService } from "./blog.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createBlogController
 * @description Controller for creating a new blog.
 * @param {express.Request} req - Express request object containing blog details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createBlogController = async (req, res) => {
    try {
        const { title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description']);
        const newBlogDetails = { title, category, description, adminId };

        await handleServiceResponse(res, BlogService.createBlogService, req, newBlogDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getBlogList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getBlogListController = async (req, res) => {
    try {
        await handleServiceResponse(res, BlogService.getBlogListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getABlog
 * @description Controller for fetching a specific blog by ID.
 *
 * @param {express.Request} req - Express request object containing blog ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getABlogController = async (req, res) => {
    try {
        const { blogId, db } = extractFromRequest(req, [], ['blogId']);

        await handleServiceResponse(res, BlogService.getABlogService, db, blogId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateABlog
 * @description Controller for updating a specific blog by ID.
 *
 * @param {express.Request} req - Express request object containing blog ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateABlogController = async (req, res) => {
    try {
        const { blogId, title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description'], ['blogId']);
        const updatedBlogDetails = { title, category, description, adminId };

        await handleServiceResponse(res, BlogService.updateABlogService, req, blogId, updatedBlogDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteABlogController
 * @description Controller for deleting a blog by ID.
 *
 * @param {express.Request} req - Express request object containing blog ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteABlogController = async (req, res) => {
    try {
        const { blogId, adminId, db } = extractFromRequest(req, [], ['blogId']);

        await handleServiceResponse(res, BlogService.deleteABlogService, db, adminId, blogId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace BlogController
 * @description Group of controllers for handling blog operations.
 */
export const BlogController = {
    createBlogController,
    getBlogListController,
    getABlogController,
    updateABlogController,
    deleteABlogController
};