/**
 * @fileoverview Middleware Validators for PhotoGallery Post Data.
 *
 * This module contains middleware functions for validating photoGallery post data in Express routes.
 * It leverages Joi schemas defined in the PhotoGallerySchema module to validate the format and content
 * of photoGallery post-related data, such as photoGallery post IDs in request parameters. These validators ensure
 * that incoming data for photoGallery posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires PhotoGalleryValidationSchemas - Schemas for validating photoGallery post data.
 * @module PhotoGalleryValidationService - Exported validators for photoGallery post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { PhotoGalleryValidationSchemas } from "./photoGallery.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";

/**
 * Validates the details of a photoGallery post against a predefined schema.
 *
 * @async
 * @function validatePhotoGalleryDetails
 * @description Middleware to validate the photoGallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the photoGallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validatePhotoGalleryDetails = await validateDataWithSchema(JoiSchemaGenerators.carouselBodyValidationSchema(), 'body');

/**
 * Validates the details of a photoGallery post against a predefined schema.
 *
 * @async
 * @function validatePhotoGalleryDetails
 * @description Middleware to validate the photoGallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the photoGallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validatePhotoGalleryFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema("galleryImage", [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], [MIME_TYPE_PNG, MIME_TYPE_JPG]), "file");

/**
 * Validates the photoGallery post ID in request parameters.
 *
 * @async
 * @function validatePhotoGalleryParams
 * @description Middleware to validate the photoGallery post's ID in the request parameters.
 * @param {Object} req - Express request object containing the photoGallery post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validatePhotoGalleryParams = await validateDataWithSchema(PhotoGalleryValidationSchemas.photoGalleryParamsValidationSchema, 'params');

/**
 * @namespace PhotoGalleryValidationService
 * @description Provides validation services for photoGallery-related data in routes. This includes validation for photoGallery details, photoGallery files, and photoGallery parameters.
 */
export const PhotoGalleryValidationService = {
    validatePhotoGalleryDetails,
    validatePhotoGalleryFile,
    validatePhotoGalleryParams,
};