/**
 * @fileoverview Joi Validation Schemas for Others Information Posts.
 *
 * This module provides Joi schemas for validating different aspects of others information entities in the application.
 * It includes schemas for validating others information post IDs, ensuring adherence to expected formats and constraints,
 * and for validating the content of others information posts, such as title, description, fees, submission dates, and contact details.
 * These schemas are essential for maintaining data integrity and ensuring that others information data complies with the specified requirements.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires OTHERS_INFORMATION_CONSTANTS - Constants defining validation criteria for others information properties.
 * @requires createIdSchema - Utility function to create a Joi schema for ID validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @module OthersInformationValidationSchemas - Exported Joi validation schemas for others information data.
 */

import Joi from "joi";
import { OTHERS_INFORMATION_CONSTANTS } from './othersInformation.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * Joi validation schema for othersInformation post parameters.
 * Validates the 'othersInformationId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating othersInformation post parameters.
 */
const othersInformationParamsValidationSchema = Joi.object({
    othersInformationId: createIdSchema(
        OTHERS_INFORMATION_CONSTANTS?.OTHERS_INFORMATION_ID_PREFIX,
        OTHERS_INFORMATION_CONSTANTS?.OTHERS_INFORMATION_ID_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.OTHERS_INFORMATION_ID_MAX_LENGTH
    ).required()
});

/**
 * Joi schema for validating new others information post details.
 * Ensures all required fields are present and adhere to specified length constraints.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating new others information parameters.
 */
const newOthersInformationValidationSchema = Joi.object({
    title: JoiSchemaGenerators.createStringSchema(
        'title',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ).required(),
    description: JoiSchemaGenerators.createStringSchema(
        'description',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MAX_LENGTH
    ).required(),
});

/**
 * Joi schema for validating updated others information post details.
 * Allows optional updates to each field while enforcing their length constraints.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating update others information parameters.
 */
const updateOthersInformationValidationSchema = Joi.object({
    title: JoiSchemaGenerators.createStringSchema(
        'title',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ),
    description: JoiSchemaGenerators.createStringSchema(
        'description',
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MIN_LENGTH,
        OTHERS_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MAX_LENGTH
    ),
});

/**
 * @namespace OthersInformationValidationSchemas
 * @description Provides Joi validation schemas for handling others information data.
 * Includes schemas for validating new and updated others information details and others information ID parameters.
 */
export const OthersInformationValidationSchemas = {
    newOthersInformationValidationSchema,
    othersInformationParamsValidationSchema,
    updateOthersInformationValidationSchema,
};