/**
 * @fileoverview Joi Validation Schemas for Others Information Category Data.
 *
 * This module provides Joi schemas for validating others information category-related data in Express routes.
 * It offers a comprehensive way to ensure that data related to categories, both in request parameters (like IDs)
 * and in the request body, adheres to the expected formats and constraints.
 *
 * The validation schemas help maintain consistency and integrity of data throughout the application.
 * They are particularly useful in routes handling others information category creation, updates, and retrieval by ensuring
 * that only valid and well-formed data is processed. This is crucial for both functionality and security.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires CATEGORY_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Utility function for creating ID validation schemas.
 * @module CategorySchema - Exported Joi validation schemas for others information category data.
 */

import Joi from "joi";
import { OTHERS_INFORMATION_CATEGORY_CONSTANTS } from './othersInformationCategory.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import {JoiSchemaGenerators} from "../../../shared/joiSchemaGenerators.js";
import {CATEGORY_CONSTANTS} from "../category/category.constants.js";

/**
 * Validation schema for othersInformationCategory ID parameters.
 * Ensures that the othersInformationCategory ID in request parameters matches the expected format.
 */
const othersInformationCategoryParamsSchema = Joi.object({
    othersInformationCategoryId: createIdSchema(
        OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_ID_PREFIX,
        OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_ID_MIN_LENGTH,
        OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_ID_MAX_LENGTH
    ).required()
});

/**
 * @description Joi validation schema for othersInformationCategory's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 */
const othersInformationCategoryBodySchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_NAME_MIN_LENGTH,
        OTHERS_INFORMATION_CATEGORY_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_NAME_MAX_LENGTH,
    ),
});

/**
 * @namespace OthersInformationCategorySchema
 * @description Exported Joi validation schemas for othersInformationCategory data.
 *
 * - `othersInformationCategoryBodySchema`: Validates the body data of a othersInformationCategory.
 * - `othersInformationCategoryParamsSchema`: Validates the othersInformationCategory ID in request parameters.
 */
export const OthersInformationCategorySchema = {
    othersInformationCategoryBodySchema,
    othersInformationCategoryParamsSchema,
};