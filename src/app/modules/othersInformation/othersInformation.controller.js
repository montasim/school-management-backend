import { OthersInformationService } from "./othersInformation.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createOthersInformationController
 * @description Controller for creating a new othersInformation.
 *
 * @param {express.Request} req - Express request object containing othersInformation details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createOthersInformationController = async (req, res) => {
    try {
        const { title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description']);
        const newOthersInformation = { title, category, description, adminId };

        await handleServiceResponse(res, OthersInformationService.createOthersInformationService, db, newOthersInformation);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getOthersInformationListController
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getOthersInformationListController = async (req, res) => {
    try {
        await handleServiceResponse(res, OthersInformationService.getOthersInformationListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAOthersInformationController
 * @description Controller for fetching a specific othersInformation by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAOthersInformationController = async (req, res) => {
    try {
        const { othersInformationId, db } = extractFromRequest(req, [], ['othersInformationId']);

        await handleServiceResponse(res, OthersInformationService.getAOthersInformationService, db, othersInformationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAOthersInformationController
 * @description Controller for updating a specific othersInformation by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAOthersInformationController = async (req, res) => {
    try {
        const { othersInformationId, title, category, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'description'], ['othersInformationId']);
        const updatedOthersInformationDetails = { title, category, description, adminId };

        await handleServiceResponse(res, OthersInformationService.updateAOthersInformationService, db, othersInformationId, updatedOthersInformationDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAOthersInformationController
 * @description Controller for deleting a othersInformation by ID.
 *
 * @param {express.Request} req - Express request object containing othersInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAOthersInformationController = async (req, res) => {
    try {
        const { othersInformationId, adminId, db } = extractFromRequest(req, [], ['othersInformationId']);

        await handleServiceResponse(res, OthersInformationService.deleteAOthersInformationService, db, adminId, othersInformationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace OthersInformationController
 * @description Group of controllers for handling othersInformation operations.
 */
export const OthersInformationController = {
    createOthersInformationController,
    getOthersInformationListController,
    getAOthersInformationController,
    updateAOthersInformationController,
    deleteAOthersInformationController
};
