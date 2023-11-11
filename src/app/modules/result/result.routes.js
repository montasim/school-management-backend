/**
 * @fileoverview Express router providing result-related routes.
 *
 * This module defines routes for creating, retrieving, and deleting results.
 * It includes middleware for authentication, file upload handling, and specific validations
 * related to result operations. Each route is documented using Swagger annotations for API
 * specification and JSDoc comments for internal code documentation.
 *
 * @requires express Express - Express framework for building web applications
 * @requires authTokenMiddleware - Middleware for authenticating tokens
 * @requires fileUploadMiddleware - Middleware for handling file uploads
 * @requires ResultValidationService - Service for validating result-related parameters
 * @requires ResultController - Controller for handling result-related operations
 * @module resultRouter - Express router for result routes
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { ResultValidationService } from "./result.validator.js";
import { ResultController } from "./result.controller.js";

const resultRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a result.
 *     description: Endpoint to add a new result to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the result.
 *     responses:
 *       200:
 *         description: Result successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new result.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
resultRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    ResultController.createResultController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all results.
 *     description: Endpoint to retrieve a list of all results.
 *     responses:
 *       200:
 *         description: A list of results.
 *       404:
 *         description: Result not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all results.
 * @route GET /
 */
resultRouter.get("/", [
    ResultController.getResultListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific result by ID.
 *     description: Endpoint to get details of a result by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the result to retrieve.
 *     responses:
 *       200:
 *         description: Result details.
 *       404:
 *         description: Result not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific result.
 * @route GET /{fileName}
 */
resultRouter.get("/:fileName", [
    ResultValidationService.validateResultParams,
    ResultController.getAResultController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a result by ID.
 *     description: Endpoint to delete a result by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the result to delete.
 *     responses:
 *       200:
 *         description: Result successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Result not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific result.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
resultRouter.delete("/:fileName", [
    authTokenMiddleware,
    ResultValidationService.validateResultParams,
    ResultController.deleteAResultController
]);

export default resultRouter;