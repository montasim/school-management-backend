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
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module VideoGalleryValidationSchemas - Exported Joi validation schemas for videoGallery post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './videoGallery.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for videoGallery post parameters.
 * Validates the 'videoGalleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating videoGallery post parameters.
 */
const videoGalleryParamsValidationSchema = Joi.object({
    videoGalleryId: createIdSchema(ID_CONSTANTS?.VIDEO_GALLERY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace VideoGalleryValidationSchemas
 * @description Exported Joi validation schemas for videoGalleryPost data.
 *
 * - `videoGalleryParamsValidationSchema`: Schema for validating videoGallery post ID parameters.
 */
export const VideoGalleryValidationSchemas = {
    videoGalleryParamsValidationSchema,
};