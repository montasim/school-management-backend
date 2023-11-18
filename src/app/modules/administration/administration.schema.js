/**
 * @fileoverview Joi Validation Schemas for Administration Posts.
 *
 * This module provides Joi schemas for validating various aspects of administration posts in the application.
 * It includes schemas for validating administration post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across administration-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module AdministrationValidationSchemas - Exported Joi validation schemas for administration post data.
 */

import Joi from "joi";
import { ADMINISTRATION_CONSTANTS } from './administration.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

/**
 * Joi validation schema for administration post parameters.
 * Validates the 'administrationId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating administration post parameters.
 */
const administrationParamsValidationSchema = Joi.object({
    administrationId: createIdSchema(
        ADMINISTRATION_CONSTANTS?.ADMINISTRATION_ID_PREFIX,
        ADMINISTRATION_CONSTANTS?.ADMINISTRATION_ID_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.ADMINISTRATION_ID_MAX_LENGTH,
    ).required()
});

/**
 * @namespace AdministrationValidationSchemas
 * @description Exported Joi validation schemas for administrationPost data.
 *
 * - `administrationParamsValidationSchema`: Schema for validating administration post ID parameters.
 */
export const AdministrationValidationSchemas = {
    administrationParamsValidationSchema,
};