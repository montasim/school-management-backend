/**
 * @fileoverview Joi Validation Schemas for AdmissionInformation Posts.
 *
 * This module provides Joi schemas for validating various aspects of admissionInformation posts in the application.
 * It includes schemas for validating admissionInformation post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across admissionInformation-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module AdmissionInformationValidationSchemas - Exported Joi validation schemas for admissionInformation post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './admissionInformation.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";

/**
 * Joi validation schema for admissionInformation post parameters.
 * Validates the 'admissionInformationId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating admissionInformation post parameters.
 */
const admissionInformationParamsValidationSchema = Joi.object({
    admissionInformationId: createIdSchema(ID_CONSTANTS?.ADMISSION_INFORMATION_PREFIX, ID_CONSTANTS).required()
});

/**
 * @namespace AdmissionInformationValidationSchemas
 * @description Exported Joi validation schemas for admissionInformationPost data.
 *
 * - `admissionInformationParamsValidationSchema`: Schema for validating admissionInformation post ID parameters.
 */
export const AdmissionInformationValidationSchemas = {
    admissionInformationParamsValidationSchema,
};