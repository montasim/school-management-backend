import express from "express";
import { StudentValidators } from "./student.validator.js";
import { StudentController } from "./student.controller.js";

const router = express.Router();

/**
 * Handle POST request to create a new student.
 * @async
 * @function createStudent
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @memberof module:studentRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.post(
    "/",
    StudentValidators.studentBodyValidator,
    StudentController.createStudentController
);

/**
 * Handle GET request to retrieve all categories.
 * @async
 * @function getStudentList
 * @memberof module:studentRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/",
    StudentController.getStudentListController
);

/**
 * Handle GET request to retrieve a specific student by its ID.
 * @async
 * @function getAStudent
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.studentId - ID of the student to retrieve.
 * @memberof module:studentRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/:studentId",
    StudentValidators.studentParamsValidator,
    StudentController.getAStudentController
);

/**
 * Handle PUT request to update a student by its ID.
 * @async
 * @function updateStudent
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.studentId - ID of the student to update.
 * @memberof module:studentRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.put(
    "/:studentId",
    StudentValidators.studentParamsValidator,
    StudentValidators.studentBodyValidator,
    StudentController.updateAStudentController
);

/**
 * Handle DELETE request to delete a student by its ID.
 * @async
 * @function deleteStudent
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.studentId - ID of the student to delete.
 * @memberof module:studentRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.delete(
    "/:studentId",
    StudentValidators.studentParamsValidator,
    StudentValidators.deleteStudentQueryValidator,
    StudentController.deleteAStudentController
);

/**
 * Exports the router that contains student-related routes.
 * @exports studentRoutes
 */
export default router;
