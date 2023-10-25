import express from "express";
import { CategoryValidators } from "./category.validator.js";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

/**
 * Handle POST request to create a new category.
 * @async
 * @function createCategory
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @memberof module:categoryRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.post(
    "/",
    CategoryValidators.categoryBodyValidator,
    CategoryController.createCategoryController
);

/**
 * Handle GET request to retrieve all categories.
 * @async
 * @function getCategoryList
 * @memberof module:categoryRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/",
    CategoryController.getCategoryListController
);

/**
 * Handle GET request to retrieve a specific category by its ID.
 * @async
 * @function getACategory
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.categoryId - ID of the category to retrieve.
 * @memberof module:categoryRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/:categoryId",
    CategoryValidators.categoryParamsValidator,
    CategoryController.getACategoryController
);

/**
 * Handle PUT request to update a category by its ID.
 * @async
 * @function updateCategory
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.categoryId - ID of the category to update.
 * @memberof module:categoryRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.put(
    "/:categoryId",
    CategoryValidators.categoryParamsValidator,
    CategoryValidators.categoryBodyValidator,
    CategoryController.updateCategoryController
);

/**
 * Handle DELETE request to delete a category by its ID.
 * @async
 * @function deleteCategory
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.categoryId - ID of the category to delete.
 * @memberof module:categoryRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.delete(
    "/:categoryId",
    CategoryValidators.categoryParamsValidator,
    CategoryController.deleteCategoryController
);

/**
 * Exports the router that contains category-related routes.
 * @exports categoryRoutes
 */
export default router;
