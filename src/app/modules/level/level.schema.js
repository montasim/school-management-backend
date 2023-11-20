/**
 * @fileoverview Joi Validation Schemas for 'Level' Data.
 *
 * This file contains definitions for Joi validation schemas used to validate 'level' data
 * within the application. These schemas are crucial for ensuring that the data provided
 * for levels, such as names and IDs, adhere to the expected format and constraints.
 *
 * It includes:
 * - `levelBodySchema` for validating the body of level-related requests, ensuring that
 *   the level data (like name and image) meets specific criteria such as length and pattern.
 * - `levelParamsSchema` for validating the level ID provided in request parameters,
 *   ensuring it follows predefined ID format and length constraints.
 *
 * Utilizing these schemas in route middleware enhances the application's robustness by
 * preventing the processing of invalid or improperly formatted data.
 */

import Joi from "joi";
import createIdSchema from "../../../shared/createIdSchema.js";
import { LEVEL_CONSTANTS } from './level.constants.js';
import {JoiSchemaGenerators} from "../../../shared/joiSchemaGenerators.js";

/**
 * Joi validation schema for Level ID parameters.
 * Validates the 'levelId' parameter in request using a custom ID schema.
 * @constant levelParamsSchema
 * @type {Joi.ObjectSchema}
 */
const levelParamsSchema = Joi.object({
    levelId: createIdSchema(
        LEVEL_CONSTANTS?.LEVEL_ID_PREFIX,
        LEVEL_CONSTANTS?.LEVEL_ID_MIN_LENGTH,
        LEVEL_CONSTANTS?.LEVEL_ID_MAX_LENGTH
    ).required()
});

/**
 * @description Joi validation schema for level's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const levelBodySchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        LEVEL_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        LEVEL_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required()
});

/**
 * @namespace LevelSchema
 * @description Exported Joi validation schemas for level data.
 *
 * - `levelBodySchema`: Validates the body data of a level.
 * - `levelParamsSchema`: Validates the level ID in request parameters.
 */
export const LevelSchema = {
    levelBodySchema,
    levelParamsSchema,
};