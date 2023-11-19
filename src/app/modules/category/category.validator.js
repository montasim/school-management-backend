/**
 * @fileoverview Middleware Validators for Category Data.
 *
 * This module contains middleware functions that are used for validating category data in Express routes.
 * It utilizes Joi schemas from the CategorySchema module to ensure that incoming data for categories,
 * such as category IDs in request parameters and category body data, adheres to the expected structure and types.
 *
 * Each validator function is designed to work as middleware in Express routes. They check the validity of the data
 * and, if validation is successful, pass control to the next middleware in the route. If validation fails,
 * they send a standardized error response. This approach helps maintain data integrity and consistency across the application.
 *
 * @requires validateDataWithSchema - Utility function to validate data with a Joi schema.
 * @requires CategorySchema - Schemas for validating category data.
 * @module CategoryValidators - Exported validators for category route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { CategorySchema } from "./category.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for category's body data.
 *
 * Uses the categoryBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the category's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const categoryBodyValidator = validateDataWithSchema(CategorySchema.categoryBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for category's ID in request parameters.
 *
 * Uses the categoryParamsSchema from the DashboardSchema to validate
 * the category ID provided in the request parameters. This ensures that
 * the category ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const categoryParamsValidator = await validateDataWithSchema(CategorySchema.categoryParamsSchema, 'params');

/**
 * @namespace CategoryValidators
 * @description Provides middleware validators for category data in Express routes.
 * These validators are crucial for ensuring the incoming data for categories is properly formatted and valid before any processing.
 */
export const CategoryValidators = {
    categoryBodyValidator,
    categoryParamsValidator,
};