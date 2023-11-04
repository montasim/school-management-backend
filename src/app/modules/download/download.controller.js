import { DownloadService } from "./download.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createDownloadController
 * @description Controller for creating a new download.
 *
 * @param {express.Request} req - Express request object containing download details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createDownloadController = async (req, res) => {
    const { title, fileName, fileBuffer, mimeType, adminId, db } = extractFromRequest(req, ['title', 'fileName', 'fileBuffer', 'mimeType']);
    const newDownloadDetails = { title, fileName, fileBuffer, mimeType, adminId };

    await handleServiceResponse(res, DownloadService.createDownloadService, db, newDownloadDetails);
};

/**
 * @async
 * @function getDownloadListController
 * @description Controller for fetching all downloads.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getDownloadListController = async (req, res) => {
    await handleServiceResponse(res, DownloadService.getDownloadListService, req?.db);
};

/**
 * @async
 * @function getADownloadController
 * @description Controller for fetching a specific download by ID.
 *
 * @param {express.Request} req - Express request object containing download ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getADownloadController = async (req, res) => {
    const { fileName, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, DownloadService.getADownloadService, db, fileName);
};

/**
 * @async
 * @function deleteADownloadController
 * @description Controller for deleting a download by ID.
 *
 * @param {express.Request} req - Express request object containing download ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteADownloadController = async (req, res) => {
    const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, DownloadService.deleteADownloadService, db, adminId, fileName);
};

/**
 * @namespace DownloadController
 * @description Group of controllers for handling download operations.
 */
export const DownloadController = {
    createDownloadController,
    getDownloadListController,
    getADownloadController,
    deleteADownloadController
};
