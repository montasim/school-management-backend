/**
 * @fileoverview OthersInformation Routes for Express Application.
 *
 * This module defines the routes for others information-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting others information posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of others information-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires OthersInformationValidationService - Validators for others information post request data.
 * @requires OthersInformationController - Controllers for handling others information post operations.
 * @module othersInformationRouter - Express router with defined routes for others information operations.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { OthersInformationValidationService } from "./othersInformation.validator.js";
import { OthersInformationController } from "./othersInformation.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create an othersInformation.
 *     description: Endpoint to add a new othersInformation to the system.
 *     parameters:
 *       - in: body
 *         name: title
 *         type: string
 *         description: Title of the othersInformation.
 *       - in: body
 *         name: category
 *         type: string
 *         description: Category of the othersInformation.
 *       - in: body
 *         name: description
 *         type: string
 *         description: Description of the othersInformation.
 *     responses:
 *       200:
 *         description: OthersInformation successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
    OthersInformationValidationService.validateNewOthersInformationDetails,
    OthersInformationController.createOthersInformationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all other information.
 *     description: Endpoint to retrieve a list of all other information.
 *     responses:
 *       200:
 *         description: A list of others information.
 *       404:
 *         description: OthersInformation not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    OthersInformationController.getOthersInformationListController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   get:
 *     summary: Retrieve a specific othersInformation by ID.
 *     description: Endpoint to get details of an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to retrieve.
 *       - in: body
 *         name: title
 *         type: string
 *         description: Title of the othersInformation.
 *       - in: body
 *         name: category
 *         type: string
 *         description: Category of the othersInformation.
 *       - in: body
 *         name: description
 *         type: string
 *         description: Description of the othersInformation.
 *     responses:
 *       200:
 *         description: OthersInformation details.
 *       404:
 *         description: OthersInformation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/:othersInformationId", [
    OthersInformationValidationService.validateOthersInformationParams,
    OthersInformationController.getAOthersInformationController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   put:
 *     summary: Update an othersInformation by ID.
 *     description: Endpoint to update the details of an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: othersInformation
 *         description: Updated details of the othersInformation.
 *         schema:
 *           $ref: '#/definitions/OthersInformation'
 *     responses:
 *       200:
 *         description: OthersInformation successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:othersInformationId", [
    authTokenMiddleware,
    OthersInformationValidationService.validateOthersInformationParams,
    OthersInformationController.updateAOthersInformationController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   delete:
 *     summary: Delete an othersInformation by ID.
 *     description: Endpoint to delete an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformation successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: OthersInformation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:othersInformationId", [
    authTokenMiddleware,
    OthersInformationValidationService.validateOthersInformationParams,
    OthersInformationController.deleteAOthersInformationController
]);

export default router;