/**
 * @fileoverview Joi Validation Schemas for HomePagePost Posts.
 *
 * This module provides Joi schemas for validating various aspects of homePagePost posts in the application.
 * It includes schemas for validating homePagePost post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across homePagePost-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module HomePagePostValidationSchemas - Exported Joi validation schemas for homePagePost post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './homePagePost.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for homePagePost post parameters.
 * Validates the 'homePagePostId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating homePagePost post parameters.
 */
const homePagePostParamsValidationSchema = Joi.object({
    homePagePostId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_POST_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});

/**
 * @namespace HomePagePostValidationSchemas
 * @description Exported Joi validation schemas for homePagePostPost data.
 *
 * - `homePagePostParamsValidationSchema`: Schema for validating homePagePost post ID parameters.
 */
export const HomePagePostValidationSchemas = {
    homePagePostParamsValidationSchema,
};