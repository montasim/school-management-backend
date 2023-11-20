/**
 * @fileoverview Joi Validation Schemas for Designation Data.
 *
 * This module provides Joi schemas for validating various aspects of Designation data in the application.
 * It includes schemas for validating Designation parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. Additionally, it validates the body data of Designations,
 * like names and images. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across Designation-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires DESIGNATION_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module DesignationSchema - Exported Joi validation schemas for Designation data.
 */

import Joi from "joi";
import { DESIGNATION_CONSTANTS } from './designation.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * Joi validation schema for Designation ID parameters.
 * Validates the 'designationId' parameter in request using a custom ID schema.
 * @constant designationParamsSchema
 * @type {Joi.ObjectSchema}
 */
const designationParamsSchema = Joi.object({
    designationId: createIdSchema(
        DESIGNATION_CONSTANTS?.DESIGNATION_ID_PREFIX,
        DESIGNATION_CONSTANTS?.DESIGNATION_ID_MIN_LENGTH,
        DESIGNATION_CONSTANTS?.DESIGNATION_ID_MAX_LENGTH
    ).required()
});

/**
 * Joi validation schema for Designation's body data.
 * Validates the name field.
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * @constant designationBodySchema
 * @type {Joi.ObjectSchema}
 */
const designationBodySchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        DESIGNATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        DESIGNATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required()
});

/**
 * @namespace DesignationSchema
 * @description Exported Joi validation schemas for Designation data.
 * Provides structured validation for Designation data in routes, including for creating and updating designations.
 * - `designationBodySchema`: Validates the body data of a Designation.
 * - `designationParamsSchema`: Validates the Designation ID in request parameters.
 */
export const DesignationSchema = {
    designationBodySchema,
    designationParamsSchema,
};