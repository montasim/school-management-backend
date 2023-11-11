/**
 * @fileoverview HomePageGallery Routes for Express Application.
 *
 * This module defines the routes for homePageGallery-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting homePageGallery posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of homePageGallery-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires HomePageGalleryValidationService - Validators for homePageGallery post request data.
 * @requires HomePageGalleryController - Controllers for handling homePageGallery post operations.
 * @module homePageGalleryRouter - Express router with defined routes for homePageGallery operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { HomePageGalleryValidationService } from "./homePageGallery.validator.js";
import { HomePageGalleryController } from "./homePageGallery.controller.js";

const homePageGalleryRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a homePageGallery.
 *     description: Endpoint to add a new homePageGallery to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the homePageGallery.
 *       - in: formData
 *         name: galleryImage
 *         type: file
 *         description: The homePageGallery post image file to upload.
 *     responses:
 *       200:
 *         description: HomePageGallery successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new homePageGallery.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
homePageGalleryRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('galleryImage'),
    HomePageGalleryValidationService.validateHomePageGalleryDetails,
    HomePageGalleryValidationService.validateHomePageGalleryFile,
    HomePageGalleryController.createHomePageGalleryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all homePageGallery.
 *     description: Endpoint to retrieve a list of all homePageGallery.
 *     responses:
 *       200:
 *         description: A list of homePageGallery.
 *       404:
 *         description: HomePageGallery not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all homePageGallery.
 * @route GET /
 */
homePageGalleryRouter.get("/", [
    HomePageGalleryController.getHomePageGalleryListController
]);

/**
 * @swagger
 * /{homePageGalleryId}:
 *   get:
 *     summary: Retrieve a specific homePageGallery by ID.
 *     description: Endpoint to get details of a homePageGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageGalleryId
 *         required: true
 *         description: ID of the homePageGallery to retrieve.
 *     responses:
 *       200:
 *         description: HomePageGallery details.
 *       404:
 *         description: HomePageGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific homePageGallery.
 * @route GET /{homePageGalleryId}
 */
homePageGalleryRouter.get("/:homePageGalleryId", [
    HomePageGalleryValidationService.validateHomePageGalleryParams,
    HomePageGalleryController.getAHomePageGalleryController
]);

/**
 * @swagger
 * /{homePageGalleryId}:
 *   delete:
 *     summary: Delete a homePageGallery by ID.
 *     description: Endpoint to delete a homePageGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageGalleryId
 *         required: true
 *         description: ID of the homePageGallery to delete.
 *     responses:
 *       200:
 *         description: HomePageGallery successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: HomePageGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific homePageGallery.
 * Requires authentication.
 * @route DELETE /{homePageGalleryId}
 */
homePageGalleryRouter.delete("/:homePageGalleryId", [
    authTokenMiddleware,
    HomePageGalleryValidationService.validateHomePageGalleryParams,
    HomePageGalleryController.deleteAHomePageGalleryController
]);

export default homePageGalleryRouter;