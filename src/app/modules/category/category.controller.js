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
 * Retrieves a category.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getCategoryController = async (req, res) => {
    try {
        const getACategoryServiceResponse = await CategoryService.getACategoryService(req.db, res, "get a category controller");
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
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
};