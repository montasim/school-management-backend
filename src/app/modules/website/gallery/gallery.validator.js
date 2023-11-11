/**
 * @fileoverview Middleware Validators for Gallery Post Data.
 *
 * This module contains middleware functions for validating gallery post data in Express routes.
 * It leverages Joi schemas defined in the GallerySchema module to validate the format and content
 * of gallery post-related data, such as gallery post IDs in request parameters. These validators ensure
 * that incoming data for gallery posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires GalleryValidationSchemas - Schemas for validating gallery post data.
 * @module GalleryValidationService - Exported validators for gallery post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { GalleryValidationSchemas } from "./gallery.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";

/**
 * Validates the details of a gallery post against a predefined schema.
 *
 * @async
 * @function validateGalleryDetails
 * @description Middleware to validate the gallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the gallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateGalleryDetails = await validateDataWithSchema(JoiSchemaGenerators.carouselBodyValidationSchema(), 'body');

/**
 * Validates the details of a gallery post against a predefined schema.
 *
 * @async
 * @function validateGalleryDetails
 * @description Middleware to validate the gallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the gallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateGalleryFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema("galleryImage", [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], [MIME_TYPE_PNG, MIME_TYPE_JPG]), "file");

/**
 * Validates the gallery post ID in request parameters.
 *
 * @async
 * @function validateGalleryParams
 * @description Middleware to validate the gallery post's ID in the request parameters.
 * @param {Object} req - Express request object containing the gallery post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateGalleryParams = await validateDataWithSchema(GalleryValidationSchemas.galleryParamsValidationSchema, 'params');

/**
 * @namespace GalleryValidationService
 * @description Provides validation services for gallery-related data in routes. This includes validation for gallery details, gallery files, and gallery parameters.
 */
export const GalleryValidationService = {
    validateGalleryDetails,
    validateGalleryFile,
    validateGalleryParams,
};