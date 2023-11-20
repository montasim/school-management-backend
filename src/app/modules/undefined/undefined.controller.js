/**
 * @fileoverview Undefined Controller for Express Application.
 *
 * This file contains the undefinedController function which handles requests
 * to undefined API endpoints in the school management API system.
 * It provides a standard response for undefined routes and logs any internal
 * server errors.
 */

import logger from "../../../shared/logger.js";
import {
    SERVER_DOWN_MESSAGE,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
} from "../../../constants/constants.js";
import generateResponseData from "../../../shared/generateResponseData.js";

/**
 * Handles requests to undefined API endpoints.
 *
 * This asynchronous function is designed to respond to requests made to
 * undefined API endpoints in the school management API. It sends back a
 * standardized JSON response indicating that the requested endpoint is not found.
 * In case of internal server errors, it logs the error and sends a server down message.
 *
 * @async
 * @function undefinedController
 * @description Controller for handling requests to undefined API endpoints.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object used to send data back to the client.
 * @returns {Promise<express.Response>} A promise that resolves to an Express response object.
 */
const undefinedController = async (req, res) => {
    try {
        return res?.status(STATUS_NOT_FOUND).json(
            generateResponseData(
                {},
                false,
                STATUS_NOT_FOUND,
                "The API endpoint you are trying to access is not defined 😁"
            )
        );
    } catch (error) {
        logger.error(error);

        return res?.status(STATUS_INTERNAL_SERVER_ERROR).json(
            generateResponseData(
                {},
                false,
                STATUS_INTERNAL_SERVER_ERROR,
                SERVER_DOWN_MESSAGE
            )
        );
    }
};

export default undefinedController;