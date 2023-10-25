import { StatusCodes } from "http-status-codes";
import { CategoryService } from "./category.service.js";

/**
 * Creates a category.
 *
 * The function processes the incoming request data to create a new category.
 * It interacts with the service layer to perform the actual creation of the category.
 * After creation, the service's response is sent back to the client.
 *
 * @async
 * @function createCategoryController
 * @param {Object} req - Express request object. Contains details about the client's request, such as URL parameters, headers, and body data.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - Name of the category.
 * @param {string} req.body.requestedBy - User or entity requesting the category creation.
 * @param {Object} res - Express response object. Allows you to craft an HTTP response.
 * @returns {Object} Express response object with a status and JSON body.
 *
 * @throws Will throw an error if the service encounters an issue during category creation.
 */
const createCategoryController = async (req, res) => {
    try {
        const {
            name,
            requestedBy
        } = req?.body;
        const newCategoryDetails = {
            name,
            requestedBy
        };
        const createCategoryServiceResponse = await CategoryService.createCategoryService(req.db, newCategoryDetails);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a list of categories.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {?string} req.params.categoryId - ID of the category (if provided in the request).
 * @param {Object} req.db - Database connection or instance.
 * @param {Object} res - Express response object.
 *
 * @returns {Object} res - Express response object.
 * @returns {Object} res.data - The list of categories.
 * @returns {boolean} res.success - Success flag.
 * @returns {number} res.status - HTTP status code.
 * @returns {string} res.message - Response message.
 *
 * @throws {Error} Throws an error if any occurs during execution.
 */
const getCategoryListController = async (req, res) => {
    try {
        const { categoryId } = req?.params;
        const createCategoryServiceResponse = await CategoryService.getCategoryListService(req.db);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a specific category based on its ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters from the request URL.
 * @param {string} req.params.categoryId - ID of the category to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object containing the category details.
 *
 * @throws {Error} Throws an error if there's an issue fetching the category.
 *
 * @example
 * // Request URL: GET /category/1234
 * const category = await getACategoryController(req, res);
 */
const getACategoryController = async (req, res) => {
    try {
        const { categoryId } = req?.params;
        const createCategoryServiceResponse = await CategoryService.getACategoryService(req.db, categoryId);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
        const updateACategoryServiceResponse = await CategoryService.updateACategoryService(req.db, res, "update a category controller");
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
        const deleteACategoryServiceResponse = await CategoryService.deleteACategoryService(req.db, res, "delete a category controller");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * @module CategoryController - Controller for category-related operations.
 */
export const CategoryController = {
    createCategoryController,
    getCategoryListController,
    getACategoryController,
    updateCategoryController,
    deleteCategoryController
};