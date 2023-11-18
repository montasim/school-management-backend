/**
 * @fileoverview Administration Routes for Express Application.
 *
 * This module defines the routes for administration-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting administration posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of administration-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires AdministrationValidationService - Validators for administration post request data.
 * @requires AdministrationController - Controllers for handling administration post operations.
 * @module administrationRouter - Express router with defined routes for administration operations.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { AdministrationValidationService } from "./administration.validator.js";
import { AdministrationController } from "./administration.controller.js";
import multerErrorHandlerMiddleware from "../../middlewares/multerErrorHandlerMiddleware.js";

const administrationRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create an administration.
 *     description: Endpoint to add a new administration to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the administration.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the administration.
 *       - in: formData
 *         name: designation
 *         type: string
 *         description: Designation of the administration.
 *     responses:
 *       200:
 *         description: Administration successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new administration.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
administrationRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('image'),
    multerErrorHandlerMiddleware,
    AdministrationValidationService.validateNewAdministrationDetails,
    AdministrationValidationService.validateAdministrationFile,
    AdministrationController.createAdministrationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all administrations.
 *     description: Endpoint to retrieve a list of all administrations.
 *     responses:
 *       200:
 *         description: A list of administrations.
 *       404:
 *         description: Administration not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all administrations.
 * @route GET /
 */
administrationRouter.get("/", [
    AdministrationController.getAdministrationListController
]);

/**
 * @swagger
 * /{administrationId}:
 *   get:
 *     summary: Retrieve a specific administration by ID.
 *     description: Endpoint to get details of an administration by their ID.
 *     parameters:
 *       - in: path
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to retrieve.
 *     responses:
 *       200:
 *         description: Administration details.
 *       404:
 *         description: Administration not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific administration.
 * @route GET /{administrationId}
 */
administrationRouter.get("/:administrationId", [
    AdministrationValidationService.validateAdministrationParams,
    AdministrationController.getAAdministrationController
]);

/**
 * @swagger
 * /{administrationId}:
 *   put:
 *     summary: Update an administration.
 *     description: Endpoint to update an existing administration to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the administration.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the administration.
 *       - in: formData
 *         name: designation
 *         type: string
 *         description: Designation of the administration.
 *     responses:
 *       200:
 *         description: Administration successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new administration.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
administrationRouter.put("/:administrationId", [
    authTokenMiddleware,
    fileUploadMiddleware.single('image'),
    multerErrorHandlerMiddleware,
    AdministrationValidationService.validateAdministrationParams,
    AdministrationValidationService.validateUpdatedAdministrationDetails,
    AdministrationValidationService.validateAdministrationFile,
    AdministrationController.updateAAdministrationController
]);

/**
 * @swagger
 * /{administrationId}:
 *   delete:
 *     summary: Delete an administration by ID.
 *     description: Endpoint to delete an administration by their ID.
 *     parameters:
 *       - in: path
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to delete.
 *     responses:
 *       200:
 *         description: Administration successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Administration not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific administration.
 * Requires authentication.
 * @route DELETE /{administrationId}
 */
administrationRouter.delete("/:administrationId", [
    authTokenMiddleware,
    AdministrationValidationService.validateAdministrationParams,
    AdministrationController.deleteAAdministrationController
]);

export default administrationRouter;