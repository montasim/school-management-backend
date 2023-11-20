/**
 * @fileoverview Utility function for checking account lock status.
 *
 * This module provides a function that checks whether a user's account is locked due to
 * too many failed login attempts. It is a crucial component of the application's security
 * system, preventing brute-force attacks by temporarily locking an account after a defined
 * number of unsuccessful login attempts. The function compares the current time with the
 * timestamp of the last failed login attempt and the remaining allowed attempts to determine
 * if the account is currently locked.
 *
 * @requires logger - Logger module for logging errors and information.
 * @requires constants - Application constants including status codes.
 * @requires generateResponseData - Utility function for generating standardized API responses.
 * @module checkIfAccountIsLocked - Exported function to check account lock status.
 */

import logger from "../shared/logger.js";
import { STATUS_LOCKED } from "../constants/constants.js";
import generateResponseData from "../shared/generateResponseData.js";

/**
 * Checks if a user's account is locked due to excessive failed login attempts.
 *
 * The function examines the user details, particularly the number of allowed failed attempts
 * and the time of the last failed attempt, to determine if the account is currently locked.
 * It uses these details to decide if the lockout period is still in effect.
 *
 * @function checkIfAccountIsLocked
 * @param {Object} foundAdminDetails - The details of the admin user, including failed attempts info.
 * @returns {Object|undefined} Returns an API response object if the account is locked, otherwise undefined.
 */
const checkIfAccountIsLocked = (foundAdminDetails) => {
    try {
        // Check if the account is locked due to failed attempts
        const timeSinceLastFailedAttempt = new Date() - new Date(foundAdminDetails?.lastFailedAttempts);

        if (foundAdminDetails?.allowedFailedAttempts <= 0 && timeSinceLastFailedAttempt < 5 * 60 * 1000) {
            // Account is locked if there are no allowed failed attempts left and the last failed attempt was within the last 5 minutes
            return generateResponseData({}, false, STATUS_LOCKED, "Too many failed attempts. Your account has been locked. Please try again later after 5 minutes.");
        }

        return null; // Return null or a similar indicator if the account is not locked
    } catch (error) {
        logger.error(error);

        return generateResponseData({}, false, STATUS_LOCKED, "Error checking account lock status.");
    }
};

export default checkIfAccountIsLocked;