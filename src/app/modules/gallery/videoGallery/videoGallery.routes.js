/**
 * @fileoverview Website Important Information Link Router.
 *
 * This file defines the routes for managing video gallery links.
 * It includes routes for creating, retrieving, updating, and deleting important
 * information links. These routes are integrated with middleware for authentication,
 * validation, and other necessary functionalities. The router handles different HTTP
 * methods (POST, GET, PUT, DELETE) to support CRUD operations for video gallery
 * links. Each route is mapped to a specific controller function to process the requests.
 *
 * @requires express - Express framework to define routing logic.
 * @requires authTokenMiddleware - Middleware for authenticating users.
 * @requires VideoGalleryValidators - Validators for input data.
 * @requires VideoGalleryController - Controllers for route handling.
 * @module videoGalleryRouter - Exports the configured Express router.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { VideoGalleryValidators } from "./videoGallery.validator.js";
import { VideoGalleryController } from "./videoGallery.controller.js";
import { CacheMiddleware } from "../../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a website contact.
 *     description: Endpoint to add a new video gallery link to the system.
 *     parameters:
 *       - in: body
 *         name: videoGalleryTitle
 *         type: string
 *         description: Video title of the website.
 *       - in: body
 *         name: videoLink
 *         type: object
 *         description: Video link of the website.
 *     responses:
 *       200:
 *         description: Website contact successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new website contact.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    VideoGalleryValidators.videoGalleryBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    VideoGalleryController.createVideoGalleryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a video gallery link.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website video gallery link.
 *       404:
 *         description: Website video gallery link not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    VideoGalleryController.getVideoGalleryListController
]);

/**
 * @swagger
 * /{videoGalleryId}:
 *   get:
 *     summary: Retrieve a video gallery link by videoGalleryId.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website video gallery link.
 *       404:
 *         description: Website video gallery link not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:videoGalleryId", [
    VideoGalleryValidators.videoGalleryParamsValidator,
    CacheMiddleware.createCacheMiddleware,
    VideoGalleryController.getAVideoGalleryController
]);

/**
 * @swagger
 * /{videoGalleryId}:
 *   put:
 *     summary: Update a website contact.
 *     description: Endpoint to update an existing video gallery link to the system.
 *     - in: body
 *         name: videoGalleryTitle
 *         type: string
 *         description: Video title of the website.
 *       - in: body
 *         name: videoLink
 *         type: object
 *         description: Video link of the website.
 *     responses:
 *       200:
 *         description: Website contact successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new website contact.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.put("/:videoGalleryId", [
    authTokenMiddleware,
    VideoGalleryValidators.videoGalleryParamsValidator,
    VideoGalleryValidators.videoGalleryBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    VideoGalleryController.updateAVideoGalleryController
]);

/**
 * @swagger
 * /{videoGalleryId}:
 *   delete:
 *     summary: Delete a video gallery link.
 *     description: Endpoint to delete a video gallery link.
 *     responses:
 *       200:
 *         description: A Website video gallery link successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Website video gallery link not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:videoGalleryId", [
    authTokenMiddleware,
    VideoGalleryValidators.videoGalleryParamsValidator,
    CacheMiddleware.deleteCacheMiddleware,
    VideoGalleryController.deleteAVideoGalleryController
]);

export default router;