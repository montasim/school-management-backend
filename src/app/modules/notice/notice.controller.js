import { StatusCodes } from "http-status-codes";
import { NoticeService } from "./notice.service.js";

/**
 * @function createNoticeController
 * Handles the creation of a new notice.
 * @async
 * @param {object} req - The request object containing the database instance, file data and body parameters.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const createNoticeController = async (req, res) => {
    try {
        const {
            title,
            requestedBy
        } = req?.body;
        const newNoticeDetails = {
            title,
            requestedBy
        };
        const createNoticeServiceResponse = await NoticeService.createNoticeService(req?.db, newNoticeDetails, req.file);

        const returnData = {
            data: createNoticeServiceResponse?.data,
            success: createNoticeServiceResponse?.success,
            status: createNoticeServiceResponse?.status,
            message: createNoticeServiceResponse?.message,
        };

        return res.status(createNoticeServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function getNoticeListController
 * Retrieves a list of notices.
 * @async
 * @param {object} req - The request object containing the database instance.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getNoticeListController = async (req, res) => {
    try {
        const getNoticeServiceListResponse = await NoticeService.getNoticeListService(req?.db);

        const returnData = {
            data: getNoticeServiceListResponse?.data,
            success: getNoticeServiceListResponse?.success,
            status: getNoticeServiceListResponse?.status,
            message: getNoticeServiceListResponse?.message,
        };

        return res.status(getNoticeServiceListResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function getANoticeController
 * Retrieves a specific notice based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getANoticeController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const getANoticeServiceResponse = await NoticeService.getANoticeService(req?.db, fileName);

        const returnData = {
            data: getANoticeServiceResponse?.data,
            success: getANoticeServiceResponse?.success,
            status: getANoticeServiceResponse?.status,
            message: getANoticeServiceResponse?.message,
        };

        return res.status(getANoticeServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function deleteANoticeController
 * Deletes a specific notice based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance, query and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const deleteANoticeController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const { requestedBy } = req?.query;

        const deletedNoticeServiceResponse = await NoticeService.deleteANoticeService(req?.db, requestedBy, fileName);

        const returnData = {
            data: deletedNoticeServiceResponse?.data,
            success: deletedNoticeServiceResponse?.success,
            status: deletedNoticeServiceResponse?.status,
            message: deletedNoticeServiceResponse?.message,
        };

        return res.status(deletedNoticeServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

export const NoticeController = {
    createNoticeController,
    getNoticeListController,
    getANoticeController,
    deleteANoticeController
};