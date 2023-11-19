import { LevelService } from "./level.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createLevelController
 * @description Controller for creating a new level.
 *
 * @param {express.Request} req - Express request object containing level details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createLevelController = async (req, res) => {
    try {
        const { name, adminId, db } = extractFromRequest(req, ['name']);
        const newLevel = { name, adminId };

        await handleServiceResponse(res, LevelService.createLevelService, db, newLevel);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getLevelListController
 * @description Controller for fetching all level.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getLevelListController = async (req, res) => {
    try {
        await handleServiceResponse(res, LevelService.getLevelListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getALevelController
 * @description Controller for fetching a specific level by ID.
 *
 * @param {express.Request} req - Express request object containing level ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getALevelController = async (req, res) => {
    try {
        const { levelId, db } = extractFromRequest(req, [], ['levelId']);

        await handleServiceResponse(res, LevelService.getALevelService, db, levelId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateALevelController
 * @description Controller for updating a specific level by ID.
 *
 * @param {express.Request} req - Express request object containing level ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateALevelController = async (req, res) => {
    try {
        const { levelId, name, adminId, db } = extractFromRequest(req, ['name'], ['levelId']);
        const updatedLevelDetails = { name, adminId };

        await handleServiceResponse(res, LevelService.updateALevelService, db, levelId, updatedLevelDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteALevelController
 * @description Controller for deleting a level by ID.
 *
 * @param {express.Request} req - Express request object containing level ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteALevelController = async (req, res) => {
    try {
        const { levelId, adminId, db } = extractFromRequest(req, [], ['levelId']);

        await handleServiceResponse(res, LevelService.deleteALevelService, db, adminId, levelId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace LevelController
 * @description Group of controllers for handling level operations.
 */
export const LevelController = {
    createLevelController,
    getLevelListController,
    getALevelController,
    updateALevelController,
    deleteALevelController
};
