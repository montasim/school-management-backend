/**
 * @fileoverview Joi Validation Schemas for Gallery Posts.
 *
 * This module provides Joi schemas for validating various aspects of gallery posts in the application.
 * It includes schemas for validating gallery post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across gallery-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module GalleryValidationSchemas - Exported Joi validation schemas for gallery post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './gallery.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for gallery post parameters.
 * Validates the 'galleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating gallery post parameters.
 */
const galleryParamsValidationSchema = Joi.object({
    galleryId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_GALLERY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace GalleryValidationSchemas
 * @description Exported Joi validation schemas for galleryPost data.
 *
 * - `galleryParamsValidationSchema`: Schema for validating gallery post ID parameters.
 */
export const GalleryValidationSchemas = {
    galleryParamsValidationSchema,
};