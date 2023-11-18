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
 * @requires ADMISSION_INFORMATION_CONSTANTS - Constants related to ID generation and validation.
 * @requires createIdSchema - Shared utility function for creating ID validation schemas.
 * @module AdmissionInformationValidationSchemas - Exported Joi validation schemas for admissionInformation post data.
 */

import Joi from "joi";
import { ADMISSION_INFORMATION_CONSTANTS } from './admissionInformation.constants.js';
import createIdSchema from "../../../../shared/createIdSchema.js";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * Joi validation schema for admissionInformation post parameters.
 * Validates the 'admissionInformationId' parameter in request using a custom ID schema.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating admissionInformation post parameters.
 */
const admissionInformationParamsValidationSchema = Joi.object({
    admissionInformationId: createIdSchema(
        ADMISSION_INFORMATION_CONSTANTS?.ADMISSION_INFORMATION_ID_PREFIX,
        ADMISSION_INFORMATION_CONSTANTS?.ADMISSION_INFORMATION_ID_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.ADMISSION_INFORMATION_ID_MAX_LENGTH
    ).required()
});

const newAdmissionInformationValidationSchema = Joi.object({
    title: JoiSchemaGenerators.createStringSchema(
        'title',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
    description: JoiSchemaGenerators.createStringSchema(
        'description',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MAX_LENGTH
    ).required(),
    formPrice: JoiSchemaGenerators.createStringSchema(
        'formPrice',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_FORM_PRICE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_FORM_PRICE_MAX_LENGTH
    ).required(),
    admissionFee: JoiSchemaGenerators.createStringSchema(
        'admissionFee',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_ADMISSION_FEE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_ADMISSION_FEE_MAX_LENGTH
    ).required(),
    lastFormSubmissionData: JoiSchemaGenerators.createStringSchema(
        'lastFormSubmissionData',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_LAST_FORM_SUBMISSION_DATE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_LAST_FORM_SUBMISSION_DATE_MAX_LENGTH
    ).required(),
    contact: JoiSchemaGenerators.createStringSchema(
        'contact',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_CONTACT_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_CONTACT_MAX_LENGTH
    ).required(),
});

const updateAdmissionInformationValidationSchema = Joi.object({
    title: JoiSchemaGenerators.createStringSchema(
        'title',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ),
    description: JoiSchemaGenerators.createStringSchema(
        'description',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_DESCRIPTION_MAX_LENGTH
    ),
    formPrice: JoiSchemaGenerators.createStringSchema(
        'formPrice',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_FORM_PRICE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_FORM_PRICE_MAX_LENGTH
    ),
    admissionFee: JoiSchemaGenerators.createStringSchema(
        'admissionFee',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_ADMISSION_FEE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_ADMISSION_FEE_MAX_LENGTH
    ),
    lastFormSubmissionData: JoiSchemaGenerators.createStringSchema(
        'lastFormSubmissionData',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_LAST_FORM_SUBMISSION_DATE_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_LAST_FORM_SUBMISSION_DATE_MAX_LENGTH
    ),
    contact: JoiSchemaGenerators.createStringSchema(
        'contact',
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_CONTACT_MIN_LENGTH,
        ADMISSION_INFORMATION_CONSTANTS?.PROPERTY_CONTACT_MAX_LENGTH
    ),
});

/**
 * @namespace AdmissionInformationValidationSchemas
 * @description Exported Joi validation schemas for admissionInformationPost data.
 *
 * - `admissionInformationParamsValidationSchema`: Schema for validating admissionInformation post ID parameters.
 */
export const AdmissionInformationValidationSchemas = {
    newAdmissionInformationValidationSchema,
    admissionInformationParamsValidationSchema,
    updateAdmissionInformationValidationSchema,
};