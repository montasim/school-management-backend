/**
 * @fileoverview Express router providing download-related routes.
 *
 * This module defines routes for creating, retrieving, and deleting downloads.
 * It includes middleware for authentication, file upload handling, and specific validations
 * related to download operations. Each route is documented using Swagger annotations for API
 * specification and JSDoc comments for internal code documentation.
 *
 * @requires express Express - Express framework for building web applications
 * @requires authTokenMiddleware - Middleware for authenticating tokens
 * @requires fileUploadMiddleware - Middleware for handling file uploads
 * @requires DownloadValidationService - Service for validating download-related parameters
 * @requires DownloadController - Controller for handling download-related operations
 * @module downloadRouter - Express router for download routes
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { DownloadValidationService } from "./download.validator.js";
import { DownloadController } from "./download.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a download.
 *     description: Endpoint to add a new download to the system.
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
 *         description: Title of the download.
 *     responses:
 *       200:
 *         description: Download successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new download.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware?.single('file'),
    DownloadValidationService?.validateNewDownloadDetails,
    DownloadController?.createDownloadController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all downloads.
 *     description: Endpoint to retrieve a list of all downloads.
 *     responses:
 *       200:
 *         description: A list of downloads.
 *       404:
 *         description: Download not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all downloads.
 * @route GET /
 */
router.get("/", [
    DownloadController.getDownloadListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific download by ID.
 *     description: Endpoint to get details of a download by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the download to retrieve.
 *     responses:
 *       200:
 *         description: Download details.
 *       404:
 *         description: Download not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific download.
 * @route GET /{fileName}
 */
router.get("/:fileName", [
    DownloadValidationService.validateDownloadParams,
    DownloadController.getADownloadController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a download by ID.
 *     description: Endpoint to delete a download by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the download to delete.
 *     responses:
 *       200:
 *         description: Download successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Download not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific download.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
router.delete("/:fileName", [
    authTokenMiddleware,
    DownloadValidationService.validateDownloadParams,
    DownloadController.deleteADownloadController
]);

export default router;