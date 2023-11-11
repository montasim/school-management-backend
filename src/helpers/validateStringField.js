/**
 * @fileoverview String Field Validation Utility.
 *
 * This module exports a utility function for validating string fields against Joi schemas.
 * The function is designed to ensure that a given string field adheres to specific validation
 * rules such as minimum and maximum length. It uses a Joi string schema generator for validation
 * and is flexible enough to validate any string field by specifying its name, the actual value,
 * and the length constraints. The function takes an Express.js response object to send an error
 * response directly if validation fails. This utility aids in maintaining data integrity and
 * providing immediate feedback on form inputs or query parameters in the application.
 *
 * @requires JoiSchemaGenerators - Utility functions for generating Joi validation schemas.
 * @requires logger - Shared logging utility for error handling.
 * @requires constants - Application constants, including HTTP status codes.
 * @requires generateResponseData - Function for generating standardized response data.
 * @module validateStringField - Utility function for validating string fields.
 */

import { JoiSchemaGenerators } from '../shared/joiSchemaGenerators.js';
import logger from '../shared/logger.js';
import { STATUS_BAD_REQUEST } from '../constants/constants.js';
import generateResponseData from '../shared/generateResponseData.js';

/**
 * Validates a given field against a Joi string schema.
 *
 * @param {Object} res - The response object provided by Express.js.
 * @param {string} fieldName - The name of the field to be validated.
 * @param {string} fieldValue - The value of the field to be validated.
 * @param {number} minLength - The minimum length of the field.
 * @param {number} maxLength - The maximum length of the field.
 * @returns {Object|undefined} - Returns a response object with a status and message if validation fails,
 *                               or undefined if validation is successful.
 */
const validateStringField = (res, fieldName, fieldValue, minLength, maxLength) => {
    try {
        const schema = JoiSchemaGenerators.createStringSchema(fieldName, minLength, maxLength);
        const { error } = schema.validate(fieldValue);

        if (error)
            return res.status(STATUS_BAD_REQUEST).send(generateResponseData({}, false, STATUS_BAD_REQUEST, error.details[0].message));
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default validateStringField;