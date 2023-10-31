import { CategoryService } from "./category.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createCategoryController
 * @description Controller for creating a new category.
 *
 * @param {express.Request} req - Express request object containing category details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createCategoryController = async (req, res) => {
    const { name, requestedBy, db } = extractFromRequest(req, ['name']);
    const newCategory = { name, requestedBy };

    await handleServiceResponse(res, CategoryService.createCategoryService, db, newCategory);
};

/**
 * @async
 * @function getCategoryListController
 * @description Controller for fetching all category.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getCategoryListController = async (req, res) => {
    await handleServiceResponse(res, CategoryService.getCategoryListService, req?.db);
};

/**
 * @async
 * @function getACategoryController
 * @description Controller for fetching a specific category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getACategoryController = async (req, res) => {
    const { categoryId, db } = extractFromRequest(req, [], ['categoryId']);

    await handleServiceResponse(res, CategoryService.getACategoryService, db, categoryId);
};

/**
 * @async
 * @function updateACategoryController
 * @description Controller for updating a specific category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateACategoryController = async (req, res) => {
    const { categoryId, name, requestedBy, db } = extractFromRequest(req, ['name'], ['categoryId']);
    const updatedCategoryDetails = { name, requestedBy };

    await handleServiceResponse(res, CategoryService.updateACategoryService, db, categoryId, updatedCategoryDetails);
};

/**
 * @async
 * @function deleteACategoryController
 * @description Controller for deleting a category by ID.
 *
 * @param {express.Request} req - Express request object containing category ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteACategoryController = async (req, res) => {
    const { categoryId, requestedBy, db } = extractFromRequest(req, [], ['categoryId']);

    await handleServiceResponse(res, CategoryService.deleteACategoryService, db, requestedBy, categoryId);
};

/**
 * @namespace CategoryController
 * @description Group of controllers for handling category operations.
 */
export const CategoryController = {
    createCategoryController,
    getCategoryListController,
    getACategoryController,
    updateACategoryController,
    deleteACategoryController
};
