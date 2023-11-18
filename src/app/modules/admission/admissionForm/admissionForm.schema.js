/**
 * @fileoverview Joi Validation Schemas for AdmissionForm Data.
 *
 * This module defines Joi validation schemas for handling admissionForm data in the application.
 * It includes schemas for validating the body and parameter data of admissionForm-related requests.
 * These schemas are used to ensure that incoming data for admissionForm operations conforms to the
 * expected format and types, leveraging the Joi library for schema definition and validation.
 * The schemas are exported and used in conjunction with middleware validators in the routes
 * handling admissionForm operations to ensure data integrity and adherence to expected structures.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @requires constants - Application constants, including file extension types.
 * @module AdmissionFormValidationSchemas - Exported Joi schemas for validating admissionForm data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../../constants/constants.js";

/**
 * @description Joi validation schema for admissionForm's params data.
 */
const admissionFormParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace AdmissionFormValidationSchemas
 * @description Exported Joi validation schemas for admissionForm data.
 *
 * - `admissionFormBodySchema`: Validates the body data of a admissionForm.
 * - `admissionFormParamsSchema`: Validates the admissionForm ID in request parameters.
 */
export const AdmissionFormValidationSchemas = {
    admissionFormParamsValidationSchema,
};