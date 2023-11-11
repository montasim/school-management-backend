import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { ContactSchema } from "./contact.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for send email body data.
 *
 * Uses the sendEmailBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the send email
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const sendEmailBodyValidator = validateDataWithSchema(ContactSchema.sendEmailBodySchema, 'body');

/**
 * @namespace CategoryValidators
 * @description Exported send email validators to be used in routes.
 */
export const ContactValidators = {
    sendEmailBodyValidator,
};
