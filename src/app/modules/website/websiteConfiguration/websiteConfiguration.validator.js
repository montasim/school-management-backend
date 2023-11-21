/**
 * @fileoverview Validation Service for Website Configuration.
 *
 * This module provides validation services for handling website configuration requests.
 * It uses Joi schema validators to ensure that incoming data for website configuration,
 * such as details and file uploads, meet the required format and criteria.
 * This includes validation for body data as well as file data for website logos.
 *
 * @requires validateDataWithSchema - Helper function to validate data against a Joi schema.
 * @requires JoiSchemaGenerators - Shared Joi schema generators for various data types.
 * @requires constants - Application constants for file extensions and MIME types.
 * @module WebsiteConfigurationValidationService - Exported validators for website configuration routes.
 */

import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";
import { WebsiteConfigurationValidationSchemas } from "./websiteConfiguration.schema.js";
import validateDataWithFileSchema from "../../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of a website configuration against a predefined schema.
 *
 * @async
 * @function validateNewWebsiteConfigurationDetails
 * @description Middleware to validate the website configuration post's body and file data using Joi schemas.
 * @param {Object} req - Express request object containing the website configuration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewWebsiteConfigurationDetails = await validateDataWithFileSchema(
    WebsiteConfigurationValidationSchemas.newWebsiteConfigurationValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "websiteLogo",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG]
    ),
    true
);

/**
 * Validates the details of a website configuration against a predefined schema.
 *
 * @async
 * @function validateUpdateWebsiteConfigurationDetails
 * @description Middleware to validate the website configuration post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the website configuration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateUpdateWebsiteConfigurationDetails = await validateDataWithFileSchema(
    WebsiteConfigurationValidationSchemas.updateWebsiteConfigurationValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "websiteLogo",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG]
    ),
    false
);

/**
 * @namespace WebsiteValidators
 * @description Exported website configuration validators to be used in routes.
 */
export const WebsiteConfigurationValidationService = {
    validateNewWebsiteConfigurationDetails,
    validateUpdateWebsiteConfigurationDetails
};