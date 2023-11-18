/**
 * @fileoverview Joi Validation Schemas for Student Posts.
 *
 * This module provides Joi schemas for validating various aspects of student posts in the application.
 * It includes schemas for validating student post parameters such as IDs, ensuring they adhere to
 * the expected format and constraints. The schemas utilize custom validation functions and constants
 * to provide accurate and efficient validation. Centralizing these schemas in a single module
 * allows for consistent validation logic across student-related routes and services.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module StudentValidationSchemas - Exported Joi validation schemas for student post data.
 */

import Joi from "joi";
import { ID_CONSTANTS } from './student.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

/**
 * Joi validation schema for student post parameters.
 * Validates the 'studentId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating student post parameters.
 */
const studentParamsValidationSchema = Joi.object({
    studentId: createIdSchema(ID_CONSTANTS?.STUDENT_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});

/**
 * @namespace StudentValidationSchemas
 * @description Exported Joi validation schemas for studentPost data.
 *
 * - `studentParamsValidationSchema`: Schema for validating student post ID parameters.
 */
export const StudentValidationSchemas = {
    studentParamsValidationSchema,
};