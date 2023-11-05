import { RoutineService } from "./routine.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createRoutineController
 * @description Controller for creating a new routine.
 *
 * @param {express.Request} req - Express request object containing routine details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createRoutineController = async (req, res) => {
    const { title, fileName, fileBuffer, mimeType, adminId, db } = extractFromRequest(req, ['title', 'fileName', 'fileBuffer', 'mimeType']);
    const newRoutineDetails = { title, fileName, fileBuffer, mimeType, adminId };

    await handleServiceResponse(res, RoutineService.createRoutineService, db, newRoutineDetails);
};

/**
 * @async
 * @function getRoutineListController
 * @description Controller for fetching all routines.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getRoutineListController = async (req, res) => {
    await handleServiceResponse(res, RoutineService.getRoutineListService, req?.db);
};

/**
 * @async
 * @function getARoutineController
 * @description Controller for fetching a specific routine by ID.
 *
 * @param {express.Request} req - Express request object containing routine ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getARoutineController = async (req, res) => {
    const { fileName, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, RoutineService.getARoutineService, db, fileName);
};

/**
 * @async
 * @function deleteARoutineController
 * @description Controller for deleting a routine by ID.
 *
 * @param {express.Request} req - Express request object containing routine ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteARoutineController = async (req, res) => {
    const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, RoutineService.deleteARoutineService, db, adminId, fileName);
};

/**
 * @namespace RoutineController
 * @description Group of controllers for handling routine operations.
 */
export const RoutineController = {
    createRoutineController,
    getRoutineListController,
    getARoutineController,
    deleteARoutineController
};
