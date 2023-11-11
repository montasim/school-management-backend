/**
 * @fileoverview Joi Validation Schemas for Routine Data.
 *
 * This module defines Joi validation schemas for handling routine data in the application.
 * It includes schemas for validating the body and parameter data of routine-related requests.
 * These schemas are used to ensure that incoming data for routine operations conforms to the
 * expected format and types, leveraging the Joi library for schema definition and validation.
 * The schemas are exported and used in conjunction with middleware validators in the routes
 * handling routine operations to ensure data integrity and adherence to expected structures.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @requires constants - Application constants, including file extension types.
 * @module RoutineValidationSchemas - Exported Joi schemas for validating routine data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for routine's params data.
 */
const routineParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace RoutineValidationSchemas
 * @description Exported Joi validation schemas for routine data.
 *
 * - `routineBodySchema`: Validates the body data of a routine.
 * - `routineParamsSchema`: Validates the routine ID in request parameters.
 */
export const RoutineValidationSchemas = {
    routineParamsValidationSchema,
};