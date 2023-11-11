/**
 * @fileoverview Joi Validation Schemas for Blog Posts.
 *
 * This module provides Joi schemas for validating various aspects of blog posts in the application.
 * It includes schemas for validating blog post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across blog-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module BlogValidationSchemas - Exported Joi validation schemas for blog post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './blog.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

/**
 * Joi validation schema for blog post parameters.
 * Validates the 'blogId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating blog post parameters.
 */
const blogParamsValidationSchema = Joi.object({
    blogId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_POST_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace BlogValidationSchemas
 * @description Exported Joi validation schemas for blogPost data.
 *
 * - `blogParamsValidationSchema`: Schema for validating blog post ID parameters.
 */
export const BlogValidationSchemas = {
    blogParamsValidationSchema,
};