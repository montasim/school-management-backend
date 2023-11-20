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
 * @requires PHOTO_GALLERY_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module PhotoGalleryValidationSchemas - Exported Joi validation schemas for photoGallery post data.
 */

import Joi from "joi";
import createIdSchema from "../../../../shared/createIdSchema.js";
import { PHOTO_GALLERY_CONSTANTS } from './photoGallery.constants.js';
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * Validation schema for creating a new photo gallery.
 * Ensures the 'title' field meets specified length requirements and is required.
 */
const newPhotoGalleryValidationSchema = Joi.object({
    title: JoiSchemaGenerators?.createStringSchema(
        "title",
        PHOTO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        PHOTO_GALLERY_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
})

/**
 * Joi validation schema for photoGallery post parameters.
 * Validates the 'photoGalleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating photoGallery post parameters.
 */
const photoGalleryParamsValidationSchema = Joi.object({
    photoGalleryId: createIdSchema(
        PHOTO_GALLERY_CONSTANTS?.PHOTO_GALLERY_ID_PREFIX,
        PHOTO_GALLERY_CONSTANTS?.PHOTO_GALLERY_ID_MIN_LENGTH,
        PHOTO_GALLERY_CONSTANTS?.PHOTO_GALLERY_ID_MAX_LENGTH,
    ).required()
});

/**
 * @namespace PhotoGalleryValidationSchemas
 * @description Exported Joi validation schemas for photoGalleryPost data.
 * - `newPhotoGalleryValidationSchema`: Schema for validating the body of a new photo gallery request.
 * - `photoGalleryParamsValidationSchema`: Schema for validating photoGallery post ID parameters.
 */
export const PhotoGalleryValidationSchemas = {
    newPhotoGalleryValidationSchema,
    photoGalleryParamsValidationSchema,
};