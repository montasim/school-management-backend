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
