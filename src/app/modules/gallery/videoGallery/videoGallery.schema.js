/**
 * @fileoverview Joi Validation Schemas for VideoGallery Posts.
 *
 * This module provides Joi schemas for validating various aspects of videoGallery posts in the application.
 * It includes schemas for validating videoGallery post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across videoGallery-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires VIDEO_GALLERY_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module VideoGalleryValidationSchemas - Exported Joi validation schemas for videoGallery post data.
 */

import Joi from "joi";
import createIdSchema from "../../../../shared/createIdSchema.js";
import { VIDEO_GALLERY_CONSTANTS } from "./videoGallery.constants.js";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * Validation schema for creating a new video gallery.
 * Ensures the 'title' field meets specified length requirements and is required.
 */
const newVideoGalleryValidationSchema = Joi.object({
    title: JoiSchemaGenerators?.createStringSchema(
        "title",
        VIDEO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        VIDEO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
})

/**
 * Joi validation schema for videoGallery post parameters.
 * Validates the 'videoGalleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating videoGallery post parameters.
 */
const videoGalleryParamsValidationSchema = Joi.object({
    videoGalleryId: createIdSchema(
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_PREFIX,
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_MIN_LENGTH,
        VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_MAX_LENGTH,
    ).required()
});

/**
 * @namespace VideoGalleryValidationSchemas
 * @description Exported Joi validation schemas for videoGalleryPost data.
 * - `newVideoGalleryValidationSchema`: Schema for validating the body of a new video gallery request.
 * - `videoGalleryParamsValidationSchema`: Schema for validating videoGallery post ID parameters.
 */
export const VideoGalleryValidationSchemas = {
    newVideoGalleryValidationSchema,
    videoGalleryParamsValidationSchema,
};