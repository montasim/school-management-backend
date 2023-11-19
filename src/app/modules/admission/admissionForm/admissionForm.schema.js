/**
 * @fileoverview Joi Validation Schemas for AdmissionForm Data.
 *
 * This module provides a collection of Joi validation schemas specifically designed for validating
 * data related to admission forms in an educational or institutional context. It utilizes Joi, a robust
 * schema description language and validator for JavaScript, to define rules for data structure and content.
 * These schemas ensure that incoming data for admissionForm operations, such as creating a new form or
 * processing form parameters, conforms to the expected format and meets necessary constraints.
 * The schemas are utilized in route handlers and middleware to validate request data, thereby ensuring
 * data integrity and compliance with the application's standards.
 *
 * Dependencies:
 * - Joi: Used for creating and enforcing validation schemas.
 * - JoiSchemaGenerators: Utility module for generating common Joi schema patterns.
 * - Constants: Provides application-wide constants including file extension types.
 *
 * The module exports the schemas for easy incorporation into route validation middleware,
 * providing a centralized approach to data validation in admission form-related operations.
 */


import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../../constants/constants.js";
import { ADMISSION_FORM_CONSTANTS } from "./admissionForm.constants.js";

/**
 * Validation schema for creating a new admission form.
 * Ensures the 'title' field meets specified length requirements and is required.
 */
const newAdmissionFormValidationSchema = Joi.object({
    title: JoiSchemaGenerators?.createStringSchema(
        "title",
        ADMISSION_FORM_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        ADMISSION_FORM_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
})

/**
 * Validation schema for admission form parameters.
 * Validates the file name, ensuring it adheres to the defined file extension type.
 */
const admissionFormParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * Exported Joi validation schemas for admissionForm data.
 * - `newAdmissionFormValidationSchema`: Schema for validating the body of a new admission form request.
 * - `admissionFormParamsValidationSchema`: Schema for validating admission form-related parameters in requests.
 */
export const AdmissionFormValidationSchemas = {
    newAdmissionFormValidationSchema,
    admissionFormParamsValidationSchema,
};