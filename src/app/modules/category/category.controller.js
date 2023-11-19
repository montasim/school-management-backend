/**
 * @fileoverview Controllers for Category Operations.
 *
 * This module exports a set of controllers for handling various operations related to categories in an Express application.
 * Each controller is an asynchronous function that interacts with the CategoryService to perform CRUD operations.
 * The controllers extract necessary information from the request object, call the appropriate service function,
 * and then use a utility function to handle the service response, ensuring a consistent and efficient handling of requests.
 *
 * @requires CategoryService - Service module providing business logic for category operations.
 * @requires extractFromRequest - Helper function to extract data from the request object.
 * @requires handleServiceResponse - Utility function to standardize handling of service responses.
 * @module CategoryController - Exported controllers for category operations in the application.
 */

import { CategoryService } from "./category.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createCategoryController
 * @description Controller for creating a new category.
 *
 * @param {express.Request} req - Express request object containing category details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createCategoryController = async (req, res) => {
    try {
        const { name, adminId, db } = extractFromRequest(req, ['name']);
        const newCategory = { name, adminId };

        await handleServiceResponse(res, CategoryService.createCategoryService, db, newCategory);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getCategoryListController
 * @description Controller for fetching all category.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getCategoryListController = async (req, res) => {
    try {
        await handleServiceResponse(res, CategoryService.getCategoryListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getACategoryController
 * @description Controller for fetching a specific category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getACategoryController = async (req, res) => {
    try {
        const { categoryId, db } = extractFromRequest(req, [], ['categoryId']);

        await handleServiceResponse(res, CategoryService.getACategoryService, db, categoryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateACategoryController
 * @description Controller for updating a specific category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateACategoryController = async (req, res) => {
    try {
        const { categoryId, name, adminId, db } = extractFromRequest(req, ['name'], ['categoryId']);
        const updatedCategoryDetails = { name, adminId };

        await handleServiceResponse(res, CategoryService.updateACategoryService, db, categoryId, updatedCategoryDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteACategoryController
 * @description Controller for deleting a category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteACategoryController = async (req, res) => {
    try {
        const { categoryId, adminId, db } = extractFromRequest(req, [], ['categoryId']);

        await handleServiceResponse(res, CategoryService.deleteACategoryService, db, adminId, categoryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace CategoryController
 * @description Provides a set of controllers for handling CRUD operations related to categories.
 * These controllers ensure that incoming requests are processed accurately and efficiently,
 * leveraging the CategoryService for business logic and utility functions for consistent request handling.
 */
export const CategoryController = {
    createCategoryController,
    getCategoryListController,
    getACategoryController,
    updateACategoryController,
    deleteACategoryController
};