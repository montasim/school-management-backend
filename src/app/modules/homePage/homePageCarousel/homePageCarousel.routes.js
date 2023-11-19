/**
 * @fileoverview HomePageCarousel Routes for Express Application.
 *
 * This module defines the routes for homePageCarousel-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting homePageCarousel posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of homePageCarousel-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires HomePageCarouselValidationService - Validators for homePageCarousel post request data.
 * @requires HomePageCarouselController - Controllers for handling homePageCarousel post operations.
 * @module homePageCarouselRouter - Express router with defined routes for homePageCarousel operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { HomePageCarouselValidationService } from "./homePageCarousel.validator.js";
import { HomePageCarouselController } from "./homePageCarousel.controller.js";
import multerErrorHandlerMiddleware from "../../../middlewares/multerErrorHandlerMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a homePageCarousel.
 *     description: Endpoint to add a new homePageCarousel to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the homePageCarousel.
 *       - in: formData
 *         name: carouselImage
 *         type: file
 *         description: The homePageCarousel post image file to upload.
 *     responses:
 *       200:
 *         description: HomePageCarousel successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new homePageCarousel.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('carouselImage'),
    multerErrorHandlerMiddleware,
    HomePageCarouselValidationService.validateHomePageCarouselDetails,
    HomePageCarouselValidationService.validateHomePageCarouselFile,
    HomePageCarouselController.createHomePageCarouselController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all homePageCarousels.
 *     description: Endpoint to retrieve a list of all homePageCarousels.
 *     responses:
 *       200:
 *         description: A list of homePageCarousels.
 *       404:
 *         description: HomePageCarousel not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all homePageCarousels.
 * @route GET /
 */
router.get("/", [
    HomePageCarouselController.getHomePageCarouselListController
]);

/**
 * @swagger
 * /{homePageCarouselId}:
 *   get:
 *     summary: Retrieve a specific homePageCarousel by ID.
 *     description: Endpoint to get details of a homePageCarousel by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageCarouselId
 *         required: true
 *         description: ID of the homePageCarousel to retrieve.
 *     responses:
 *       200:
 *         description: HomePageCarousel details.
 *       404:
 *         description: HomePageCarousel not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific homePageCarousel.
 * @route GET /{homePageCarouselId}
 */
router.get("/:homePageCarouselId", [
    HomePageCarouselValidationService.validateHomePageCarouselParams,
    HomePageCarouselController.getAHomePageCarouselController
]);

/**
 * @swagger
 * /{homePageCarouselId}:
 *   delete:
 *     summary: Delete a homePageCarousel by ID.
 *     description: Endpoint to delete a homePageCarousel by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageCarouselId
 *         required: true
 *         description: ID of the homePageCarousel to delete.
 *     responses:
 *       200:
 *         description: HomePageCarousel successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: HomePageCarousel not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific homePageCarousel.
 * Requires authentication.
 * @route DELETE /{homePageCarouselId}
 */
router.delete("/:homePageCarouselId", [
    authTokenMiddleware,
    HomePageCarouselValidationService.validateHomePageCarouselParams,
    HomePageCarouselController.deleteAHomePageCarouselController
]);

export default router;