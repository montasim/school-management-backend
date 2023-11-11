/**
 * @fileoverview Gallery Routes for Express Application.
 *
 * This module defines the routes for gallery-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting gallery posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of gallery-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires GalleryValidationService - Validators for gallery post request data.
 * @requires GalleryController - Controllers for handling gallery post operations.
 * @module galleryRouter - Express router with defined routes for gallery operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { GalleryValidationService } from "./gallery.validator.js";
import { GalleryController } from "./gallery.controller.js";

const galleryRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a gallery.
 *     description: Endpoint to add a new gallery to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the gallery.
 *       - in: formData
 *         name: galleryImage
 *         type: file
 *         description: The gallery post image file to upload.
 *     responses:
 *       200:
 *         description: Gallery successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new gallery.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
galleryRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('galleryImage'),
    GalleryValidationService.validateGalleryDetails,
    GalleryValidationService.validateGalleryFile,
    GalleryController.createGalleryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all gallery image.
 *     description: Endpoint to retrieve a list of all gallery image.
 *     responses:
 *       200:
 *         description: A list of gallery image.
 *       404:
 *         description: Gallery not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all gallery image.
 * @route GET /
 */
galleryRouter.get("/", [
    GalleryController.getGalleryListController
]);

/**
 * @swagger
 * /{galleryId}:
 *   get:
 *     summary: Retrieve a specific gallery by ID.
 *     description: Endpoint to get details of a gallery by their ID.
 *     parameters:
 *       - in: path
 *         name: galleryId
 *         required: true
 *         description: ID of the gallery to retrieve.
 *     responses:
 *       200:
 *         description: Gallery details.
 *       404:
 *         description: Gallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific gallery.
 * @route GET /{galleryId}
 */
galleryRouter.get("/:galleryId", [
    GalleryValidationService.validateGalleryParams,
    GalleryController.getAGalleryController
]);

/**
 * @swagger
 * /{galleryId}:
 *   delete:
 *     summary: Delete a gallery by ID.
 *     description: Endpoint to delete a gallery by their ID.
 *     parameters:
 *       - in: path
 *         name: galleryId
 *         required: true
 *         description: ID of the gallery to delete.
 *     responses:
 *       200:
 *         description: Gallery successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Gallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific gallery.
 * Requires authentication.
 * @route DELETE /{galleryId}
 */
galleryRouter.delete("/:galleryId", [
    authTokenMiddleware,
    GalleryValidationService.validateGalleryParams,
    GalleryController.deleteAGalleryController
]);

export default galleryRouter;