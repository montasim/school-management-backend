import validateWithSchema from "../../../helpers/validateWithSchema.js";
import { WebsiteSchema } from "./website.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for website's body data.
 *
 * Uses the websiteBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the website's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteBodyValidator = validateWithSchema(WebsiteSchema.websiteBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for website's ID in request parameters.
 *
 * Uses the websiteParamsSchema from the DashboardSchema to validate
 * the website ID provided in the request parameters. This ensures that
 * the website ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteParamsValidator = await validateWithSchema(WebsiteSchema.websiteParamsSchema, 'params');

/**
 * @namespace WebsiteValidators
 * @description Exported website validators to be used in routes.
 */
export const WebsiteValidators = {
    websiteBodyValidator,
    websiteParamsValidator,
};
