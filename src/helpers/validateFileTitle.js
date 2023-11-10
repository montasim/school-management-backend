/**
 * @fileoverview File Title Validation Utility.
 *
 * This module defines a utility function for validating the title of a file against a predefined Joi schema.
 * It is designed to ensure that the file title adheres to specific validation rules, such as length, character
 * types, and format. The function takes an Express.js response object and a file title, and performs validation
 * using the Joi schema generator. If the validation fails, it sends a response with the appropriate error message
 * and status code. In case of exceptions during the validation process, these are logged and handled gracefully.
 * This utility aids in maintaining data integrity and providing user feedback for form inputs in the application.
 *
 * @requires JoiSchemaGenerators - Utility functions for generating Joi validation schemas.
 * @requires constants - Application constants, including HTTP status codes.
 * @requires generateResponseData - Function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @module validateFileTitle - Utility function for validating file titles.
 */

import { JoiSchemaGenerators } from "../shared/joiSchemaGenerators.js";
import { STATUS_BAD_REQUEST } from "../constants/constants.js";
import generateResponseData from "../shared/generateResponseData.js";
import logger from "../shared/logger.js";

/**
 * Validates the title of a file against a predefined Joi schema.
 *
 * @param {Object} res - The response object provided by Express.js.
 * @param {string} fileTitle - The title of the file to be validated.
 * @returns {Object|undefined} - Returns a response object with a status and message if validation fails,
 *                               or undefined if validation is successful.
 * @throws {Error} - Throws an error if there's an issue within the try block (e.g., issues with the Joi validation schema).
 */
const validateFileTitle = (res, fileTitle) => {
    try {
        const { error } = JoiSchemaGenerators.fileTitleValidationSchema().validate(fileTitle);

        if (error) {
            return res.status(STATUS_BAD_REQUEST).send(generateResponseData({}, false, STATUS_BAD_REQUEST, error.details[0].message));
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default validateFileTitle;