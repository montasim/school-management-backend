/**
 * @fileoverview Middleware Validators for Contact Email Data.
 *
 * This module contains middleware functions for validating email data in Express routes.
 * It leverages Joi schemas defined in the ContactSchema module to validate the format and content
 * of email-related data, such as the body of email-sending requests. These validators ensure
 * that incoming data for sending emails adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires ContactSchema - Schemas for validating contact-related data.
 * @module ContactValidators - Exported validators for contact email route handling.
 */

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