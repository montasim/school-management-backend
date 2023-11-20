/**
 * @fileoverview HomePagePost Routes for Express Application.
 *
 * This module defines the routes for homePagePost-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting homePagePost posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of homePagePost-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires HomePagePostValidationService - Validators for homePagePost post request data.
 * @requires HomePagePostController - Controllers for handling homePagePost post operations.
 * @module homePagePostRouter - Express router with defined routes for homePagePost operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { HomePagePostValidationService } from "./homePagePost.validator.js";
import { HomePagePostController } from "./homePagePost.controller.js";
import multerErrorHandlerMiddleware from "../../../middlewares/multerErrorHandlerMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a homePagePost.
 *     description: Endpoint to add a new homePagePost to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the homePagePost.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the homePagePost.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the homePagePost.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The homePagePost post image file to upload.
 *     responses:
 *       200:
 *         description: HomePagePost successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new homePagePost.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('postImage'),
    HomePagePostValidationService.validateNewHomePagePostDetails,
    HomePagePostController.createHomePagePostController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all homePagePosts.
 *     description: Endpoint to retrieve a list of all homePagePosts.
 *     responses:
 *       200:
 *         description: A list of homePagePosts.
 *       404:
 *         description: HomePagePost not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all homePagePosts.
 * @route GET /
 */
router.get("/", [
    HomePagePostController.getHomePagePostListController
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   get:
 *     summary: Retrieve a specific homePagePost by ID.
 *     description: Endpoint to get details of a homePagePost by their ID.
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to retrieve.
 *     responses:
 *       200:
 *         description: HomePagePost details.
 *       404:
 *         description: HomePagePost not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific homePagePost.
 * @route GET /{homePagePostId}
 */
router.get("/:homePagePostId", [
    HomePagePostValidationService.validateHomePagePostParams,
    HomePagePostController.getAHomePagePostController
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   put:
 *     summary: Update a homePagePost.
 *     description: Endpoint to update an existing homePagePost to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to update.
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the homePagePost.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the homePagePost.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the homePagePost.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The homePagePost post image file to upload.
 *     responses:
 *       200:
 *         description: HomePagePost successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new homePagePost.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.put("/:homePagePostId", [
    authTokenMiddleware,
    fileUploadMiddleware.single('postImage'),
    HomePagePostValidationService.validateHomePagePostParams,
    HomePagePostValidationService.validateUpdateHomePagePostDetails,
    HomePagePostController.updateAHomePagePostController
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   delete:
 *     summary: Delete a homePagePost by ID.
 *     description: Endpoint to delete a homePagePost by their ID.
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to delete.
 *     responses:
 *       200:
 *         description: HomePagePost successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: HomePagePost not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific homePagePost.
 * Requires authentication.
 * @route DELETE /{homePagePostId}
 */
router.delete("/:homePagePostId", [
    authTokenMiddleware,
    HomePagePostValidationService.validateHomePagePostParams,
    HomePagePostController.deleteAHomePagePostController
]);

export default router;