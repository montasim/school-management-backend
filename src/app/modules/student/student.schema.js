import Joi from "joi";
import { ID_CONSTANTS, IMAGE_PATTERN } from './student.constants.js';
import createIdSchema from "../../../helpers/createIdSchema.js";

const studentParamsSchema = Joi.object({
    studentId: createIdSchema(ID_CONSTANTS?.STUDENT_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for student's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const studentBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    level: Joi.string().min(2).max(20).required(),
    image: Joi.string().pattern(IMAGE_PATTERN).required(),
});

/**
 * @namespace StudentSchema
 * @description Exported Joi validation schemas for student data.
 *
 * - `studentBodySchema`: Validates the body data of a student.
 * - `studentParamsSchema`: Validates the student ID in request parameters.
 * - `deleteStudentQuerySchema`: Validates the admin ID in the query.
 */
export const StudentSchema = {
    studentBodySchema,
    studentParamsSchema,
};