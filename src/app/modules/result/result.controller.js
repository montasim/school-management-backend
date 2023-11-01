import { ResultService } from "./result.service.js";

/**
 * @function createResultController
 * Handles the creation of a new result.
 * @async
 * @param {object} req - The request object containing the database instance, file data and body parameters.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const createResultController = async (req, res) => {
    try {
        const {
            title,
            adminId
        } = req?.body;
        const newResultDetails = {
            title,
            adminId
        };
        const createResultServiceResponse = await ResultService.createResultService(req?.db, newResultDetails, req.file);

        const returnData = {
            data: createResultServiceResponse?.data,
            success: createResultServiceResponse?.success,
            status: createResultServiceResponse?.status,
            message: createResultServiceResponse?.message,
        };

        return res.status(createResultServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function getResultListController
 * Retrieves a list of results.
 * @async
 * @param {object} req - The request object containing the database instance.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getResultListController = async (req, res) => {
    try {
        const getResultServiceListResponse = await ResultService.getResultListService(req?.db);

        const returnData = {
            data: getResultServiceListResponse?.data,
            success: getResultServiceListResponse?.success,
            status: getResultServiceListResponse?.status,
            message: getResultServiceListResponse?.message,
        };

        return res.status(getResultServiceListResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function getAResultController
 * Retrieves a specific result based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getAResultController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const getAResultServiceResponse = await ResultService.getAResultService(req?.db, fileName);

        const returnData = {
            data: getAResultServiceResponse?.data,
            success: getAResultServiceResponse?.success,
            status: getAResultServiceResponse?.status,
            message: getAResultServiceResponse?.message,
        };

        return res.status(getAResultServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function deleteAResultController
 * Deletes a specific result based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance, query and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const deleteAResultController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const { adminId } = req?.query;

        const deletedResultServiceResponse = await ResultService.deleteAResultService(req?.db, adminId, fileName);

        const returnData = {
            data: deletedResultServiceResponse?.data,
            success: deletedResultServiceResponse?.success,
            status: deletedResultServiceResponse?.status,
            message: deletedResultServiceResponse?.message,
        };

        return res.status(deletedResultServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const ResultController = {
    createResultController,
    getResultListController,
    getAResultController,
    deleteAResultController
};