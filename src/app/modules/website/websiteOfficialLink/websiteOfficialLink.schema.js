/**
 * @fileoverview Website Important Information Link Schema Definitions.
 *
 * This file provides schema definitions for validating website important information link data.
 * It utilizes the Joi library to create validation schemas for both the body and parameters of
 * incoming requests related to important information links on a website. The schemas ensure that
 * the data conforms to specific standards, such as the format of link titles and the structure
 * of the link IDs. These schemas are used by validator functions in corresponding routes to
 * maintain data integrity and consistency.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Functions for generating commonly used Joi validation schemas.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Function to create a schema for validating IDs.
 * @module WebsiteOfficialLinkSchema - Exported Joi validation schemas for website important information links.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { ID_CONSTANTS } from "./websiteOfficialLink.constants.js";
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Schema for Validating Website Important Information Link Body Data.
 *
 * Defines the Joi schema to validate the body data of requests for website important information links.
 * This schema checks for the presence and format of the link title and the link itself, ensuring they
 * meet the specified criteria for length and URI format. It's utilized in middleware validators to pre-process
 * and verify incoming request data for adding or updating important information links on the website.
 */
const websiteOfficialLinkBodySchema = Joi.object({
    officialLinkTitle: JoiSchemaGenerators.createStringSchema('officialLinkTitle', 3, 200),
    officialLink: JoiSchemaGenerators.uriValidationSchema
});

/**
 * Schema for Validating Website Important Information Link ID in Request Parameters.
 *
 * Provides the Joi schema to validate the ID of a website important information link included in request parameters.
 * This schema ensures that the ID adheres to a specific format and structure as defined in ID_CONSTANTS.
 * It's essential for operations that target specific important information links, like updates or deletions,
 * ensuring that the correct link is identified and processed.
 */
const websiteOfficialLinkParamsSchema = Joi.object({
    websiteOfficialLinkId: createIdSchema(ID_CONSTANTS?.WEBSITE_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});


/**
 * @namespace WebsiteOfficialLinkSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteOfficialLinkBodySchema`: Validates the body data of a website.
 * - `websiteOfficialLinkParamsSchema`: Validates the websiteOfficialLinkId in request parameters.
 */
export const WebsiteOfficialLinkSchema = {
    websiteOfficialLinkBodySchema,
    websiteOfficialLinkParamsSchema,
};