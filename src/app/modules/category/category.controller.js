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
        const createCategoryServiceResponse = await CategoryService.createCategoryService(req?.db, newCategoryDetails);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
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
        const createCategoryServiceResponse = await CategoryService.getCategoryListService(req?.db);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
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
        const createCategoryServiceResponse = await CategoryService.getACategoryService(req?.db, categoryId);
        const returnData = {
            data: createCategoryServiceResponse?.data,
            success: createCategoryServiceResponse?.success,
            status: createCategoryServiceResponse?.status,
            message: createCategoryServiceResponse?.message,
        };

        return res.status(createCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Update a category based on the provided category ID and details.
 *
 * @function
 * @async
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 *
 * @property {string} req.params.categoryId - The ID of the category to be updated.
 * @property {Object} req.body - The body of the request containing the details to update.
 * @property {string} req.body.name - The name of the category.
 * @property {string} req.body.requestedBy - The name of the person requesting the update.
 *
 * @returns {express.Response} res - The response object.
 * @returns {Object} res.body - The response body.
 * @returns {Object} res.body.data - The updated category details.
 * @returns {boolean} res.body.success - Indicates the success of the operation.
 * @returns {number} res.body.status - The HTTP status code.
 * @returns {string} res.body.message - A message describing the outcome of the operation.
 *
 * @throws {Error} Throws an error if there's an issue updating the category.
 */
const updateACategoryController = async (req, res) => {
    try {
        const { categoryId } = req?.params;
        const {
            name,
            requestedBy
        } = req?.body;
        const newCategoryDetails = {
            name,
            requestedBy
        };
        const updatedCategoryServiceResponse = await CategoryService.updateACategoryService(req?.db, categoryId, newCategoryDetails);
        const returnData = {
            data: updatedCategoryServiceResponse?.data,
            success: updatedCategoryServiceResponse?.success,
            status: updatedCategoryServiceResponse?.status,
            message: updatedCategoryServiceResponse?.message,
        };

        return res.status(updatedCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Deletes a category based on the provided category ID.
 *
 * @async
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The parameters from the URL.
 * @param {string} req.params.categoryId - The ID of the category to be deleted.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.requestedBy - The entity requesting the deletion.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object containing status, data, success flag, and a message.
 *
 * @throws {Error} - Throws an error if there's an issue during deletion.
 */
const deleteACategoryController = async (req, res) => {
    try {
        const { categoryId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedCategoryServiceResponse = await CategoryService.deleteACategoryService(req?.db, requestedBy, categoryId);
        const returnData = {
            data: deletedCategoryServiceResponse?.data,
            success: deletedCategoryServiceResponse?.success,
            status: deletedCategoryServiceResponse?.status,
            message: deletedCategoryServiceResponse?.message,
        };

        return res.status(deletedCategoryServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @module CategoryController - Controller for category-related operations.
 */
export const CategoryController = {
    createCategoryController,
    getCategoryListController,
    getACategoryController,
    updateACategoryController,
    deleteACategoryController
};