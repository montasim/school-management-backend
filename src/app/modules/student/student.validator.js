import { StudentSchema } from "./student.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for student's body data.
 *
 * Uses the studentBodySchema from the StudentSchema to validate
 * the body of the incoming request. This ensures that the student's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const studentBodyValidator = validateWithSchema(StudentSchema.studentBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for student's ID in request parameters.
 *
 * Uses the studentParamsSchema from the StudentSchema to validate
 * the student ID provided in the request parameters. This ensures that
 * the student ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const studentParamsValidator = await validateWithSchema(StudentSchema.studentParamsSchema, 'params.studentId');

/**
 * @namespace StudentValidators
 * @description Exported student validators to be used in routes.
 */
export const StudentValidators = {
    studentBodyValidator,
    studentParamsValidator,
};
