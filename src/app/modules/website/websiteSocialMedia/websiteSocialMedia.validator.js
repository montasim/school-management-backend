import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { WebsiteSocialMediaSchema } from "./websiteSocialMedia.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for website important information link body data.
 *
 * Uses the websiteSocialMediaBodySchema from the WebsiteSocialMediaBodySchema to validate
 * the body of the incoming request. This ensures that the website important information link
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const websiteSocialMediaBodyValidator = validateDataWithSchema(WebsiteSocialMediaSchema.websiteSocialMediaBodySchema, 'body');

/**
 * @namespace WebsiteValidators
 * @description Exported website important information link validators to be used in routes.
 */
export const WebsiteSocialMediaValidators = {
    websiteSocialMediaBodyValidator
};