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
 * @requires WebsiteSocialMediaLinkValidators - Validators for input data.
 * @requires WebsiteSocialMediaLinkController - Controllers for route handling.
 * @module websiteSocialMediaLinkRouter - Exports the configured Express router.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteSocialMediaLinkValidators } from "./websiteSocialMediaLink.validator.js";
import { WebsiteSocialMediaLinkController } from "./websiteSocialMediaLink.controller.js";

const websiteSocialMediaLinkRouter = express.Router();

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
websiteSocialMediaLinkRouter.post("/", [
    authTokenMiddleware,
    WebsiteSocialMediaLinkValidators.websiteSocialMediaLinkBodyValidator,
    WebsiteSocialMediaLinkController.createWebsiteSocialMediaLinkController
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
websiteSocialMediaLinkRouter.get("/", [
    WebsiteSocialMediaLinkController.getWebsiteSocialMediaLinkListController
]);

/**
 * @swagger
 * /{websiteSocialMediaLinkId}:
 *   get:
 *     summary: Retrieve a website important information link by websiteSocialMediaLinkId.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website important information link.
 *       404:
 *         description: Website important information link not found.
 *       500:
 *         description: Internal server error.
 */
websiteSocialMediaLinkRouter.get("/:websiteSocialMediaLinkId", [
    WebsiteSocialMediaLinkValidators.websiteSocialMediaLinkParamsValidator,
    WebsiteSocialMediaLinkController.getAWebsiteSocialMediaLinkController
]);

/**
 * @swagger
 * /{websiteSocialMediaLinkId}:
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
websiteSocialMediaLinkRouter.put("/:websiteSocialMediaLinkId", [
    authTokenMiddleware,
    WebsiteSocialMediaLinkValidators.websiteSocialMediaLinkParamsValidator,
    WebsiteSocialMediaLinkValidators.websiteSocialMediaLinkBodyValidator,
    WebsiteSocialMediaLinkController.updateAWebsiteSocialMediaLinkController
]);

/**
 * @swagger
 * /{websiteSocialMediaLinkId}:
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
websiteSocialMediaLinkRouter.delete("/:websiteSocialMediaLinkId", [
    authTokenMiddleware,
    WebsiteSocialMediaLinkValidators.websiteSocialMediaLinkParamsValidator,
    WebsiteSocialMediaLinkController.deleteAWebsiteSocialMediaLinkController
]);

export default websiteSocialMediaLinkRouter;