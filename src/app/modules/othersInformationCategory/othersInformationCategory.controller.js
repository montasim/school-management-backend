import { OthersInformationCategoryService } from "./othersInformationCategory.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createOthersInformationCategory
 * @description  for creating a new othersInformationCategory.
 *
 * @param {express.Request} req - Express request object containing othersInformationCategory details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createOthersInformationCategory = async (req, res) => {
    try {
        const { name, adminId, db } = extractFromRequest(req, ['name']);
        const newOthersInformationCategory = { name, adminId };

        await handleServiceResponse(res, OthersInformationCategoryService.createOthersInformationCategory, db, newOthersInformationCategory);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getOthersInformationCategoryList
 * @description  for fetching all othersInformationCategory.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getOthersInformationCategoryList = async (req, res) => {
    try {
        await handleServiceResponse(res, OthersInformationCategoryService.getOthersInformationCategoryList, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAOthersInformationCategory
 * @description  for fetching a specific othersInformationCategory by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformationCategory ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAOthersInformationCategory = async (req, res) => {
    try {
        const { othersInformationCategoryId, db } = extractFromRequest(req, [], ['othersInformationCategoryId']);

        await handleServiceResponse(res, OthersInformationCategoryService.getAOthersInformationCategory, db, othersInformationCategoryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAOthersInformationCategory
 * @description  for updating a specific othersInformationCategory by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformationCategory ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAOthersInformationCategory = async (req, res) => {
    try {
        const { othersInformationCategoryId, name, adminId, db } = extractFromRequest(req, ['name'], ['othersInformationCategoryId']);
        const updatedOthersInformationCategoryDetails = { name, adminId };

        await handleServiceResponse(res, OthersInformationCategoryService.updateAOthersInformationCategory, db, othersInformationCategoryId, updatedOthersInformationCategoryDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAOthersInformationCategory
 * @description  for deleting a othersInformationCategory by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformationCategory ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAOthersInformationCategory = async (req, res) => {
    try {
        const { othersInformationCategoryId, adminId, db } = extractFromRequest(req, [], ['othersInformationCategoryId']);

        await handleServiceResponse(res, OthersInformationCategoryService.deleteAOthersInformationCategory, db, adminId, othersInformationCategoryId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace OthersInformationCategoryController
 * @description Group of controllers for handling othersInformationCategory operations.
 */
export const OthersInformationCategoryController = {
    createOthersInformationCategory,
    getOthersInformationCategoryList,
    getAOthersInformationCategory,
    updateAOthersInformationCategory,
    deleteAOthersInformationCategory
};
