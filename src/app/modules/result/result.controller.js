import { ResultService } from "./result.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createResultController
 * @description Controller for creating a new result.
 *
 * @param {express.Request} req - Express request object containing result details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createResultController = async (req, res) => {
    const { title, fileName, fileBuffer, mimeType, adminId, db } = extractFromRequest(req, ['title', 'fileName', 'fileBuffer', 'mimeType']);
    const newResultDetails = { title, fileName, fileBuffer, mimeType, adminId };

    await handleServiceResponse(res, ResultService.createResultService, db, newResultDetails);
};

/**
 * @async
 * @function getResultListController
 * @description Controller for fetching all results.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getResultListController = async (req, res) => {
    await handleServiceResponse(res, ResultService.getResultListService, req?.db);
};

/**
 * @async
 * @function getAResultController
 * @description Controller for fetching a specific result by ID.
 *
 * @param {express.Request} req - Express request object containing result ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAResultController = async (req, res) => {
    const { fileName, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, ResultService.getAResultService, db, fileName);
};

/**
 * @async
 * @function deleteAResultController
 * @description Controller for deleting a result by ID.
 *
 * @param {express.Request} req - Express request object containing result ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAResultController = async (req, res) => {
    const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, ResultService.deleteAResultService, db, adminId, fileName);
};

/**
 * @namespace ResultController
 * @description Group of controllers for handling result operations.
 */
export const ResultController = {
    createResultController,
    getResultListController,
    getAResultController,
    deleteAResultController
};
