/**
 * @fileoverview Controller for the Index Route of the Application.
 *
 * This module exports a controller function for handling requests to the index route of the application.
 * The primary function, `indexController`, sends a predefined response back to the client, encapsulating
 * essential data about the server status. It employs a try-catch block to gracefully handle any unexpected
 * errors that may occur during the execution of the request handler. In case of an error, it logs the error
 * using a shared logger module and returns an error message along with the internal server error status.
 * This controller is fundamental for providing a basic response endpoint for the application, often used
 * for health checks or initial server validation.
 *
 * @requires logger - Shared logger module for logging errors.
 * @requires constants - Constants module for predefined messages and status codes.
 * @module indexController - Exported controller function for the index route.
 */

import logger from "../../../shared/logger.js";
import { SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR } from "../../../constants/constants.js";
import returnData from "./index.constants.js";

/**
 * Controller function for handling requests to the index route.
 * This function responds to incoming requests on the index route with a predefined message, indicating
 * the status of the server. It tries to send a successful response back to the client. In case of any
 * error during this process, the function catches the error, logs it for debugging purposes, and returns
 * an appropriate error response. This ensures that any request to the index route is responded to
 * consistently, providing a basic health check endpoint for the application.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<express.Response>} - A promise that resolves with the Express response object.
 */
const indexController = async (req, res) => {
    try {
        return res.status(returnData?.status).json(returnDatas);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: SERVER_DOWN_MESSAGE,
            success: false,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default indexController;