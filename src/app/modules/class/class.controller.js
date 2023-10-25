import { StatusCodes } from "http-status-codes";
import { ClassService } from "./class.service.js";

/**
 * Creates a class.
 *
 * The function processes the incoming request data to create a new class.
 * It interacts with the service layer to perform the actual creation of the class.
 * After creation, the service's response is sent back to the client.
 *
 * @async
 * @function createClassController
 * @param {Object} req - Express request object. Contains details about the client's request, such as URL parameters, headers, and body data.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - Name of the class.
 * @param {string} req.body.requestedBy - User or entity requesting the class creation.
 * @param {Object} res - Express response object. Allows you to craft an HTTP response.
 * @returns {Object} Express response object with a status and JSON body.
 *
 * @throws Will throw an error if the service encounters an issue during class creation.
 */
const createClassController = async (req, res) => {
    try {
        const {
            name,
            requestedBy
        } = req?.body;
        const newClassDetails = {
            name,
            requestedBy
        };
        const createClassServiceResponse = await ClassService.createClassService(req.db, newClassDetails);
        const returnData = {
            data: createClassServiceResponse?.data,
            success: createClassServiceResponse?.success,
            status: createClassServiceResponse?.status,
            message: createClassServiceResponse?.message,
        };

        return res.status(createClassServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a list of categories.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {?string} req.params.classId - ID of the class (if provided in the request).
 * @param {Object} req.db - Database connection or instance.
 * @param {Object} res - Express response object.
 *
 * @returns {Object} res - Express response object.
 * @returns {Object} res.data - The list of categories.
 * @returns {boolean} res.success - Success flag.
 * @returns {number} res.status - HTTP status code.
 * @returns {string} res.message - Response message.
 *
 * @throws {Error} Throws an error if any occurs during execution.
 */
const getClassListController = async (req, res) => {
    try {
        const { classId } = req?.params;
        const createClassServiceResponse = await ClassService.getClassListService(req.db);
        const returnData = {
            data: createClassServiceResponse?.data,
            success: createClassServiceResponse?.success,
            status: createClassServiceResponse?.status,
            message: createClassServiceResponse?.message,
        };

        return res.status(createClassServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a specific class based on its ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters from the request URL.
 * @param {string} req.params.classId - ID of the class to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object containing the class details.
 *
 * @throws {Error} Throws an error if there's an issue fetching the class.
 *
 * @example
 * // Request URL: GET /class/1234
 * const class = await getAClassController(req, res);
 */
const getAClassController = async (req, res) => {
    try {
        const { classId } = req?.params;
        const createClassServiceResponse = await ClassService.getAClassService(req.db, classId);
        const returnData = {
            data: createClassServiceResponse?.data,
            success: createClassServiceResponse?.success,
            status: createClassServiceResponse?.status,
            message: createClassServiceResponse?.message,
        };

        return res.status(createClassServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Update a class based on the provided class ID and details.
 *
 * @function
 * @async
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 *
 * @property {string} req.params.classId - The ID of the class to be updated.
 * @property {Object} req.body - The body of the request containing the details to update.
 * @property {string} req.body.name - The name of the class.
 * @property {string} req.body.requestedBy - The name of the person requesting the update.
 *
 * @returns {express.Response} res - The response object.
 * @returns {Object} res.body - The response body.
 * @returns {Object} res.body.data - The updated class details.
 * @returns {boolean} res.body.success - Indicates the success of the operation.
 * @returns {number} res.body.status - The HTTP status code.
 * @returns {string} res.body.message - A message describing the outcome of the operation.
 *
 * @throws {Error} Throws an error if there's an issue updating the class.
 */
const updateAClassController = async (req, res) => {
    try {
        const { classId } = req?.params;
        const {
            name,
            requestedBy
        } = req?.body;
        const newClassDetails = {
            name,
            requestedBy
        };
        const updatedClassServiceResponse = await ClassService.updateAClassService(req.db, classId, newClassDetails);
        const returnData = {
            data: updatedClassServiceResponse?.data,
            success: updatedClassServiceResponse?.success,
            status: updatedClassServiceResponse?.status,
            message: updatedClassServiceResponse?.message,
        };

        return res.status(updatedClassServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Deletes a class based on the provided class ID.
 *
 * @async
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The parameters from the URL.
 * @param {string} req.params.classId - The ID of the class to be deleted.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.requestedBy - The entity requesting the deletion.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object containing status, data, success flag, and a message.
 *
 * @throws {Error} - Throws an error if there's an issue during deletion.
 */
const deleteAClassController = async (req, res) => {
    try {
        const { classId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedClassServiceResponse = await ClassService.deleteAClassService(req.db, requestedBy, classId);
        const returnData = {
            data: deletedClassServiceResponse?.data,
            success: deletedClassServiceResponse?.success,
            status: deletedClassServiceResponse?.status,
            message: deletedClassServiceResponse?.message,
        };

        return res.status(deletedClassServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @module ClassController - Controller for class-related operations.
 */
export const ClassController = {
    createClassController,
    getClassListController,
    getAClassController,
    updateAClassController,
    deleteAClassController
};