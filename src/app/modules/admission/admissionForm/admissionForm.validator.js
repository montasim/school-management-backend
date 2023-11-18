/**
 * @fileoverview Middleware Validators for AdmissionForm Data.
 *
 * This module contains middleware functions for validating admissionForm-related data in Express routes.
 * It leverages Joi schemas defined in the AdmissionFormValidationSchemas module to validate the format and content
 * of request bodies and parameters specific to admissionForm operations. These validators ensure that incoming
 * data for admissionForms adheres to the expected structure and types before further processing. Each validator
 * function is designed to be used as Express middleware, checking the validity of the data and passing control
 * to the next middleware if validation succeeds, or sending an error response if it fails.
 *
 * @requires AdmissionFormValidationSchemas - Schemas for validating admissionForm data.
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @module AdmissionFormValidationService - Exported validators for admissionForm route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { AdmissionFormValidationSchemas } from "./admissionForm.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for admissionForm's ID in request parameters.
 *
 * Uses the admissionFormParamsSchema from the AdmissionFormSchema to validate
 * the admissionForm ID provided in the request parameters. This ensures that
 * the admissionForm ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateAdmissionFormParams = validateDataWithSchema(AdmissionFormValidationSchemas.admissionFormParamsValidationSchema, 'params');

/**
 * @namespace AdmissionFormValidationService
 * @description Exported admissionForm validators to be used in routes.
 */
export const AdmissionFormValidationService = {
    validateAdmissionFormParams,
};