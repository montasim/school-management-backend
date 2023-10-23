import express from "express";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

/**
 * POST endpoint for creating a new category.
 *
 * @function
 * @async
 * @route {POST} /
 * @group Category - Operations related to categories.
 * @returns {Object} 200 - An object with a success message.
 * @returns {Error}  500 - Internal server error.
 */
router.post("/", CategoryController.createCategoryController);

/**
 * GET endpoint for retrieving all categories.
 *
 * @function
 * @async
 * @route {GET} /
 * @group Category - Operations related to categories.
 * @returns {Array.<Object>} 200 - An array of category objects.
 * @returns {Error}  500 - Internal server error.
 */
router.get("/", CategoryController.getCategoryController);

/**
 * PUT endpoint for updating a category by its ID.
 *
 * @function
 * @async
 * @route {PUT} /:_id
 * @group Category - Operations related to categories.
 * @param {string} _id.params.required - The ID of the category to update.
 * @returns {Object} 200 - An object with a success message.
 * @returns {Error}  500 - Internal server error.
 */
router.put("/:_id", CategoryController.updateCategoryController);

/**
 * DELETE endpoint for deleting a category by its ID.
 *
 * @function
 * @async
 * @route {DELETE} /:_id
 * @group Category - Operations related to categories.
 * @param {string} _id.params.required - The ID of the category to delete.
 * @returns {Object} 200 - An object with a success message.
 * @returns {Error}  500 - Internal server error.
 */
router.delete("/:_id", CategoryController.deleteCategoryController);

export default router;
