/**
 * @fileoverview Health Check Controller
 *
 * This module provides a controller for checking the health of the application.
 * It combines configurations and constants from the respective modules and checks
 * if any of these settings are undefined or null. The controller is used to verify
 * the integrity and availability of necessary configurations and constants for the
 * application's proper functionality. It serves as a diagnostic tool to quickly assess
 * the operational status of the application.
 *
 * @requires configs - Application configuration settings
 * @requires constants - Application-wide constants
 * @requires logger - Shared logging utility
 */

import logger from "../../../../shared/logger.js";
import {SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK} from "../../../../constants/constants.js";

/**
 * Health check controller for the application.
 * This asynchronous function checks whether all configurations and constants
 * in the application are properly loaded and not undefined/null. It is crucial
 * for ensuring the application's configurations and constants are correctly set
 * for its operations.
 *
 * @async
 * @function statusHealthController
 * @description Controller for getting the status of the system.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
const statusController = async (req, res) => {
    try {
        const returnData = {
            data: "Status page of the school management API",
            success: true,
            status: STATUS_OK,
            message: "Server is up and running 🚀",
        };

        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: SERVER_DOWN_MESSAGE,
            success: true,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default statusController;
