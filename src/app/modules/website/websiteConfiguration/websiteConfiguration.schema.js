/**
 * @fileoverview Joi Validation Schemas for WebsiteConfiguration Posts.
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
 * @module WebsiteConfigurationValidationSchemas - Exported Joi validation schemas for administration post data.
 */

import Joi from "joi";
import { WEBSITE_CONFIGURATION_CONSTANTS } from './websiteConfiguration.constants.js';
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * @description Joi validation schema for new website configuration data.
 * Validates the name, category, and designation fields of a website configuration entry.
 *
 * - `name`: A string representing the name of the website configuration, with a minimum length of 3 and a maximum length of 50 characters.
 * - `slogan`: A string representing the slogan of the website configuration, with a minimum length of 3 and a maximum length of 50 characters.
 * Each field is required for the validation to pass.
 */
const newWebsiteConfigurationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required(),
    slogan: JoiSchemaGenerators.createStringSchema(
        'slogan',
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_SLOGAN_MIN_LENGTH,
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_SLOGAN_MAX_LENGTH
    ).required(),
});

/**
 * @description Joi validation schema for updating website configuration data.
 * Validates the fields for updating an existing website configuration entry.
 * Fields include name, category, and designation of the website configuration.
 *
 * This schema allows for partial updates, meaning each field is optional.
 * If provided, each field must adhere to the specified length constraints.
 *
 * - `name`: An optional string representing the updated name of the website configuration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `slogan`: An optional string representing the updated slogan of the website configuration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
*/
const updateWebsiteConfigurationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ),
    slogan: JoiSchemaGenerators.createStringSchema(
        'slogan',
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_SLOGAN_MIN_LENGTH,
        WEBSITE_CONFIGURATION_CONSTANTS?.PROPERTY_SLOGAN_MAX_LENGTH
    ),
});

/**
 * @namespace WebsiteConfigurationValidationSchemas
 * @description Exported Joi validation schemas for website configuration data.
 *
 * - `administrationParamsValidationSchema`: Schema for validating website configuration post ID parameters.
 */
export const WebsiteConfigurationValidationSchemas = {
    newWebsiteConfigurationValidationSchema,
    updateWebsiteConfigurationValidationSchema,
};