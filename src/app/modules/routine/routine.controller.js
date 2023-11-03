import { RoutineService } from "./routine.service.js";

/**
 * @function createRoutineController
 * Handles the creation of a new routine.
 * @async
 * @param {object} req - The request object containing the database instance, file data and body parameters.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const createRoutineController = async (req, res) => {
    try {
        const {
            title,
            adminId
        } = req?.body;
        const newRoutineDetails = {
            title,
            adminId
        };
        const createRoutineServiceResponse = await RoutineService.createRoutineService(req?.db, newRoutineDetails, req.file);

        const returnData = {
            data: createRoutineServiceResponse?.data,
            success: createRoutineServiceResponse?.success,
            status: createRoutineServiceResponse?.status,
            message: createRoutineServiceResponse?.message,
        };

        return res.status(createRoutineServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function getRoutineListController
 * Retrieves a list of routines.
 * @async
 * @param {object} req - The request object containing the database instance.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getRoutineListController = async (req, res) => {
    try {
        const getRoutineServiceListResponse = await RoutineService.getRoutineListService(req?.db);

        const returnData = {
            data: getRoutineServiceListResponse?.data,
            success: getRoutineServiceListResponse?.success,
            status: getRoutineServiceListResponse?.status,
            message: getRoutineServiceListResponse?.message,
        };

        return res.status(getRoutineServiceListResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function getARoutineController
 * Retrieves a specific routine based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const getARoutineController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const getARoutineServiceResponse = await RoutineService.getARoutineService(req?.db, fileName);

        const returnData = {
            data: getARoutineServiceResponse?.data,
            success: getARoutineServiceResponse?.success,
            status: getARoutineServiceResponse?.status,
            message: getARoutineServiceResponse?.message,
        };

        return res.status(getARoutineServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @function deleteARoutineController
 * Deletes a specific routine based on the file name.
 * @async
 * @param {object} req - The request object containing the database instance, query and params.
 * @param {object} res - The response object.
 * @returns {object} JSON response with data, success, status, and message.
 */
const deleteARoutineController = async (req, res) => {
    try {
        const { fileName } = req?.params;
        const { adminId } = req?.query;

        const deletedRoutineServiceResponse = await RoutineService.deleteARoutineService(req?.db, adminId, fileName);

        const returnData = {
            data: deletedRoutineServiceResponse?.data,
            success: deletedRoutineServiceResponse?.success,
            status: deletedRoutineServiceResponse?.status,
            message: deletedRoutineServiceResponse?.message,
        };

        return res.status(deletedRoutineServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const RoutineController = {
    createRoutineController,
    getRoutineListController,
    getARoutineController,
    deleteARoutineController
};