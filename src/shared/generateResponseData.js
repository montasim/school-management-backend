/**
 * @fileoverview Utility function for generating standardized response objects.
 *
 * This module defines a utility function that is used across the application to create
 * standardized response objects. The function assembles a response object with the given
 * data, success status, HTTP status code, and a message. This standardization helps maintain
 * consistency in the format of responses sent back to clients, thereby enhancing the API
 * usability and predictability. The function also includes error handling, logging any
 * exceptions that may occur during the response object generation.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module generateResponseData - Function to create standardized response objects for services.
 */

import logger from "./logger.js";

/**
 * Generates a standardized response object for service functions.
 *
 * @param {Object} data - The data to return.
 * @param {boolean} success - Indication if the operation was successful.
 * @param {number} status - The HTTP status code.
 * @param {string} message - A descriptive message about the response.
 * @returns {Object} - The standardized response object.
 */
const generateResponseData = (data, success, status, message) => {
    try {
        return { data, success, status, message };
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default generateResponseData;