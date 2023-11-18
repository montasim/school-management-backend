/**
 * @fileoverview Joi Validation Schemas for HomePageCarousel Posts.
 *
 * This module provides Joi schemas for validating various aspects of homePageCarousel posts in the application.
 * It includes schemas for validating homePageCarousel post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across homePageCarousel-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module HomePageCarouselValidationSchemas - Exported Joi validation schemas for homePageCarousel post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './homePageCarousel.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for homePageCarousel post parameters.
 * Validates the 'homePageCarouselId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating homePageCarousel post parameters.
 */
const homePageCarouselParamsValidationSchema = Joi.object({
    homePageCarouselId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_CAROUSEL_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});

/**
 * @namespace HomePageCarouselValidationSchemas
 * @description Exported Joi validation schemas for homePageCarouselPost data.
 *
 * - `homePageCarouselParamsValidationSchema`: Schema for validating homePageCarousel post ID parameters.
 */
export const HomePageCarouselValidationSchemas = {
    homePageCarouselParamsValidationSchema,
};