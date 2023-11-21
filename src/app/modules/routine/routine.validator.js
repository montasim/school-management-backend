/**
 * @fileoverview Middleware Validators for Routine Data.
 *
 * This module contains middleware functions for validating routine-related data in Express routes.
 * It leverages Joi schemas defined in the RoutineValidationSchemas module to validate the format and content
 * of request bodies and parameters specific to routine operations. These validators ensure that incoming
 * data for routines adheres to the expected structure and types before further processing. Each validator
 * function is designed to be used as Express middleware, checking the validity of the data and passing control
 * to the next middleware if validation succeeds, or sending an error response if it fails.
 *
 * @requires RoutineValidationSchemas - Schemas for validating routine data.
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @module RoutineValidationService - Exported validators for routine route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { RoutineValidationSchemas } from "./routine.schema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF, MIME_TYPE_PDF } from "../../../constants/constants.js";
import validateDataWithFileSchema from "../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of an administration post against a predefined schema.
 *
 * @async
 * @function validateRoutineFile
 * @description Middleware to validate the file data using Joi schemas.
 * @param {Object} req - Express request object containing the routine file details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewRoutineDetails = await validateDataWithFileSchema(
    RoutineValidationSchemas?.newRoutineValidationSchema,
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
 * @description Middleware validator for routine's ID in request parameters.
 *
 * Uses the routineParamsSchema from the RoutineSchema to validate
 * the routine ID provided in the request parameters. This ensures that
 * the routine ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateRoutineParams = validateDataWithSchema(RoutineValidationSchemas.routineParamsValidationSchema, 'params');

/**
 * @namespace RoutineValidationService
 * @description Exported routine validators to be used in routes.
 */
export const RoutineValidationService = {
    validateNewRoutineDetails,
    validateRoutineParams,
};