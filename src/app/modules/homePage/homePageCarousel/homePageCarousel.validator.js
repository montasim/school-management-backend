/**
 * @fileoverview Middleware Validators for HomePageCarousel Post Data.
 *
 * This module contains middleware functions for validating homePageCarousel post data in Express routes.
 * It leverages Joi schemas defined in the HomePageCarouselSchema module to validate the format and content
 * of homePageCarousel post-related data, such as homePageCarousel post IDs in request parameters. These validators ensure
 * that incoming data for homePageCarousel posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires HomePageCarouselValidationSchemas - Schemas for validating homePageCarousel post data.
 * @module HomePageCarouselValidationService - Exported validators for homePageCarousel post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { HomePageCarouselValidationSchemas } from "./homePageCarousel.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../../constants/constants.js";
import validateDataWithFileSchema from "../../../../helpers/validateDataWithFileSchema.js";

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
const validateNewHomePageCarouselDetails = await validateDataWithFileSchema(
    HomePageCarouselValidationSchemas.newHomePageCarouselBodyValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "carouselImage",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG],
    ),
    true
);

/**
 * Validates the homePageCarousel post ID in request parameters.
 *
 * @async
 * @function validateHomePageCarouselParams
 * @description Middleware to validate the homePageCarousel post's ID in the request parameters.
 * @param {Object} req - Express request object containing the homePageCarousel post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateHomePageCarouselParams = await validateDataWithSchema(HomePageCarouselValidationSchemas.homePageCarouselParamsValidationSchema, 'params');

/**
 * @namespace HomePageCarouselValidationService
 * @description Provides validation services for homePageCarousel-related data in routes. This includes validation for homePageCarousel details, homePageCarousel files, and homePageCarousel parameters.
 */
export const HomePageCarouselValidationService = {
    validateNewHomePageCarouselDetails,
    validateHomePageCarouselParams,
};