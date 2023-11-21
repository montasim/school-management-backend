/**
 * @fileoverview Middleware Validators for Blog Post Data.
 *
 * This module contains middleware functions for validating blog post data in Express routes.
 * It leverages Joi schemas defined in the BlogSchema module to validate the format and content
 * of blog post-related data, such as blog post IDs in request parameters. These validators ensure
 * that incoming data for blog posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires BlogValidationSchemas - Schemas for validating blog post data.
 * @module BlogValidationService - Exported validators for blog post route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { BlogValidationSchemas } from "./blog.schema.js";
import { JoiSchemaGenerators}  from "../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../constants/constants.js";
import validateDataWithFileSchema from "../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of a blog post against a predefined schema.
 *
 * @async
 * @function validateNewBlogDetails
 * @description Middleware to validate the blog post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the blog post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewBlogDetails = await validateDataWithFileSchema(
    JoiSchemaGenerators.newPostBodyValidationSchema(),
    JoiSchemaGenerators.fileValidationSchema(
        "blogImage",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG],
    ),
    true
);

/**
 * Validates the details of an update blog post against a predefined schema.
 *
 * @async
 * @function validateUpdateBlogDetails
 * @description Middleware to validate the blog post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the blog post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateUpdateBlogDetails = await validateDataWithFileSchema(
    JoiSchemaGenerators.updatePostBodyValidationSchema(),
    JoiSchemaGenerators.fileValidationSchema(
        "blogImage",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG],
    ),
    false
);

/**
 * Validates the blog post ID in request parameters.
 *
 * @async
 * @function validateBlogParams
 * @description Middleware to validate the blog post's ID in the request parameters.
 * @param {Object} req - Express request object containing the blog post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateBlogParams = await validateDataWithSchema(BlogValidationSchemas.blogParamsValidationSchema, 'params');

/**
 * @namespace BlogValidationService
 * @description Provides validation services for blog-related data in routes. This includes validation for blog details, blog files, and blog parameters.
 */
export const BlogValidationService = {
    validateNewBlogDetails,
    validateUpdateBlogDetails,
    validateBlogParams,
};