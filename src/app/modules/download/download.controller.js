import { StatusCodes } from "http-status-codes";
import { DownloadService } from "./download.service.js";

/**
 * @function createDownloadController
 * Handles the creation of a new download.
 * @async
 * @param {object} req - The request object containing the database instance, file data and body parameters.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const createDownloadController = async (req, res) => {
    try {
        const { requestedBy } = req?.body;
        const createDownloadServiceResponse = await DownloadService.createDownloadService(req.db, requestedBy, req.file);

        const returnData = {
            data: createDownloadServiceResponse?.data,
            success: createDownloadServiceResponse?.success,
            status: createDownloadServiceResponse?.status,
            message: createDownloadServiceResponse?.message,
        };

        return res.status(createDownloadServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function getDownloadListController
 * Retrieves a list of downloads.
 * @async
 * @param {object} req - The request object containing the database instance.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getDownloadListController = async (req, res) => {
    try {
        const getDownloadServiceListResponse = await DownloadService.getDownloadListService(req.db);

        const returnData = {
            data: getDownloadServiceListResponse?.data,
            success: getDownloadServiceListResponse?.success,
            status: getDownloadServiceListResponse?.status,
            message: getDownloadServiceListResponse?.message,
        };

        return res.status(getDownloadServiceListResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function getADownloadController
 * Retrieves a specific download based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getADownloadController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const getADownloadServiceResponse = await DownloadService.getADownloadService(req.db, fileName);

        const returnData = {
            data: getADownloadServiceResponse?.data,
            success: getADownloadServiceResponse?.success,
            status: getADownloadServiceResponse?.status,
            message: getADownloadServiceResponse?.message,
        };

        return res.status(getADownloadServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @function deleteADownloadController
 * Deletes a specific download based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance, query and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const deleteADownloadController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const { requestedBy } = req?.query;

        const deletedDownloadServiceResponse = await DownloadService.deleteADownloadService(req.db, requestedBy, fileName);

        const returnData = {
            data: deletedDownloadServiceResponse?.data,
            success: deletedDownloadServiceResponse?.success,
            status: deletedDownloadServiceResponse?.status,
            message: deletedDownloadServiceResponse?.message,
        };

        return res.status(deletedDownloadServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

export const DownloadController = {
    createDownloadController,
    getDownloadListController,
    getADownloadController,
    deleteADownloadController
};