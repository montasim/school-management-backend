import validateWithSchema from "../../../../helpers/validateWithSchema.js";
import { WebsiteContactSchema } from "./websiteContact.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for website configuration body data.
 *
 * Uses the websiteConfigurationBodySchema from the WebsiteConfigurationBodySchema to validate
 * the body of the incoming request. This ensures that the website configuration
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteConfigurationBodyValidator = validateWithSchema(WebsiteContactSchema.websiteBodySchema, 'body');

/**
 * @namespace WebsiteValidators
 * @description Exported website configuration validators to be used in routes.
 */
export const WebsiteConfigurationValidators = {
    websiteConfigurationBodyValidator
};
