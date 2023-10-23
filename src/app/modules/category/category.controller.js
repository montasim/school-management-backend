import { CategoryService } from "./category.service.js";

/**
 * Creates a category.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createCategoryController = async (req, res) => {
    try {
        const createCategoryServiceResponse = await CategoryService?.createCategoryService(req.db, res, "create category controller");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Retrieves a category.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getCategoryController = async (req, res) => {
    try {
        const getACategoryServiceResponse = await CategoryService?.getACategoryService(req.db, res, "get a category controller");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Updates a category.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateCategoryController = async (req, res) => {
    try {
        const updateACategoryServiceResponse = await CategoryService?.updateACategoryService(req.db, res, "update a category controller");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Deletes a category.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteCategoryController = async (req, res) => {
    try {
        const deleteACategoryServiceResponse = await CategoryService?.deleteACategoryService(req.db, res, "delete a category controller");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * @module CategoryController - Controller for category-related operations.
 */
export const CategoryController = {
    createCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
};