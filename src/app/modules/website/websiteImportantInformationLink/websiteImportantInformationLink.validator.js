/**
 * @fileoverview Website Important Information Link Validators.
 *
 * This file contains the validator functions for the website's important information link data.
 * It includes validators for both the body and parameters of incoming requests related to important
 * information links. The validators ensure that the data provided in requests meets the expected
 * format and criteria as defined in the corresponding schemas. These validators are used as middleware
 * in the website important information links routes to validate request data before processing.
 *
 * @requires validateDataWithSchema - Function to validate data against a given Joi schema.
 * @requires WebsiteImportantInformationLinkSchema - Schemas for website important information link validation.
 * @module WebsiteImportantInformationLinkValidators - Exports validators for use in route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { WebsiteImportantInformationLinkSchema } from "./websiteImportantInformationLink.schema.js";

/**
 * Validator for Website Important Information Link Body Data.
 *
 * Validates the request body data for operations related to website important information links.
 * Utilize the Joi schema defined in WebsiteImportantInformationLinkSchema to ensure the provided
 * data in the request body adheres to the specified structure and rules. This validator is used as
 * middleware in routes to check the integrity and format of incoming data for important information links.
 */

const websiteImportantInformationLinkBodyValidator = validateDataWithSchema(WebsiteImportantInformationLinkSchema.websiteImportantInformationLinkBodySchema, 'body');

/**
 * Validator for Website Important Information Link Parameters.
 *
 * Validates the request parameters, particularly the ID of the important information link,
 * for operations that require specifying a specific link. It checks the ID against the Joi schema
 * defined in WebsiteImportantInformationLinkSchema to ensure it meets the required format.
 * This validator is crucial in routes that handle operations on individual important information links.
 */
const websiteImportantInformationLinkParamsValidator = validateDataWithSchema(WebsiteImportantInformationLinkSchema.websiteImportantInformationLinkParamsSchema, 'params');

/**
 * @namespace WebsiteValidators
 * @description Exported website important information link validators to be used in routes.
 */
export const WebsiteImportantInformationLinkValidators = {
    websiteImportantInformationLinkBodyValidator,
    websiteImportantInformationLinkParamsValidator,
};