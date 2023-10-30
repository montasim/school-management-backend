import { StudentService } from "./student.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createStudentController
 * @description Controller for creating a new student.
 *
 * @param {express.Request} req - Express request object containing student details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createStudentController = async (req, res) => {
    const { name, level, image, requestedBy, db } = extractFromRequest(req, ['name', 'level', 'image']);
    const newStudent = { name, level, image, requestedBy };

    await handleServiceResponse(res, StudentService.createStudentService, db, newStudent);
};

/**
 * @async
 * @function getStudentListController
 * @description Controller for fetching all students.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getStudentListController = async (req, res) => {
    await handleServiceResponse(res, StudentService.getStudentListService, req.db);
};

/**
 * @async
 * @function getAStudentController
 * @description Controller for fetching a specific student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAStudentController = async (req, res) => {
    const { studentId, db } = extractFromRequest(req, [], ['studentId']);

    await handleServiceResponse(res, StudentService.getAStudentService, db, studentId);
};

/**
 * @async
 * @function getAStudentController
 * @description Controller for fetching a specific student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAStudentController = async (req, res) => {
    const { studentId, name, level, image, requestedBy, db } = extractFromRequest(req, ['name', 'level', 'image'], ['studentId']);
    const updatedStudentDetails = { name, level, image, requestedBy };

    await handleServiceResponse(res, StudentService.updateAStudentService, db, studentId, updatedStudentDetails);
};

/**
 * @async
 * @function deleteAStudentController
 * @description Controller for deleting a student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAStudentController = async (req, res) => {
    const { studentId, requestedBy, db } = extractFromRequest(req, [], ['studentId']);

    await handleServiceResponse(res, StudentService.deleteAStudentService, db, requestedBy, studentId);
};

/**
 * @namespace StudentController
 * @description Group of controllers for handling student operations.
 */
export const StudentController = {
    createStudentController,
    getStudentListController,
    getAStudentController,
    updateAStudentController,
    deleteAStudentController
};
