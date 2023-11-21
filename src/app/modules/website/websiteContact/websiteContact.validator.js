/**
 * @fileoverview Website Contact Validation Service.
 *
 * This file contains the validation logic for website contact data using Joi schemas.
 * It provides middleware functions to validate website contact details such as
 * address, phone number, email, etc., in the request body. These functions ensure
 * that the data provided for website contact operations meets the required
 * standards and formats, enhancing data integrity and consistency.
 *
 * @requires validateDataWithSchema - Helper function to validate data against a Joi schema.
 * @requires WebsiteContactSchema - Defines the Joi schema for website contact data validation.
 * @module WebsiteContactValidationService - Exports validation functions for website contact operations.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { WebsiteContactSchema } from "./websiteContact.schema.js";

/**
 * Middleware for validating website contact details.
 *
 * This middleware uses the validateNewWebsiteContactDetails to validate the contact information
 * provided in the request body. It ensures that all required fields are present and
 * conform to the specified formats, such as proper string length and valid data types.
 * If the validation fails, it sends a response with appropriate error messages;
 * otherwise, it proceeds to the next middleware.
 *
 * @param {Object} req - The request object from Express.js containing website contact details.
 * @param {Object} res - The response object from Express.js used for sending responses.
 * @param {Function} next - The next middleware function in the Express application's request-response cycle.
 */
const validateNewWebsiteContactDetails = validateDataWithSchema(WebsiteContactSchema.websiteNewContactValidationSchema, 'body');

/**
 * Middleware for validating website contact details.
 *
 * This middleware uses the validateUpdateWebsiteContactDetails to validate the contact information
 * provided in the request body. It ensures that all required fields are present and
 * conform to the specified formats, such as proper string length and valid data types.
 * If the validation fails, it sends a response with appropriate error messages;
 * otherwise, it proceeds to the next middleware.
 *
 * @param {Object} req - The request object from Express.js containing website contact details.
 * @param {Object} res - The response object from Express.js used for sending responses.
 * @param {Function} next - The next middleware function in the Express application's request-response cycle.
 */
const validateUpdateWebsiteContactDetails = validateDataWithSchema(WebsiteContactSchema.websiteUpdateContactValidationSchema, 'body');

/**
 * @namespace WebsiteValidators
 * @description Exported website contact validators to be used in routes.
 */
export const WebsiteContactValidationService = {
    validateNewWebsiteContactDetails,
    validateUpdateWebsiteContactDetails
};