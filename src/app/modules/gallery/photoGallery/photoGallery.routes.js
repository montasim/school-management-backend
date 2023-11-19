/**
 * @fileoverview PhotoGallery Routes for Express Application.
 *
 * This module defines the routes for photoGallery-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting photoGallery posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of photoGallery-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires PhotoGalleryValidationService - Validators for photoGallery post request data.
 * @requires PhotoGalleryController - Controllers for handling photoGallery post operations.
 * @module photoGalleryRouter - Express router with defined routes for photoGallery operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { PhotoGalleryValidationService } from "./photoGallery.validator.js";
import { PhotoGalleryController } from "./photoGallery.controller.js";
import multerErrorHandlerMiddleware from "../../../middlewares/multerErrorHandlerMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a photoGallery.
 *     description: Endpoint to add a new photoGallery to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the photoGallery.
 *       - in: formData
 *         name: galleryImage
 *         type: file
 *         description: The photoGallery post image file to upload.
 *     responses:
 *       200:
 *         description: PhotoGallery successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new photoGallery.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('galleryImage'),
    multerErrorHandlerMiddleware,
    PhotoGalleryController.createPhotoGalleryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all photoGallery.
 *     description: Endpoint to retrieve a list of all photoGallery.
 *     responses:
 *       200:
 *         description: A list of photoGallery.
 *       404:
 *         description: PhotoGallery not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all photoGallery.
 * @route GET /
 */
router.get("/", [
    PhotoGalleryController.getPhotoGalleryListController
]);

/**
 * @swagger
 * /{photoGalleryId}:
 *   get:
 *     summary: Retrieve a specific photoGallery by ID.
 *     description: Endpoint to get details of a photoGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: photoGalleryId
 *         required: true
 *         description: ID of the photoGallery to retrieve.
 *     responses:
 *       200:
 *         description: PhotoGallery details.
 *       404:
 *         description: PhotoGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific photoGallery.
 * @route GET /{photoGalleryId}
 */
router.get("/:photoGalleryId", [
    PhotoGalleryValidationService.validatePhotoGalleryParams,
    PhotoGalleryController.getAPhotoGalleryController
]);

/**
 * @swagger
 * /{photoGalleryId}:
 *   delete:
 *     summary: Delete a photoGallery by ID.
 *     description: Endpoint to delete a photoGallery by their ID.
 *     parameters:
 *       - in: path
 *         name: photoGalleryId
 *         required: true
 *         description: ID of the photoGallery to delete.
 *     responses:
 *       200:
 *         description: PhotoGallery successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: PhotoGallery not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific photoGallery.
 * Requires authentication.
 * @route DELETE /{photoGalleryId}
 */
router.delete("/:photoGalleryId", [
    authTokenMiddleware,
    PhotoGalleryValidationService.validatePhotoGalleryParams,
    PhotoGalleryController.deleteAPhotoGalleryController
]);

export default router;