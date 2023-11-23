/**
 * @fileoverview Website Important Information Link Router.
 *
 * This file defines the routes for managing website important information links.
 * It includes routes for creating, retrieving, updating, and deleting important
 * information links. These routes are integrated with middleware for authentication,
 * validation, and other necessary functionalities. The router handles different HTTP
 * methods (POST, GET, PUT, DELETE) to support CRUD operations for important information
 * links. Each route is mapped to a specific controller function to process the requests.
 *
 * @requires express - Express framework to define routing logic.
 * @requires authTokenMiddleware - Middleware for authenticating users.
 * @requires WebsiteImportantInformationLinkValidators - Validators for input data.
 * @requires WebsiteImportantInformationLinkController - Controllers for route handling.
 * @module websiteImportantInformationLinkRouter - Exports the configured Express router.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteImportantInformationLinkValidators } from "./websiteImportantInformationLink.validator.js";
import { WebsiteImportantInformationLinkController } from "./websiteImportantInformationLink.controller.js";
import { CacheMiddleware } from "../../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a website contact.
 *     description: Endpoint to add a new website important information link to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: body
 *         name: importantInformationLinkTitle
 *         type: string
 *         description: Important information link title of the website.
 *       - in: body
 *         name: importantInformationLink
 *         type: object
 *         description: Important information link of the website.
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
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteImportantInformationLinkController.createWebsiteImportantInformationLinkController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website important information link.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website important information link.
 *       404:
 *         description: Website important information link not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    WebsiteImportantInformationLinkController.getWebsiteImportantInformationLinkListController
]);

/**
 * @swagger
 * /{websiteImportantInformationLinkId}:
 *   get:
 *     summary: Retrieve a website important information link by websiteImportantInformationLinkId.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website important information link.
 *       404:
 *         description: Website important information link not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:websiteImportantInformationLinkId", [
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkParamsValidator,
    CacheMiddleware.createCacheMiddleware,
    WebsiteImportantInformationLinkController.getAWebsiteImportantInformationLinkController
]);

/**
 * @swagger
 * /{websiteImportantInformationLinkId}:
 *   put:
 *     summary: Update a website contact.
 *     description: Endpoint to update an existing website important information link to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: body
 *         name: importantInformationLinkTitle
 *         type: string
 *         description: Important information link title of the website.
 *       - in: body
 *         name: importantInformationLink
 *         type: object
 *         description: Important information link of the website.
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
router.put("/:websiteImportantInformationLinkId", [
    authTokenMiddleware,
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkParamsValidator,
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteImportantInformationLinkController.updateAWebsiteImportantInformationLinkController
]);

/**
 * @swagger
 * /{websiteImportantInformationLinkId}:
 *   delete:
 *     summary: Delete a website important information link.
 *     description: Endpoint to delete a website important information link.
 *     responses:
 *       200:
 *         description: Website important information link successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Website important information link not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:websiteImportantInformationLinkId", [
    authTokenMiddleware,
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkParamsValidator,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteImportantInformationLinkController.deleteAWebsiteImportantInformationLinkController
]);

export default router;