import Joi from "joi";

/**
 * Regular expression pattern for different student ID prefixes.
 * @constant {RegExp}
 */
const studentIdPattern = /^(student)-\w+$/;

/**
 * Joi schema for validating student IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(studentIdPattern).min(9).max(30);

/**
 * Joi schema for validating the creation of a new student.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const studentBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    level: Joi.string().min(2).max(20).required(),
    image: Joi.string().pattern(/\/image\/student\/[a-zA-Z0-9]+\.gif$/).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a student by its ID.
 * @constant {Object}
 */
const studentParamsSchema = idSchema.required();

/**
 * Joi schema to validate the delete student query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches either 'admin' or 'user'. This schema is used primarily to
 * determine the role or type of user attempting to delete a student.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteStudentQuerySchema = Joi.string().valid('admin', 'user').required();

/**
 * Collection of student-related Joi validation schemas.
 * @namespace StudentSchema
 * @type {Object}
 */
export const StudentSchema = {
    studentBodySchema,
    studentParamsSchema,
    deleteStudentQuerySchema,
};
