/**
 * @fileoverview Middleware Validators for OthersInformation Post Data.
 *
 * This module contains middleware functions for validating othersInformation post data in Express routes.
 * It leverages Joi schemas defined in the OthersInformationSchema module to validate the format and content
 * of othersInformation post-related data, such as othersInformation post IDs in request parameters. These validators ensure
 * that incoming data for othersInformation posts adheres to the expected structure and types before further processing.
 * Each validator function is designed to be used as Express middleware, checking the validity of the
 * data and passing control to the next middleware if validation succeeds, or sending an error response
 * if it fails.
 *
 * @requires validateDataWithSchema - Generic utility to validate data with a Joi schema.
 * @requires OthersInformationValidationSchemas - Schemas for validating othersInformation post data.
 * @module OthersInformationValidationService - Exported validators for othersInformation post route handling.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { OthersInformationValidationSchemas } from "./othersInformation.schema.js";

/**
 * Validates the details of a othersInformation post against a predefined schema.
 *
 * @async
 * @function validateOthersInformationDetails
 * @description Middleware to validate the othersInformation post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the othersInformation post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateNewOthersInformationDetails = await validateDataWithSchema(OthersInformationValidationSchemas.newOthersInformationValidationSchema, 'body');

/**
 * Validates the details of a othersInformation post against a predefined schema.
 *
 * @async
 * @function validateOthersInformationDetails
 * @description Middleware to validate the othersInformation post's body data using Joi schemas.
 * @param {Object} req - Express request object containing the othersInformation post's details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateUpdateOthersInformationDetails = await validateDataWithSchema(OthersInformationValidationSchemas.updateOthersInformationValidationSchema, 'body');

/**
 * Validates the othersInformation post ID in request parameters.
 *
 * @async
 * @function validateOthersInformationParams
 * @description Middleware to validate the othersInformation post's ID in the request parameters.
 * @param {Object} req - Express request object containing the othersInformation post ID.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateOthersInformationParams = await validateDataWithSchema(OthersInformationValidationSchemas.othersInformationParamsValidationSchema, 'params');

/**
 * @namespace OthersInformationValidationService
 * @description Provides validation services for othersInformation-related data in routes. This includes validation for othersInformation details, othersInformation files, and othersInformation parameters.
 */
export const OthersInformationValidationService = {
    validateNewOthersInformationDetails,
    validateUpdateOthersInformationDetails,
    validateOthersInformationParams,
};