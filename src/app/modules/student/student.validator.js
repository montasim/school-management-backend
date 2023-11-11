/**
 * @fileoverview Middleware Validators for Student Post Data.
 *
 * This module contains middleware functions for validating student post data in Express routes.
 * It leverages Joi schemas defined in the StudentSchema module to validate the format and content
 * of student post-related data, such as student post IDs in request parameters. These validators ensure
 * that incoming data for student posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires StudentValidationSchemas - Schemas for validating student post data.
 * @module StudentValidationService - Exported validators for student post route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { StudentValidationSchemas } from "./student.schema.js";
import { JoiSchemaGenerators}  from "../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../constants/constants.js";

/**
 * Validates the details of a student post against a predefined schema.
 *
 * @async
 * @function validateStudentDetails
 * @description Middleware to validate the student post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the student post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateStudentDetails = await validateDataWithSchema(JoiSchemaGenerators.studentBodyValidationSchema(), 'body');

/**
 * Validates the details of a student post against a predefined schema.
 *
 * @async
 * @function validateStudentDetails
 * @description Middleware to validate the student post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the student post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateStudentFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema("image", [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], [MIME_TYPE_PNG, MIME_TYPE_JPG]), "file");

/**
 * Validates the student post ID in request parameters.
 *
 * @async
 * @function validateStudentParams
 * @description Middleware to validate the student post's ID in the request parameters.
 * @param {Object} req - Express request object containing the student post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateStudentParams = await validateDataWithSchema(StudentValidationSchemas.studentParamsValidationSchema, 'params');

/**
 * @namespace StudentValidationService
 * @description Provides validation services for student-related data in routes. This includes validation for student details, student files, and student parameters.
 */
export const StudentValidationService = {
    validateStudentDetails,
    validateStudentFile,
    validateStudentParams,
};