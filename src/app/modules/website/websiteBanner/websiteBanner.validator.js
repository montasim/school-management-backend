/**
 * @fileoverview Middleware Validators for WebsiteBanner Post Data.
 *
 * This module contains middleware functions for validating websiteBanner data in Express routes.
 * It leverages Joi schemas defined in the WebsiteBannerSchema module to validate the format and content
 * of websiteBanner post-related data. These validators ensure
 * that incoming data for websiteBanner posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @module WebsiteBannerValidationService - Exported validators for websiteBanner route handling.
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
 * Validates the details of a home page carousel against a predefined schema.
 *
 * @async
 * @function validateNewBlogDetails
 * @description Middleware to validate the blog post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the blog post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateWebsiteBannerDetails = validateDataWithSchema(
    JoiSchemaGenerators.fileValidationSchema(
    "image",
    [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
    [MIME_TYPE_PNG, MIME_TYPE_JPG],
), 'file');

/**
 * @namespace WebsiteBannerValidationService
 * @description Provides validation services for websiteBanner-related data in routes. This includes validation for websiteBanner details, websiteBanner files, and websiteBanner parameters.
 */
export const WebsiteBannerValidationService = {
    validateWebsiteBannerDetails,
};
