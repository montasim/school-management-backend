/**
 * @fileoverview Router for Website Configuration Management.
 *
 * This module sets up the Express router for handling routes related to website configuration.
 * It includes routes for creating, retrieving, updating, and deleting the website configuration,
 * along with the necessary middleware for authentication and file uploads.
 *
 * @requires express - Express framework.
 * @requires authTokenMiddleware - Middleware for token-based authentication.
 * @requires WebsiteConfigurationValidationService - Service for validating website configuration requests.
 * @requires WebsiteConfigurationController - Controller for website configuration operations.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @module websiteConfigurationRouter - Express router for website configuration routes.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteConfigurationValidationService } from "./websiteConfiguration.validator.js";
import { WebsiteConfigurationController } from "./websiteConfiguration.controller.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import multerErrorHandlerMiddleware from "../../../middlewares/multerErrorHandlerMiddleware.js";

const websiteConfigurationRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a website configuration.
 *     description: Endpoint to add a new website configuration to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the website.
 *       - in: formData
 *         name: slogan
 *         type: string
 *         description: Slogan of the website.
 *       - in: formData
 *         name: websiteLogo
 *         type: file
 *         description: The website logo image file to upload.
 *     responses:
 *       200:
 *         description: Website configuration successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new website configuration.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
websiteConfigurationRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('websiteLogo'),
    multerErrorHandlerMiddleware,
    WebsiteConfigurationValidationService.validateWebsiteConfigurationDetails,
    WebsiteConfigurationValidationService.validateWebsiteConfigurationFile,
    WebsiteConfigurationController.createWebsiteConfigurationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website configuration.
 *     description: Endpoint to get details of a website configuration.
 *     responses:
 *       200:
 *         description: Website configuration.
 *       404:
 *         description: Website configuration not found.
 *       500:
 *         description: Internal server error.
 */
websiteConfigurationRouter.get("/", [
    WebsiteConfigurationController.getWebsiteConfigurationController
]);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a website configuration.
 *     description: Endpoint to update a new website configuration to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the website.
 *       - in: formData
 *         name: slogan
 *         type: string
 *         description: Slogan of the website.
 *       - in: formData
 *         name: websiteLogo
 *         type: file
 *         description: The website logo image file to upload.
 *     responses:
 *       200:
 *         description: Website configuration successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new website configuration.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
websiteConfigurationRouter.put("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('websiteLogo'),
    multerErrorHandlerMiddleware,
    WebsiteConfigurationValidationService.validateWebsiteConfigurationDetails,
    WebsiteConfigurationValidationService.validateWebsiteConfigurationFile,
    WebsiteConfigurationController.updateWebsiteConfigurationController
]);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a website configuration.
 *     description: Endpoint to delete a website configuration.
 *     responses:
 *       200:
 *         description: Website configuration successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Website configuration not found.
 *       500:
 *         description: Internal server error.
 */
websiteConfigurationRouter.delete("/", [
    authTokenMiddleware,
    WebsiteConfigurationController.deleteWebsiteConfigurationController
]);

export default websiteConfigurationRouter;