/**
 * @fileoverview Video Gallery Schema Definitions.
 *
 * This file provides schema definitions for validating video gallery data.
 * It utilizes the Joi library to create validation schemas for both the body and parameters of
 * incoming requests related to a video gallery on a website. The schemas ensure that
 * the data conforms to specific standards, such as the format of link titles and the structure
 * of the link IDs. These schemas are used by validator functions in corresponding routes to
 * maintain data integrity and consistency.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Functions for generating commonly used Joi validation schemas.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Function to create a schema for validating IDs.
 * @module VideoGallerySchema - Exported Joi validation schemas for a video gallery.
 */

import Joi from "../../../../helpers/websiteValidator.js";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { VIDEO_GALLERY_CONSTANTS } from "./videoGallery.constants.js";
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Schema for Validating Video Gallery Body Data.
 *
 * Defines the Joi schema to validate the body data of requests for a video gallery.
 * This schema checks for the presence and format of the link title and the link itself, ensuring they
 * meet the specified criteria for length and URI format. It's utilized in middleware validators to pre-process
 * and verify incoming request data for adding or updating a video gallery on the website.
 */
const videoGalleryBodySchema = Joi.object({
    videoGalleryTitle: JoiSchemaGenerators.createStringSchema(
        'videoGalleryTitle',
        VIDEO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        VIDEO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ),
    videoLink: Joi.string().pattern(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i
    ).required().messages({
        'string.pattern.base': 'videoLink must be a valid YouTube video URL.'
    })
});

/**
 * Schema for Validating Video Gallery ID in Request Parameters.
 *
 * Provides the Joi schema to validate the ID of a video gallery included in request parameters.
 * This schema ensures that the ID adheres to a specific format and structure as defined in ID_CONSTANTS.
 * It's essential for operations that target specific video gallery, like updates or deletions,
 * ensuring that the correct link is identified and processed.
 */
const videoGalleryParamsSchema = Joi.object({
    videoGalleryId: createIdSchema(
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_PREFIX,
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_MIN_LENGTH,
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_MAX_LENGTH
    ).required()
});


/**
 * @namespace VideoGallerySchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `videoGalleryBodySchema`: Validates the body data of a website.
 * - `videoGalleryParamsSchema`: Validates the videoGalleryId in request parameters.
 */
export const VideoGallerySchema = {
    videoGalleryBodySchema,
    videoGalleryParamsSchema,
};