/**
 * @fileoverview Joi Validation Schemas for Admission Information Posts.
 *
 * This module provides Joi schemas for validating different aspects of admission information entities in the application.
 * It includes schemas for validating admission information post IDs, ensuring adherence to expected formats and constraints,
 * and for validating the content of admission information posts, such as title, description, fees, submission dates, and contact details.
 * These schemas are essential for maintaining data integrity and ensuring that admission information data complies with the specified requirements.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires ADMISSION_INFORMATION_CONSTANTS - Constants defining validation criteria for admission information properties.
 * @requires createIdSchema - Utility function to create a Joi schema for ID validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @module AdmissionInformationValidationSchemas - Exported Joi validation schemas for admission information data.
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

/**
 * Joi schema for validating new admission information post details.
 * Ensures all required fields are present and adhere to specified length constraints.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating new admission information parameters.
 */
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

/**
 * Joi schema for validating updated admission information post details.
 * Allows optional updates to each field while enforcing their length constraints.
 *
 * @type {Joi.ObjectSchema} - Joi schema object for validating update admission information parameters.
 */
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
 * @description Provides Joi validation schemas for handling admission information data.
 * Includes schemas for validating new and updated admission information details and admission information ID parameters.
 */
export const AdmissionInformationValidationSchemas = {
    newAdmissionInformationValidationSchema,
    admissionInformationParamsValidationSchema,
    updateAdmissionInformationValidationSchema,
};