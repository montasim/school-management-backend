/**
 * @fileoverview Critical Error Handling Utility.
 *
 * This module provides a utility function for handling critical errors encountered in the application.
 * It logs the error using a shared logger and then outputs the error to the console. The function
 * also terminates the application process to prevent running in an unstable state after a critical error.
 *
 * @requires logger - A shared logging utility for logging messages.
 * @module handleCriticalError - Exported function for handling critical errors.
 */

import logger from "../shared/logger.js";

/**
 * Handles critical errors by logging and exiting the process.
 *
 * This function is used to handle critical errors that occur within the application.
 * It logs the error details using a shared logger and then outputs the error message
 * to the console. After logging, it terminates the application process to prevent
 * running in a potentially unstable state. This function is typically used in scenarios
 * where recovery from the error is not feasible, and a restart is required.
 *
 * @function handleCriticalError
 * @param {Error} error - The error object representing the critical error.
 */
const handleCriticalError = (error) => {
    try {
        logger.error('Critical server error:', error);

        console.error('Critical server error:', error);

        // Optionally exit process for critical errors
        process.exit(1);
    } catch (error) {
        logger.error('ERROR: handleCriticalError failed to handle error', error);
    }
}

export default handleCriticalError;