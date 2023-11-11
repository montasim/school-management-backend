/**
 * @fileoverview Express router providing notice-related routes.
 *
 * This module defines routes for creating, retrieving, and deleting notices.
 * It includes middleware for authentication, file upload handling, and specific validations
 * related to notice operations. Each route is documented using Swagger annotations for API
 * specification and JSDoc comments for internal code documentation.
 *
 * @requires express Express - Express framework for building web applications
 * @requires authTokenMiddleware - Middleware for authenticating tokens
 * @requires fileUploadMiddleware - Middleware for handling file uploads
 * @requires NoticeValidationService - Service for validating notice-related parameters
 * @requires NoticeController - Controller for handling notice-related operations
 * @module noticeRouter - Express router for notice routes
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { NoticeValidationService } from "./notice.validator.js";
import { NoticeController } from "./notice.controller.js";

const noticeRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a notice.
 *     description: Endpoint to add a new notice to the system.
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
 *         description: Title of the notice.
 *     responses:
 *       200:
 *         description: Notice successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new notice.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
noticeRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    NoticeController.createNoticeController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all notices.
 *     description: Endpoint to retrieve a list of all notices.
 *     responses:
 *       200:
 *         description: A list of notices.
 *       404:
 *         description: Notice not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all notices.
 * @route GET /
 */
noticeRouter.get("/", [
    NoticeController.getNoticeListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific notice by ID.
 *     description: Endpoint to get details of a notice by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the notice to retrieve.
 *     responses:
 *       200:
 *         description: Notice details.
 *       404:
 *         description: Notice not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific notice.
 * @route GET /{fileName}
 */
noticeRouter.get("/:fileName", [
    NoticeValidationService.validateNoticeParams,
    NoticeController.getANoticeController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a notice by ID.
 *     description: Endpoint to delete a notice by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the notice to delete.
 *     responses:
 *       200:
 *         description: Notice successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Notice not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific notice.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
noticeRouter.delete("/:fileName", [
    authTokenMiddleware,
    NoticeValidationService.validateNoticeParams,
    NoticeController.deleteANoticeController
]);

export default noticeRouter;