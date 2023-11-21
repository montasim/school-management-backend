/**
 * @fileoverview Middleware Validators for Result Data.
 *
 * This module contains middleware functions for validating result-related data in Express routes.
 * It leverages Joi schemas defined in the ResultValidationSchemas module to validate the format and content
 * of request bodies and parameters specific to result operations. These validators ensure that incoming
 * data for results adheres to the expected structure and types before further processing. Each validator
 * function is designed to be used as Express middleware, checking the validity of the data and passing control
 * to the next middleware if validation succeeds, or sending an error response if it fails.
 *
 * @requires ResultValidationSchemas - Schemas for validating result data.
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @module ResultValidationService - Exported validators for result route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { ResultValidationSchemas } from "./result.schema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF, MIME_TYPE_PDF } from "../../../constants/constants.js";
import validateDataWithFileSchema from "../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of an administration post against a predefined schema.
 *
 * @async
 * @function validateResultFile
 * @description Middleware to validate the file data using Joi schemas.
 * @param {Object} req - Express request object containing the result file details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewResultDetails = await validateDataWithFileSchema(
    ResultValidationSchemas?.newResultValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "file",
        [FILE_EXTENSION_TYPE_PDF],
        [MIME_TYPE_PDF],
    ),
    true
);

/**
 * @function
 * @async
 * @description Middleware validator for result's ID in request parameters.
 *
 * Uses the resultParamsSchema from the ResultSchema to validate
 * the result ID provided in the request parameters. This ensures that
 * the result ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateResultParams = validateDataWithSchema(ResultValidationSchemas.resultParamsValidationSchema, 'params');

/**
 * @namespace ResultValidationService
 * @description Exported result validators to be used in routes.
 */
export const ResultValidationService = {
    validateNewResultDetails,
    validateResultParams,
};