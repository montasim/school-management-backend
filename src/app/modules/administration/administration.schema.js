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
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * @description Joi validation schema for new administration data.
 * Validates the name, category, and designation fields of an administration entry.
 *
 * - `name`: A string representing the name of the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: A string representing the category of the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: A string representing the designation within the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * Each field is required for the validation to pass.
 */
const newAdministrationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required(),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ).required(),
    designation: JoiSchemaGenerators.createStringSchema(
        'designation',
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MAX_LENGTH
    ).required(),
});

/**
 * @description Joi validation schema for updating administration data.
 * Validates the fields for updating an existing administration entry.
 * Fields include name, category, and designation of the administration.
 *
 * This schema allows for partial updates, meaning each field is optional.
 * If provided, each field must adhere to the specified length constraints.
 *
 * - `name`: An optional string representing the updated name of the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: An optional string representing the updated category of the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: An optional string representing the updated designation within the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 */
const updateAdministrationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ),
    designation: JoiSchemaGenerators.createStringSchema(
        'designation',
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MAX_LENGTH
    )
});

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
    newAdministrationValidationSchema,
    administrationParamsValidationSchema,
    updateAdministrationValidationSchema,
};