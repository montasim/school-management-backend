import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { CategoryValidators } from "./category.validator.js";
import { CategoryController } from "./category.controller.js";

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
    CategoryController.deleteACategoryController
]);

export default router;
