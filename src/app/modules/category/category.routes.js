/**
 * @fileoverview Express Router for Category Entity.
 *
 * This module sets up an Express router for handling various HTTP requests related to the 'Category' entity.
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
import { CategoryValidators } from "./category.validator.js";
import { CategoryController } from "./category.controller.js";
import { CacheMiddleware } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a category.
 *     description: Endpoint to add a new category to the system.
 *     parameters:
 *       - in: body
 *         name: category
 *         description: The category to create.
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
    CategoryValidators.categoryBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    CategoryController.createCategoryController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all category.
 *     description: Endpoint to retrieve a list of all category.
 *     responses:
 *       200:
 *         description: A list of category.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    CategoryController.getCategoryListController
]);

/**
 * @swagger
 * /{categoryId}:
 *   get:
 *     summary: Retrieve a specific category by ID.
 *     description: Endpoint to get details of a category by their ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details.
 *       404:
 *         description: Category not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/:categoryId", [
    CategoryValidators.categoryParamsValidator,
    CacheMiddleware.createCacheMiddleware,
    CategoryController.getACategoryController
]);

/**
 * @swagger
 * /{categoryId}:
 *   put:
 *     summary: Update a category by ID.
 *     description: Endpoint to update the details of a category by their ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: category
 *         description: Updated details of the category.
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:categoryId", [
    authTokenMiddleware,
    CategoryValidators.categoryParamsValidator,
    CategoryValidators.categoryBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    CategoryController.updateACategoryController
]);

/**
 * @swagger
 * /{categoryId}:
 *   delete:
 *     summary: Delete a category by ID.
 *     description: Endpoint to delete a category by their ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Category not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:categoryId", [
    authTokenMiddleware,
    CategoryValidators.categoryParamsValidator,
    CacheMiddleware.deleteCacheMiddleware,
    CategoryController.deleteACategoryController
]);

export default router;