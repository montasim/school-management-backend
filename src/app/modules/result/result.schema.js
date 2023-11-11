/**
 * @fileoverview Joi Validation Schemas for Result Data.
 *
 * This module defines Joi validation schemas for handling result data in the application.
 * It includes schemas for validating the body and parameter data of result-related requests.
 * These schemas are used to ensure that incoming data for result operations conforms to the
 * expected format and types, leveraging the Joi library for schema definition and validation.
 * The schemas are exported and used in conjunction with middleware validators in the routes
 * handling result operations to ensure data integrity and adherence to expected structures.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @requires constants - Application constants, including file extension types.
 * @module ResultValidationSchemas - Exported Joi schemas for validating result data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for result's params data.
 */
const resultParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace ResultValidationSchemas
 * @description Exported Joi validation schemas for result data.
 *
 * - `resultBodySchema`: Validates the body data of a result.
 * - `resultParamsSchema`: Validates the result ID in request parameters.
 */
export const ResultValidationSchemas = {
    resultParamsValidationSchema,
};