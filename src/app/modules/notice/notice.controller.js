import { NoticeService } from "./notice.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createNoticeController
 * @description Controller for creating a new notice.
 *
 * @param {express.Request} req - Express request object containing notice details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createNoticeController = async (req, res) => {
    const { title, fileName, fileBuffer, mimeType, adminId, db } = extractFromRequest(req, ['title', 'fileName', 'fileBuffer', 'mimeType']);
    const newNoticeDetails = { title, fileName, fileBuffer, mimeType, adminId };

    await handleServiceResponse(res, NoticeService.createNoticeService, db, newNoticeDetails);
};

/**
 * @async
 * @function getNoticeListController
 * @description Controller for fetching all notices.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getNoticeListController = async (req, res) => {
    await handleServiceResponse(res, NoticeService.getNoticeListService, req?.db);
};

/**
 * @async
 * @function getANoticeController
 * @description Controller for fetching a specific notice by ID.
 *
 * @param {express.Request} req - Express request object containing notice ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getANoticeController = async (req, res) => {
    const { fileName, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, NoticeService.getANoticeService, db, fileName);
};

/**
 * @async
 * @function deleteANoticeController
 * @description Controller for deleting a notice by ID.
 *
 * @param {express.Request} req - Express request object containing notice ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteANoticeController = async (req, res) => {
    const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

    await handleServiceResponse(res, NoticeService.deleteANoticeService, db, adminId, fileName);
};

/**
 * @namespace NoticeController
 * @description Group of controllers for handling notice operations.
 */
export const NoticeController = {
    createNoticeController,
    getNoticeListController,
    getANoticeController,
    deleteANoticeController
};
