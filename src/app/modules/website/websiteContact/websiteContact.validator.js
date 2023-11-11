import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { WebsiteContactSchema } from "./websiteContact.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for website contact body data.
 *
 * Uses the websiteContactBodySchema from the WebsiteContactBodySchema to validate
 * the body of the incoming request. This ensures that the website contact
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteContactBodyValidator = validateDataWithSchema(WebsiteContactSchema.websiteContactBodySchema, 'body');

/**
 * @namespace WebsiteValidators
 * @description Exported website contact validators to be used in routes.
 */
export const WebsiteContactValidators = {
    websiteContactBodyValidator
};
