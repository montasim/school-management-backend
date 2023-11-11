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
 * @description Exported category validators to be used in routes.
 */
export const CategoryValidators = {
    categoryBodyValidator,
    categoryParamsValidator,
};
