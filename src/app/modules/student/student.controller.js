import { StatusCodes } from "http-status-codes";
import { StudentService } from "./student.service.js";

/**
 * Creates a student.
 *
 * The function processes the incoming request data to create a new student.
 * It interacts with the service layer to perform the actual creation of the student.
 * After creation, the service's response is sent back to the client.
 *
 * @async
 * @function createStudentController
 * @param {Object} req - Express request object. Contains details about the client's request, such as URL parameters, headers, and body data.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - Name of the student.
 * @param {string} req.body.requestedBy - User or entity requesting the student creation.
 * @param {Object} res - Express response object. Allows you to craft an HTTP response.
 * @returns {Object} Express response object with a status and JSON body.
 *
 * @throws Will throw an error if the service encounters an issue during student creation.
 */
const createStudentController = async (req, res) => {
    try {
        const {
            name,
            level,
            image,
            requestedBy
        } = req?.body;
        const newStudentDetails = {
            name,
            level,
            image,
            requestedBy
        };
        const createStudentServiceResponse = StudentService.createStudentService(req?.db, newStudentDetails);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
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
 * @param {?string} req.params.studentId - ID of the student (if provided in the request).
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
const getStudentListController = async (req, res) => {
    try {
        const createStudentServiceResponse = await StudentService.getStudentListService(req?.db);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a specific student based on its ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters from the request URL.
 * @param {string} req.params.studentId - ID of the student to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object containing the student details.
 *
 * @throws {Error} Throws an error if there's an issue fetching the student.
 *
 * @example
 * // Request URL: GET /student/1234
 * const student = await getAStudentController(req, res);
 */
const getAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const createStudentServiceResponse = StudentService.getAStudentService(req?.db, studentId);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Update a student based on the provided student ID and details.
 *
 * @function
 * @async
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 *
 * @property {string} req.params.studentId - The ID of the student to be updated.
 * @property {Object} req.body - The body of the request containing the details to update.
 * @property {string} req.body.name - The name of the student.
 * @property {string} req.body.requestedBy - The name of the person requesting the update.
 *
 * @returns {express.Response} res - The response object.
 * @returns {Object} res.body - The response body.
 * @returns {Object} res.body.data - The updated student details.
 * @returns {boolean} res.body.success - Indicates the success of the operation.
 * @returns {number} res.body.status - The HTTP status code.
 * @returns {string} res.body.message - A message describing the outcome of the operation.
 *
 * @throws {Error} Throws an error if there's an issue updating the student.
 */
const updateAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const {
            name,
            level,
            image,
            requestedBy
        } = req?.body;
        const newStudentDetails = {
            name,
            level,
            image,
            requestedBy
        };
        const updatedStudentServiceResponse = await StudentService.updateAStudentService(req?.db, studentId, newStudentDetails);
        const returnData = {
            data: updatedStudentServiceResponse?.data,
            success: updatedStudentServiceResponse?.success,
            status: updatedStudentServiceResponse?.status,
            message: updatedStudentServiceResponse?.message,
        };

        return res.status(updatedStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Deletes a student based on the provided student ID.
 *
 * @async
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The parameters from the URL.
 * @param {string} req.params.studentId - The ID of the student to be deleted.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.requestedBy - The entity requesting the deletion.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object containing status, data, success flag, and a message.
 *
 * @throws {Error} - Throws an error if there's an issue during deletion.
 */
const deleteAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedStudentServiceResponse = await StudentService.deleteAStudentService(req?.db, requestedBy, studentId);
        const returnData = {
            data: deletedStudentServiceResponse?.data,
            success: deletedStudentServiceResponse?.success,
            status: deletedStudentServiceResponse?.status,
            message: deletedStudentServiceResponse?.message,
        };

        return res.status(deletedStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @module StudentController - Controller for student-related operations.
 */
export const StudentController = {
    createStudentController,
    getStudentListController,
    getAStudentController,
    updateAStudentController,
    deleteAStudentController
};
