/**
 * @fileoverview Router for Website Contact Management.
 *
 * Defines routes for handling website contact related operations like creating,
 * retrieving, updating, and deleting website contact information. These routes
 * integrate middleware for authentication and data validation, ensuring that
 * only authorized users can modify contact information and that all data
 * conforms to expected formats.
 *
 * @requires express - Express framework to create route handlers.
 * @requires authTokenMiddleware - Middleware for authenticating API requests.
 * @requires WebsiteContactValidationService - Service for validating website contact data.
 * @requires WebsiteContactController - Controller for handling website contact operations.
 * @module websiteContactRouter - Express router for website contact routes.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteContactValidationService } from "./websiteContact.validator.js";
import { WebsiteContactController } from "./websiteContact.controller.js";
import { CacheMiddleware } from "../../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a website contact.
 *     description: Endpoint to add a new website contact to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: body
 *         name: address
 *         type: string
 *         description: Address of the website.
 *       - in: body
 *         name: googleMapLocation
 *         type: object
 *         description: Google map location of the website.
 *       - in: body
 *         name: mobile
 *         type: string
 *         description: The website mobile number.
 *       - in: body
 *         name: phone
 *         type: string
 *         description: The website phone number.
 *       - in: body
 *         name: email
 *         type: string
 *         description: The website email address.
 *       - in: body
 *         name: website
 *         type: string
 *         description: The website web address.
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
    WebsiteContactValidationService.validateNewWebsiteContactDetails,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteContactController.createWebsiteContactController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website contact.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website contact.
 *       404:
 *         description: Website contact not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    WebsiteContactController.getWebsiteContactController
]);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Create a website contact.
 *     description: Endpoint to add a new website contact to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: body
 *         name: address
 *         type: string
 *         description: Address of the website.
 *       - in: body
 *         name: googleMapLocation
 *         type: object
 *         description: Google map location of the website.
 *       - in: body
 *         name: mobile
 *         type: string
 *         description: The website mobile number.
 *       - in: body
 *         name: phone
 *         type: string
 *         description: The website phone number.
 *       - in: body
 *         name: email
 *         type: string
 *         description: The website email address.
 *       - in: body
 *         name: website
 *         type: string
 *         description: The website web address.
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
router.put("/", [
    authTokenMiddleware,
    WebsiteContactValidationService.validateUpdateWebsiteContactDetails,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteContactController.updateWebsiteContactController
]);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a website contact.
 *     description: Endpoint to delete a website contact.
 *     responses:
 *       200:
 *         description: Website contact successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Website contact not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/", [
    authTokenMiddleware,
    CacheMiddleware.deleteCacheMiddleware,
    WebsiteContactController.deleteWebsiteContactController
]);

export default router;