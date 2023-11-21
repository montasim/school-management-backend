/**
 * @fileoverview Express Router for Others Information Category Entity.
 *
 * This module sets up an Express router for handling various HTTP requests related to the 'Others Information Category' entity.
 * It defines routes for creating, retrieving, updating, and deleting categories. Each route is configured
 * with appropriate middleware for validation and authentication, ensuring that requests are processed correctly
 * and securely. The router leverages controllers and validators to handle the business logic and data validation
 * for each operation. This modular approach promotes clean code organization and separation of concerns,
 * making the API easier to understand and maintain.
 *
 * @requires express - Express framework to create route handlers.
 * @requires authTokenMiddleware - Middleware for validating authentication tokens.
 * @requires CategoryValidators - Validators for ensuring the integrity of category-related data.
 * @requires CategoryController - Controllers that contain the logic for handling category-related operations.
 * @module categoryRouter - Exported Express router for category routes.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { OthersInformationCategoryValidators } from "./othersInformationCategory.validator.js";
import { OthersInformationCategoryController } from "./othersInformationCategory.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a othersInformationCategory.
 *     description: Endpoint to add a new othersInformationCategory to the system.
 *     parameters:
 *       - in: body
 *         name: othersInformationCategory
 *         description: The othersInformationCategory to create.
 *         schema:
 *           $ref: '#/definitions/OthersInformationCategory'
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
    OthersInformationCategoryValidators.othersInformationCategoryBodyValidator,
    OthersInformationCategoryController.createOthersInformationCategory
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all othersInformationCategory.
 *     description: Endpoint to retrieve a list of all othersInformationCategory.
 *     responses:
 *       200:
 *         description: A list of othersInformationCategory.
 *       404:
 *         description: OthersInformationCategory not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    OthersInformationCategoryController.getOthersInformationCategoryList
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   get:
 *     summary: Retrieve a specific othersInformationCategory by ID.
 *     description: Endpoint to get details of a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformationCategory details.
 *       404:
 *         description: OthersInformationCategory not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/:othersInformationCategoryId", [
    OthersInformationCategoryValidators.othersInformationCategoryParamsValidator,
    OthersInformationCategoryController.getAOthersInformationCategory
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   put:
 *     summary: Update a othersInformationCategory by ID.
 *     description: Endpoint to update the details of a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: othersInformationCategory
 *         description: Updated details of the othersInformationCategory.
 *         schema:
 *           $ref: '#/definitions/OthersInformationCategory'
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:othersInformationCategoryId", [
    authTokenMiddleware,
    OthersInformationCategoryValidators.othersInformationCategoryParamsValidator,
    OthersInformationCategoryValidators.othersInformationCategoryBodyValidator,
    OthersInformationCategoryController.updateAOthersInformationCategory
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   delete:
 *     summary: Delete a othersInformationCategory by ID.
 *     description: Endpoint to delete a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: OthersInformationCategory not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:othersInformationCategoryId", [
    authTokenMiddleware,
    OthersInformationCategoryValidators.othersInformationCategoryParamsValidator,
    OthersInformationCategoryController.deleteAOthersInformationCategory
]);

export default router;