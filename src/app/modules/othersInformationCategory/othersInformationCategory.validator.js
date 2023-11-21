/**
 * @fileoverview Middleware Validators for Others Information Category Data.
 *
 * This module contains middleware functions that are used for validating others information category data in Express routes.
 * It utilizes Joi schemas from the OthersInformationCategorySchema module to ensure that incoming data for categories,
 * such as others information category IDs in request parameters and others information category body data, adheres to the expected structure and types.
 *
 * Each validator function is designed to work as middleware in Express routes. They check the validity of the data
 * and, if validation is successful, pass control to the next middleware in the route. If validation fails,
 * they send a standardized error response. This approach helps maintain data integrity and consistency across the application.
 *
 * @requires validateDataWithSchema - Utility function to validate data with a Joi schema.
 * @requires CategorySchema - Schemas for validating others information category data.
 * @module CategoryValidators - Exported validators for others information category route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { OthersInformationCategorySchema } from "./othersInformationCategory.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for othersInformationCategory's body data.
 *
 * Uses the othersInformationCategoryBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the othersInformationCategory's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const othersInformationCategoryBodyValidator = validateDataWithSchema(OthersInformationCategorySchema.othersInformationCategoryBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for othersInformationCategory's ID in request parameters.
 *
 * Uses the othersInformationCategoryParamsSchema from the DashboardSchema to validate
 * the othersInformationCategory ID provided in the request parameters. This ensures that
 * the othersInformationCategory ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const othersInformationCategoryParamsValidator = await validateDataWithSchema(OthersInformationCategorySchema.othersInformationCategoryParamsSchema, 'params');

/**
 * @namespace CategoryValidators
 * @description Exported othersInformationCategory validators to be used in routes.
 */
export const OthersInformationCategoryValidators = {
    othersInformationCategoryBodyValidator,
    othersInformationCategoryParamsValidator,
};