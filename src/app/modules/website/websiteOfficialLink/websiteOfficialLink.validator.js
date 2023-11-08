import validateWithSchema from "../../../../helpers/validateWithSchema.js";
import { WebsiteOfficialLinkSchema } from "./websiteOfficialLink.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for website important information link body data.
 *
 * Uses the websiteOfficialLinkBodySchema from the WebsiteOfficialLinkBodySchema to validate
 * the body of the incoming request. This ensures that the website important information link
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteOfficialLinkBodyValidator = validateWithSchema(WebsiteOfficialLinkSchema.websiteOfficialLinkBodySchema, 'body');

/**
 * @namespace WebsiteValidators
 * @description Exported website important information link validators to be used in routes.
 */
export const WebsiteOfficialLinkValidators = {
    websiteOfficialLinkBodyValidator
};