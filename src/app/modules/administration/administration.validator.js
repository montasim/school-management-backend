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

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { AdministrationValidationSchemas } from "./administration.schema.js";
import { JoiSchemaGenerators}  from "../../../shared/joiSchemaGenerators.js";
import {
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG
} from "../../../constants/constants.js";
import validateDataWithFileSchema from "../../../helpers/validateDataWithFileSchema.js";

/**
 * Validates the details of an administration against a predefined schema.
 *
 * @async
 * @function validateNewAdministrationDetails
 * @description Middleware to validate the administration post's body and file data using Joi schemas.
 * @param {Object} req - Express request object containing the administration post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewAdministrationDetails = await validateDataWithFileSchema(
    AdministrationValidationSchemas.newAdministrationValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "image",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG]
    ),
    true
);

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
const validateUpdatedAdministrationDetails = await validateDataWithFileSchema(
    AdministrationValidationSchemas.updateAdministrationValidationSchema,
    JoiSchemaGenerators.fileValidationSchema(
        "image",
        [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG],
        [MIME_TYPE_PNG, MIME_TYPE_JPG]
    ),
    false
);

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
    validateAdministrationParams,
};