/**
 * @fileoverview Middleware Validators for VideoGallery Post Data.
 *
 * This module contains middleware functions for validating videoGallery post data in Express routes.
 * It leverages Joi schemas defined in the VideoGallerySchema module to validate the format and content
 * of videoGallery post-related data, such as videoGallery post IDs in request parameters. These validators ensure
 * that incoming data for videoGallery posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires VideoGalleryValidationSchemas - Schemas for validating videoGallery post data.
 * @module VideoGalleryValidationService - Exported validators for videoGallery post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { VideoGalleryValidationSchemas } from "./videoGallery.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_MP4, MIME_TYPE_MP4 } from "../../../../constants/constants.js";
import validateDataWithFileSchema from "../../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of an PhotoGallery against a predefined schema.
 *
 * @async
 * @function validateNewPhotoGalleryDetails
 * @description Middleware to validate the PhotoGallery body data using Joi schemas.
 * @param {Object} req - Express request object containing the PhotoGallery details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewVideoGalleryDetails = await validateDataWithFileSchema(
    VideoGalleryValidationSchemas?.newVideoGalleryValidationSchema,
    JoiSchemaGenerators?.fileValidationSchema(
        "galleryVideo",
        [FILE_EXTENSION_TYPE_MP4],
        [MIME_TYPE_MP4],
    ),
    true
);

/**
 * Validates the videoGallery post ID in request parameters.
 *
 * @async
 * @function validateVideoGalleryParams
 * @description Middleware to validate the videoGallery post's ID in the request parameters.
 * @param {Object} req - Express request object containing the videoGallery post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateVideoGalleryParams = await validateDataWithSchema(
    VideoGalleryValidationSchemas.videoGalleryParamsValidationSchema,
    'params'
);

/**
 * @namespace VideoGalleryValidationService
 * @description Provides validation services for videoGallery-related data in routes. This includes validation for videoGallery details, videoGallery files, and videoGallery parameters.
 */
export const VideoGalleryValidationService = {
    validateNewVideoGalleryDetails,
    validateVideoGalleryParams,
};