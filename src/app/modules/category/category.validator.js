import validateWithSchema from "../../../helpers/validateWithSchema.js";
import { CategorySchema } from "./category.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for category's body data.
 *
 * Uses the categoryBodySchema from the CategorySchema to validate
 * the body of the incoming request. This ensures that the category's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const categoryBodyValidator = validateWithSchema(CategorySchema.categoryBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for category's ID in request parameters.
 *
 * Uses the categoryParamsSchema from the CategorySchema to validate
 * the category ID provided in the request parameters. This ensures that
 * the category ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const categoryParamsValidator = await validateWithSchema(CategorySchema.categoryParamsSchema, 'params');

/**
 * @namespace CategoryValidators
 * @description Exported category validators to be used in routes.
 */
export const CategoryValidators = {
    categoryBodyValidator,
    categoryParamsValidator,
};
