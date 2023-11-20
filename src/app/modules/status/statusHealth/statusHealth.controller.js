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

import * as configs from '../../../../config/config.js';
import * as constants from '../../../../constants/constants.js';
import logger from "../../../../shared/logger.js";
import { STATUS_NOT_FOUND, STATUS_OK } from "../../../../constants/constants.js";

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
const statusHealthController = async (req, res) => {
    try {
        const allSettings = { ...configs, ...constants }; // Combine configs and constants
        const errors = [];

        // Iterate over all settings to check for undefined or null values
        for (const key in allSettings) {
            if (!allSettings[key]) {
                errors.push(`${key} is undefined or null`);
            }
        }

        if (errors?.length > 0) {
            // If there are configuration errors, return an error message with all errors
            return res?.status(STATUS_NOT_FOUND).json({
                data: {},
                success: false,
                status: STATUS_NOT_FOUND,
                message: errors?.join(", "),
            });
        } else {
            // If all configurations are defined, return a success message
            return res?.status(STATUS_OK).json({
                data: {},
                success: true,
                status: STATUS_OK,
                message: "All configurations and constants are loaded successfully",
            });
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default statusHealthController;