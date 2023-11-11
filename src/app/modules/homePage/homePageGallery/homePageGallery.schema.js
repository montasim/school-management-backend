/**
 * @fileoverview Joi Validation Schemas for HomePageGallery Posts.
 *
 * This module provides Joi schemas for validating various aspects of homePageGallery posts in the application.
 * It includes schemas for validating homePageGallery post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across homePageGallery-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module HomePageGalleryValidationSchemas - Exported Joi validation schemas for homePageGallery post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './homePageGallery.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for homePageGallery post parameters.
 * Validates the 'homePageGalleryId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating homePageGallery post parameters.
 */
const homePageGalleryParamsValidationSchema = Joi.object({
    homePageGalleryId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_GALLERY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace HomePageGalleryValidationSchemas
 * @description Exported Joi validation schemas for homePageGalleryPost data.
 *
 * - `homePageGalleryParamsValidationSchema`: Schema for validating homePageGallery post ID parameters.
 */
export const HomePageGalleryValidationSchemas = {
    homePageGalleryParamsValidationSchema,
};