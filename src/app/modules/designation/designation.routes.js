/**
 * @fileoverview Router for Designation-Related Operations in Express.
 *
 * This module sets up the Express router for handling various endpoints related to Designations.
 * It includes routes for creating a new designation, retrieving a list of all designations,
 * retrieving a specific designation by ID, updating a designation, and deleting a designation.
 * Each route is equipped with necessary middleware for authentication, validation of request data,
 * and respective controller functions to handle the request. This modular approach ensures separation
 * of concerns, with the router only handling routing logic, while business logic is handled in controllers
 * and validation logic in validators.
 *
 * @requires express - Express framework to create router.
 * @requires authTokenMiddleware - Middleware for authentication.
 * @requires DesignationValidators - Validators for designation-related operations.
 * @requires DesignationController - Controllers for designation-related operations.
 * @module DesignationRouter - Exported router for designation endpoints.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { DesignationValidators } from "./designation.validator.js";
import { DesignationController } from "./designation.controller.js";
import { CacheMiddleware } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a designation.
 *     description: Endpoint to add a new designation to the system.
 *     parameters:
 *       - in: body
 *         name: designation
 *         description: The designation to create.
 *         schema:
 *           $ref: '#/definitions/Designation'
 *     responses:
 *       200:
 *         description: Designation successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
    DesignationValidators.designationBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    DesignationController.createDesignationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all designation.
 *     description: Endpoint to retrieve a list of all designation.
 *     responses:
 *       200:
 *         description: A list of designation.
 *       404:
 *         description: Designation not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    DesignationController.getDesignationListController
]);

/**
 * @swagger
 * /{designationId}:
 *   get:
 *     summary: Retrieve a specific designation by ID.
 *     description: Endpoint to get details of a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Designation details.
 *       404:
 *         description: Designation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/:designationId", [
    DesignationValidators.designationParamsValidator,
    CacheMiddleware.createCacheMiddleware,
    DesignationController.getADesignationController
]);

/**
 * @swagger
 * /{designationId}:
 *   put:
 *     summary: Update a designation by ID.
 *     description: Endpoint to update the details of a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: designation
 *         description: Updated details of the designation.
 *         schema:
 *           $ref: '#/definitions/Designation'
 *     responses:
 *       200:
 *         description: Designation successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:designationId", [
    authTokenMiddleware,
    DesignationValidators.designationParamsValidator,
    DesignationValidators.designationBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    DesignationController.updateADesignationController
]);

/**
 * @swagger
 * /{designationId}:
 *   delete:
 *     summary: Delete a designation by ID.
 *     description: Endpoint to delete a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Designation successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Designation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:designationId", [
    authTokenMiddleware,
    DesignationValidators.designationParamsValidator,
    CacheMiddleware.deleteCacheMiddleware,
    DesignationController.deleteADesignationController
]);

export default router;