/**
 * @fileoverview Validation Error Handler Utility.
 *
 * This module provides a utility function to handle and respond to Joi validation errors in an Express application.
 * It formats the error messages received from Joi validation and sends them back to the client in a structured
 * response. This utility helps in maintaining a consistent structure for validation error responses throughout
 * the application, improving error handling, and providing clear feedback to the client.
 *
 * @requires logger - Shared logging utility for error handling.
 * @requires constants - Application constants, including HTTP status codes.
 * @module handleValidationError - Function to handle and respond to Joi validation errors.
 */

import logger from "../shared/logger.js";
import { STATUS_BAD_REQUEST } from "../constants/constants.js";

/**
 * Sends a response with validation error details.
 *
 * @function
 * @param {Object} res - The Express response object.
 * @param {Object} error - Joi validation error object.
 * @returns {Object} Express response object with status code and error messages.
 * @example
 * // In a middleware or controller function:
 * if (validationError) {
 *     return handleValidationError(res, validationError);
 * }
 */
const handleValidationError = (res, error) => {
    try {
        const messages = error.details.map(detail => detail.message);

        return res.status(STATUS_BAD_REQUEST).json({
            data: {},
            success: false,
            status: STATUS_BAD_REQUEST,
            message: messages,
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json(error);
    }
};

export default handleValidationError;