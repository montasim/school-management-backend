/**
 * @fileoverview Joi Validation Schemas for PhotoGallery Posts.
 *
 * This module provides Joi schemas for validating various aspects of photoGallery posts in the application.
 * It includes schemas for validating photoGallery post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across photoGallery-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module PhotoGalleryValidationSchemas - Exported Joi validation schemas for photoGallery post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './photoGallery.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for photoGallery post parameters.
 * Validates the 'photoGalleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating photoGallery post parameters.
 */
const photoGalleryParamsValidationSchema = Joi.object({
    photoGalleryId: createIdSchema(ID_CONSTANTS?.PHOTO_GALLERY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace PhotoGalleryValidationSchemas
 * @description Exported Joi validation schemas for photoGalleryPost data.
 *
 * - `photoGalleryParamsValidationSchema`: Schema for validating photoGallery post ID parameters.
 */
export const PhotoGalleryValidationSchemas = {
    photoGalleryParamsValidationSchema,
};