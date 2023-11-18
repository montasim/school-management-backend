/**
 * @fileoverview Middleware Validators for Administration Data.
 *
 * This module contains middleware functions for validating administration data in Express routes.
 * It leverages Joi schemas defined in the AdministrationSchema module to validate the format and content
 * of administration-related data, including administration details and administration ID in request parameters.
 * These validators ensure that incoming data for administrations adheres to the expected structure and types
 * before further processing. Each validator function is designed to be used as Express middleware,
 * checking the validity of the data and passing control to the next middleware if validation succeeds,
 * or sending an error response if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires AdministrationValidationSchemas - Schemas for validating administration data.
 * @module AdministrationValidationService - Exported validators for administration route handling.
 */

import Joi from "joi";
import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { AdministrationValidationSchemas } from "./administration.schema.js";
import { JoiSchemaGenerators}  from "../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../constants/constants.js";
import { ADMINISTRATION_CONSTANTS } from "./administration.constants.js";

/**
 * @description Joi validation schema for new administration data.
 * Validates the name, category, and designation fields of an administration entry.
 *
 * - `name`: A string representing the name of the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: A string representing the category of the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: A string representing the designation within the administration, with a minimum length of 3 and a maximum length of 50 characters.
 * Each field is required for the validation to pass.
 */
const newAdministrationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required(),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ).required(),
    designation: JoiSchemaGenerators.createStringSchema(
        'designation',
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MAX_LENGTH
    ).required(),
});

/**
 * @description Joi validation schema for updating administration data.
 * Validates the fields for updating an existing administration entry.
 * Fields include name, category, and designation of the administration.
 *
 * This schema allows for partial updates, meaning each field is optional.
 * If provided, each field must adhere to the specified length constraints.
 *
 * - `name`: An optional string representing the updated name of the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `category`: An optional string representing the updated category of the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 * - `designation`: An optional string representing the updated designation within the administration.
 *   If provided, it must have a minimum length of 3 and a maximum length of 50 characters.
 */
const updateAdministrationValidationSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ),
    category: JoiSchemaGenerators.createStringSchema(
        'category',
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_CATEGORY_MAX_LENGTH
    ),
    designation: JoiSchemaGenerators.createStringSchema(
        'designation',
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MIN_LENGTH,
        ADMINISTRATION_CONSTANTS?.PROPERTY_DESIGNATION_MAX_LENGTH
    )
});

/**
 * Validates the details of an administration against a predefined schema.
 *
 * @async
 * @function validateNewAdministrationDetails
 * @description Middleware to validate the administration post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the administration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewAdministrationDetails = await validateDataWithSchema(newAdministrationValidationSchema, 'body');

/**
 * Validates the details of an administration against a predefined schema.
 *
 * @async
 * @function validateUpdatedAdministrationDetails
 * @description Middleware to validate the administration post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the administration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateUpdatedAdministrationDetails = await validateDataWithSchema(updateAdministrationValidationSchema, 'body');

/**
 * Validates the details of an administration post against a predefined schema.
 *
 * @async
 * @function validateAdministrationDetails
 * @description Middleware to validate the administration post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the administration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateAdministrationFile = await validateDataWithSchema(JoiSchemaGenerators.fileValidationSchema(
    "image",
    [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
    [MIME_TYPE_PNG, MIME_TYPE_JPG]
), "file");

/**
 * Validates the administration post ID in request parameters.
 *
 * @async
 * @function validateAdministrationParams
 * @description Middleware to validate the administration post's ID in the request parameters.
 * @param {Object} req - Express request object containing the administration post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateAdministrationParams = await validateDataWithSchema(AdministrationValidationSchemas.administrationParamsValidationSchema, 'params');

/**
 * @namespace AdministrationValidationService
 * @description Provides validation services for administration-related data in routes.
 * This includes validation for administration details, administration files, and administration parameters.
 */
export const AdministrationValidationService = {
    validateNewAdministrationDetails,
    validateUpdatedAdministrationDetails,
    validateAdministrationFile,
    validateAdministrationParams,
};