import validateWithSchema from "../../../helpers/validateWithSchema.js";
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
const othersInformationCategoryBodyValidator = validateWithSchema(OthersInformationCategorySchema.othersInformationCategoryBodySchema, 'body');

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
const othersInformationCategoryParamsValidator = await validateWithSchema(OthersInformationCategorySchema.othersInformationCategoryParamsSchema, 'params');

/**
 * @namespace CategoryValidators
 * @description Exported othersInformationCategory validators to be used in routes.
 */
export const CategoryValidators = {
    othersInformationCategoryBodyValidator,
    othersInformationCategoryParamsValidator,
};
