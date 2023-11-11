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
 * @requires WebsiteOfficialLinkValidators - Validators for input data.
 * @requires WebsiteOfficialLinkController - Controllers for route handling.
 * @module websiteOfficialLinkRouter - Exports the configured Express router.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteOfficialLinkValidators } from "./websiteOfficialLink.validator.js";
import { WebsiteOfficialLinkController } from "./websiteOfficialLink.controller.js";

const websiteOfficialLinkRouter = express.Router();

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
 *         name: officialLinkTitle
 *         type: string
 *         description: Important information link title of the website.
 *       - in: body
 *         name: officialLink
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
websiteOfficialLinkRouter.post("/", [
    authTokenMiddleware,
    WebsiteOfficialLinkValidators.websiteOfficialLinkBodyValidator,
    WebsiteOfficialLinkController.createWebsiteOfficialLinkController
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
websiteOfficialLinkRouter.get("/", [
    WebsiteOfficialLinkController.getWebsiteOfficialLinkListController
]);

/**
 * @swagger
 * /{websiteOfficialLinkId}:
 *   get:
 *     summary: Retrieve a website important information link by websiteOfficialLinkId.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website important information link.
 *       404:
 *         description: Website important information link not found.
 *       500:
 *         description: Internal server error.
 */
websiteOfficialLinkRouter.get("/:websiteOfficialLinkId", [
    WebsiteOfficialLinkValidators.websiteOfficialLinkParamsValidator,
    WebsiteOfficialLinkController.getAWebsiteOfficialLinkController
]);

/**
 * @swagger
 * /{websiteOfficialLinkId}:
 *   put:
 *     summary: Update a website contact.
 *     description: Endpoint to update an existing website important information link to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: body
 *         name: officialLinkTitle
 *         type: string
 *         description: Important information link title of the website.
 *       - in: body
 *         name: officialLink
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
websiteOfficialLinkRouter.put("/:websiteOfficialLinkId", [
    authTokenMiddleware,
    WebsiteOfficialLinkValidators.websiteOfficialLinkParamsValidator,
    WebsiteOfficialLinkValidators.websiteOfficialLinkBodyValidator,
    WebsiteOfficialLinkController.updateAWebsiteOfficialLinkController
]);

/**
 * @swagger
 * /{websiteOfficialLinkId}:
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
websiteOfficialLinkRouter.delete("/:websiteOfficialLinkId", [
    authTokenMiddleware,
    WebsiteOfficialLinkValidators.websiteOfficialLinkParamsValidator,
    WebsiteOfficialLinkController.deleteAWebsiteOfficialLinkController
]);

export default websiteOfficialLinkRouter;