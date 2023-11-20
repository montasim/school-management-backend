/**
 * @fileoverview Middleware Validators for HomePagePost Post Data.
 *
 * This module contains middleware functions for validating homePagePost post data in Express routes.
 * It leverages Joi schemas defined in the HomePagePostSchema module to validate the format and content
 * of homePagePost post-related data, such as homePagePost post IDs in request parameters. These validators ensure
 * that incoming data for homePagePost posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires HomePagePostValidationSchemas - Schemas for validating homePagePost post data.
 * @module HomePagePostValidationService - Exported validators for homePagePost post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { HomePagePostValidationSchemas } from "./homePagePost.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";
import validateDataWithFileSchema from "../../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of a blog post against a predefined schema.
 *
 * @async
 * @function validateNewHomePagePostDetails
 * @description Middleware to validate the home page post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the home page post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewHomePagePostDetails = await validateDataWithFileSchema(
    JoiSchemaGenerators.newPostBodyValidationSchema(),
    JoiSchemaGenerators.fileValidationSchema(
        "postImage",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG],
    ),
    true
);

/**
 * Validates the details of an update home page post against a predefined schema.
 *
 * @async
 * @function validateUpdateHomePagePostDetails
 * @description Middleware to validate the home page post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the home page post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateUpdateHomePagePostDetails = await validateDataWithFileSchema(
    JoiSchemaGenerators.updatePostBodyValidationSchema(),
    JoiSchemaGenerators.fileValidationSchema(
        "postImage",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG],
    ),
    false
);

/**
 * Validates the homePagePost post ID in request parameters.
 *
 * @async
 * @function validateHomePagePostParams
 * @description Middleware to validate the homePagePost post's ID in the request parameters.
 * @param {Object} req - Express request object containing the homePagePost post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateHomePagePostParams = await validateDataWithSchema(
    HomePagePostValidationSchemas.homePagePostParamsValidationSchema,
    'params'
);

/**
 * @namespace HomePagePostValidationService
 * @description Provides validation services for homePagePost-related data in routes. This includes validation for homePagePost details, homePagePost files, and homePagePost parameters.
 */
export const HomePagePostValidationService = {
    validateNewHomePagePostDetails,
    validateUpdateHomePagePostDetails,
    validateHomePagePostParams,
};