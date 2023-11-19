/**
 * @fileoverview Middleware Validators for Designation Data.
 *
 * This module contains middleware functions for validating Designation data in Express routes.
 * It leverages Joi schemas defined in the DesignationSchema module to validate the format and content
 * of Designation-related data, ensuring that incoming data for designations adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires DesignationSchema - Schemas for validating Designation data.
 * @module DesignationValidators - Exported validators for Designation route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { DesignationSchema } from "./designation.schema.js";

/**
 * Validates the body data of a Designation request.
 * @function designationBodyValidator
 * @description Middleware to validate the Designation's body data using Joi schemas.
 * @param {Object} req - Express request object containing the Designation's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const designationBodyValidator = validateDataWithSchema(DesignationSchema.designationBodySchema, 'body');

/**
 * Validates the Designation ID in request parameters.
 * @function designationParamsValidator
 * @description Middleware to validate the Designation's ID in the request parameters.
 * @param {Object} req - Express request object containing the Designation ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const designationParamsValidator = await validateDataWithSchema(DesignationSchema.designationParamsSchema, 'params');

/**
 * @namespace DesignationValidators
 * @description Provides validation services for Designation-related data in routes. This includes validation for Designation details and Designation parameters.
 */
export const DesignationValidators = {
    designationBodyValidator,
    designationParamsValidator,
};