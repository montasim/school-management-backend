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
import { STUDENT_CONSTANTS } from './student.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * @description Joi validation schema for new student data.
 * Validates the name, category, and designation fields of a student entry.
 *
 * - `name`: A string representing the name of the student, with a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: A string representing the category of the student, with a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: A string representing the designation within the student, with a minimum length of 3 and a maximum length of 50 characters.
 * Each field is required for the validation to pass.
 */
const newStudentValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        STUDENT_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        STUDENT_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required(),
    level: JoiSchemaGenerators.createStringSchema(
        'level',
        STUDENT_CONSTANTS?.PROPERTY_LEVEL_MIN_LENGTH,
        STUDENT_CONSTANTS?.PROPERTY_LEVEL_MAX_LENGTH
    ).required(),
});

/**
 * @description Joi validation schema for updating student data.
 * Validates the fields for updating an existing student entry.
 * Fields include name, category, and designation of the student.
 *
 * This schema allows for partial updates, meaning each field is optional.
 * If provided, each field must adhere to the specified length constraints.
 *
 * - `name`: An optional string representing the updated name of the student.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: An optional string representing the updated category of the student.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: An optional string representing the updated designation within the student.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 */
const updateStudentValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        STUDENT_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        STUDENT_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ),
    level: JoiSchemaGenerators.createStringSchema(
        'level',
        STUDENT_CONSTANTS?.PROPERTY_LEVEL_MIN_LENGTH,
        STUDENT_CONSTANTS?.PROPERTY_LEVEL_MAX_LENGTH
    ),
});

/**
 * Joi validation schema for student post parameters.
 * Validates the 'studentId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating student post parameters.
 */
const studentParamsValidationSchema = Joi.object({
    studentId: createIdSchema(
        STUDENT_CONSTANTS?.STUDENT_ID_PREFIX,
        STUDENT_CONSTANTS?.STUDENT_ID_MIN_LENGTH,
        STUDENT_CONSTANTS?.STUDENT_ID_MAX_LENGTH,
    ).required()
});

/**
 * @namespace StudentValidationSchemas
 * @description Exported Joi validation schemas for studentPost data.
 *
 * - `studentParamsValidationSchema`: Schema for validating student post ID parameters.
 */
export const StudentValidationSchemas = {
    newStudentValidationSchema,
    studentParamsValidationSchema,
    updateStudentValidationSchema,
};