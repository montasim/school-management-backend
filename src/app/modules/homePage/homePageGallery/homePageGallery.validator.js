/**
 * @fileoverview Middleware Validators for HomePageGallery Post Data.
 *
 * This module contains middleware functions for validating homePageGallery post data in Express routes.
 * It leverages Joi schemas defined in the HomePageGallerySchema module to validate the format and content
 * of homePageGallery post-related data, such as homePageGallery post IDs in request parameters. These validators ensure
 * that incoming data for homePageGallery posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires HomePageGalleryValidationSchemas - Schemas for validating homePageGallery post data.
 * @module HomePageGalleryValidationService - Exported validators for homePageGallery post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { HomePageGalleryValidationSchemas } from "./homePageGallery.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";

/**
 * Validates the details of a homePageGallery post against a predefined schema.
 *
 * @async
 * @function validateHomePageGalleryDetails
 * @description Middleware to validate the homePageGallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the homePageGallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateHomePageGalleryDetails = await validateDataWithSchema(JoiSchemaGenerators.carouselBodyValidationSchema(), 'body');

/**
 * Validates the details of a homePageGallery post against a predefined schema.
 *
 * @async
 * @function validateHomePageGalleryDetails
 * @description Middleware to validate the homePageGallery post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the homePageGallery post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateHomePageGalleryFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema("galleryImage", [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], [MIME_TYPE_PNG, MIME_TYPE_JPG]), "file");

/**
 * Validates the homePageGallery post ID in request parameters.
 *
 * @async
 * @function validateHomePageGalleryParams
 * @description Middleware to validate the homePageGallery post's ID in the request parameters.
 * @param {Object} req - Express request object containing the homePageGallery post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateHomePageGalleryParams = await validateDataWithSchema(HomePageGalleryValidationSchemas.homePageGalleryParamsValidationSchema, 'params');

/**
 * @namespace HomePageGalleryValidationService
 * @description Provides validation services for homePageGallery-related data in routes. This includes validation for homePageGallery details, homePageGallery files, and homePageGallery parameters.
 */
export const HomePageGalleryValidationService = {
    validateHomePageGalleryDetails,
    validateHomePageGalleryFile,
    validateHomePageGalleryParams,
};