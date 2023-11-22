/**
 * @fileoverview WebsiteBanner Routes for Express Application.
 *
 * This module defines the routes for websiteBanner-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting websiteBanner posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of websiteBanner-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires WebsiteBannerValidationService - Validators for websiteBanner post request data.
 * @requires WebsiteBannerController - Controllers for handling websiteBanner post operations.
 * @module websiteBannerRouter - Express router with defined routes for websiteBanner operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { WebsiteBannerValidationService } from "./websiteBanner.validator.js";
import { WebsiteBannerController } from "./websiteBanner.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a websiteBanner.
 *     description: Endpoint to add a new websiteBanner to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the websiteBanner.
 *       - in: formData
 *         name: carouselImage
 *         type: file
 *         description: The websiteBanner image file to upload.
 *     responses:
 *       200:
 *         description: WebsiteBanner successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new websiteBanner.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('websiteBannerImage'),
    WebsiteBannerValidationService.validateNewWebsiteBannerDetails,
    WebsiteBannerController.createWebsiteBannerController
]);

/**
 * @swagger
 * /{websiteBannerId}:
 *   get:
 *     summary: Retrieve a specific websiteBanner by ID.
 *     description: Endpoint to get details of a websiteBanner by their ID.
 *     parameters:
 *       - in: path
 *         name: websiteBannerId
 *         required: true
 *         description: ID of the websiteBanner to retrieve.
 *     responses:
 *       200:
 *         description: WebsiteBanner details.
 *       404:
 *         description: WebsiteBanner not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific websiteBanner.
 * @route GET /{websiteBannerId}
 */
router.get("/", [
    WebsiteBannerController.getAWebsiteBannerController
]);

/**
 * @swagger
 * /{websiteBannerId}:
 *   delete:
 *     summary: Delete a websiteBanner by ID.
 *     description: Endpoint to delete a websiteBanner by their ID.
 *     parameters:
 *       - in: path
 *         name: websiteBannerId
 *         required: true
 *         description: ID of the websiteBanner to delete.
 *     responses:
 *       200:
 *         description: WebsiteBanner successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: WebsiteBanner not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific websiteBanner.
 * Requires authentication.
 * @route DELETE /{websiteBannerId}
 */
router.delete("/", [
    authTokenMiddleware,
    WebsiteBannerController.deleteAWebsiteBannerController
]);

export default router;