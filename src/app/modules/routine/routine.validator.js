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
 * @requires validateWithSchema - Generic utility to validate data with a Joi schema.
 * @module RoutineValidationService - Exported validators for routine route handling.
 */

import { RoutineValidationSchemas } from "./routine.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for routine's body data.
 *
 * Uses the routineBodySchema from the RoutineSchema to validate
 * the body of the incoming request. This ensures that the routine's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateRoutineBody = validateWithSchema(RoutineValidationSchemas.routineBodyValidationSchema, 'body');

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
const validateRoutineParams = validateWithSchema(RoutineValidationSchemas.routineParamsValidationSchema, 'params');

/**
 * @namespace RoutineValidationService
 * @description Exported routine validators to be used in routes.
 */
export const RoutineValidationService = {
    validateRoutineBody,
    validateRoutineParams,
};