/**
 * @fileoverview Middleware utility for handling responses from service functions in Express routes.
 *
 * This module exports a utility function that abstracts the process of executing service functions,
 * handling their responses, and sending back the result to the client. It streamlines error handling
 * by catching exceptions and sending a standardized response with a 500 internal server error status.
 * The function is designed to be used in Express route handlers to manage service execution and
 * response handling in a consistent and centralized manner.
 *
 * @requires logger - Shared logging utility for error logging.
 * @requires STATUS_INTERNAL_SERVER_ERROR - Constant representing the internal server error HTTP status code.
 * @module handleServiceResponse - Function to execute service functions and handle their responses in Express routes.
 */

import logger from "../shared/logger.js";
import {STATUS_INTERNAL_SERVER_ERROR} from "../constants/constants.js";

/**
 * Executes the provided service function, handles its response, and sends
 * the result back to the client. In case of errors, sends a 500 status code.
 *
 * @function
 * @async
 * @param {Object} res - The Express response object.
 * @param {Function} serviceFunction - The service function to be executed.
 * @param {...*} params - Arguments to be passed to the service function.
 * @returns {Object} Express response object with the appropriate status code and data.
 * @example
 * // In a controller function:
 * await handleServiceResponse(res, someServiceFunction, arg1, arg2);
 */
const handleServiceResponse = async (res, serviceFunction, ...params) => {
    try {
        const { data, success, status, message } = await serviceFunction(...params);

        return res.status(status).json({ data, success, status, message });
    } catch (error) {
        logger.error(error);

        return res.status(STATUS_INTERNAL_SERVER_ERROR).json(error);
    }
};

export default handleServiceResponse;