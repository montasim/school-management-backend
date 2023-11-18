/**
 * @fileoverview Middleware Validators for AdmissionInformation Post Data.
 *
 * This module contains middleware functions for validating admissionInformation post data in Express routes.
 * It leverages Joi schemas defined in the AdmissionInformationSchema module to validate the format and content
 * of admissionInformation post-related data, such as admissionInformation post IDs in request parameters. These validators ensure
 * that incoming data for admissionInformation posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires AdmissionInformationValidationSchemas - Schemas for validating admissionInformation post data.
 * @module AdmissionInformationValidationService - Exported validators for admissionInformation post route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { AdmissionInformationValidationSchemas } from "./admissionInformation.schema.js";
import { JoiSchemaGenerators}  from "../../../../shared/joiSchemaGenerators.js";

/**
 * Validates the details of a admissionInformation post against a predefined schema.
 *
 * @async
 * @function validateAdmissionInformationDetails
 * @description Middleware to validate the admissionInformation post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the admissionInformation post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateAdmissionInformationDetails = await validateDataWithSchema(JoiSchemaGenerators.admissionInformationBodyValidationSchema(), 'body');

/**
 * Validates the admissionInformation post ID in request parameters.
 *
 * @async
 * @function validateAdmissionInformationParams
 * @description Middleware to validate the admissionInformation post's ID in the request parameters.
 * @param {Object} req - Express request object containing the admissionInformation post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateAdmissionInformationParams = await validateDataWithSchema(AdmissionInformationValidationSchemas.admissionInformationParamsValidationSchema, 'params');

/**
 * @namespace AdmissionInformationValidationService
 * @description Provides validation services for admissionInformation-related data in routes. This includes validation for admissionInformation details, admissionInformation files, and admissionInformation parameters.
 */
export const AdmissionInformationValidationService = {
    validateAdmissionInformationDetails,
    validateAdmissionInformationParams,
};