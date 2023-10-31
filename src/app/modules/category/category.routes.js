import express from "express";
import verifyJwt from "../../middlewares/verifyAuthenticationToken.js";
import { CategoryValidators } from "./category.validator.js";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
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
 */
router.post("/", [
    verifyJwt,
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
 */
router.put("/:categoryId", [
    verifyJwt,
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
 */
router.delete("/:categoryId", [
    verifyJwt,
    CategoryValidators.categoryParamsValidator,
    CategoryController.deleteACategoryController
]);

export default router;
