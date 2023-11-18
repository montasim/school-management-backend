/**
 * @fileoverview VideoGallery Routes for Express Application.
 *
 * This module defines the routes for videoGallery-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting videoGallery posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of videoGallery-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires VideoGalleryValidationService - Validators for videoGallery post request data.
 * @requires VideoGalleryController - Controllers for handling videoGallery post operations.
 * @module videoGalleryRouter - Express router with defined routes for videoGallery operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { VideoGalleryValidationService } from "./videoGallery.validator.js";
import { VideoGalleryController } from "./videoGallery.controller.js";
import multerErrorHandlerMiddleware from "../../../middlewares/multerErrorHandlerMiddleware.js";

const videoGalleryRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a videoGallery.
 *     description: Endpoint to add a new videoGallery to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the videoGallery.
 *       - in: formData
 *         name: galleryVideo
 *         type: file
 *         description: The videoGallery post video file to upload.
 *     responses:
 *       200:
 *         description: VideoGallery successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new videoGallery.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
videoGalleryRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('galleryVideo'),
    multerErrorHandlerMiddleware,
    VideoGalleryController.createVideoGalleryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all videoGallery.
 *     description: Endpoint to retrieve a list of all videoGallery.
 *     responses:
 *       200:
 *         description: A list of videoGallery.
 *       404:
 *         description: VideoGallery not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all videoGallery.
 * @route GET /
 */
videoGalleryRouter.get("/", [
    VideoGalleryController.getVideoGalleryListController
]);

/**
 * @swagger
 * /{videoGalleryId}:
 *   get:
 *     summary: Retrieve a specific videoGallery by ID.
 *     description: Endpoint to get details of a videoGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: videoGalleryId
 *         required: true
 *         description: ID of the videoGallery to retrieve.
 *     responses:
 *       200:
 *         description: VideoGallery details.
 *       404:
 *         description: VideoGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific videoGallery.
 * @route GET /{videoGalleryId}
 */
videoGalleryRouter.get("/:videoGalleryId", [
    VideoGalleryValidationService.validateVideoGalleryParams,
    VideoGalleryController.getAVideoGalleryController
]);

/**
 * @swagger
 * /{videoGalleryId}:
 *   delete:
 *     summary: Delete a videoGallery by ID.
 *     description: Endpoint to delete a videoGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: videoGalleryId
 *         required: true
 *         description: ID of the videoGallery to delete.
 *     responses:
 *       200:
 *         description: VideoGallery successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: VideoGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific videoGallery.
 * Requires authentication.
 * @route DELETE /{videoGalleryId}
 */
videoGalleryRouter.delete("/:videoGalleryId", [
    authTokenMiddleware,
    VideoGalleryValidationService.validateVideoGalleryParams,
    VideoGalleryController.deleteAVideoGalleryController
]);

export default videoGalleryRouter;