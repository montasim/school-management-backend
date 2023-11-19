/**
 * @fileoverview Joi Validation Schemas for Category Data.
 *
 * This module provides Joi schemas for validating category-related data in Express routes.
 * It offers a comprehensive way to ensure that data related to categories, both in request parameters (like IDs)
 * and in the request body, adheres to the expected formats and constraints.
 *
 * The validation schemas help maintain consistency and integrity of data throughout the application.
 * They are particularly useful in routes handling category creation, updates, and retrieval by ensuring
 * that only valid and well-formed data is processed. This is crucial for both functionality and security.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires CATEGORY_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Utility function for creating ID validation schemas.
 * @module CategorySchema - Exported Joi validation schemas for category data.
 */

import Joi from "joi";
import { CATEGORY_CONSTANTS } from './category.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * Validation schema for category ID parameters.
 * Ensures that the category ID in request parameters matches the expected format.
 */
const categoryParamsSchema = Joi.object({
    categoryId: createIdSchema(CATEGORY_CONSTANTS?.CATEGORY_ID_PREFIX, CATEGORY_CONSTANTS?.CATEGORY_ID_MIN_LENGTH, CATEGORY_CONSTANTS?.CATEGORY_ID_MIN_LENGTH).required()
});

/**
 * Validation schema for category's body data.
 * Ensures that the body data for category-related requests is structured correctly.
 */
const categoryBodySchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        CATEGORY_CONSTANTS?.CATEGORY_NAME_MIN_LENGTH,
        CATEGORY_CONSTANTS?.CATEGORY_NAME_MAX_LENGTH,
    ),
});

/**
 * @namespace CategorySchema
 * @description Provides Joi validation schemas for category data in Express routes.
 * These schemas are essential for ensuring that data related to categories is correctly formatted and adheres to defined constraints.
 */
export const CategorySchema = {
    categoryBodySchema,
    categoryParamsSchema,
};