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

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import {JoiSchemaGenerators} from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";


/**
 * Validates the details of a website configuration request.
 *
 * @async
 * @function validateWebsiteConfigurationDetails
 * @description Validates the request body against a predefined Joi schema for website configuration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves when validation is successful, or sends an error response.
 */
const validateWebsiteConfigurationDetails = await validateDataWithSchema(JoiSchemaGenerators.websiteConfigurationBodyValidationSchema(), 'body');

/**
 * Validates the website logo file in a website configuration request.
 *
 * @async
 * @function validateWebsiteConfigurationFile
 * @description Validates the file object in the request against a predefined Joi schema for file uploads.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves when validation is successful, or sends an error response.
 */
const validateWebsiteConfigurationFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema("websiteLogo", [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], [MIME_TYPE_PNG, MIME_TYPE_JPG]), "file");

/**
 * @namespace WebsiteValidators
 * @description Exported website configuration validators to be used in routes.
 */
export const WebsiteConfigurationValidationService = {
    validateWebsiteConfigurationDetails,
    validateWebsiteConfigurationFile
};