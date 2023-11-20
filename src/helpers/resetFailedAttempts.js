/**
 * @fileoverview Utility function for resetting failed login attempts.
 *
 * This module provides a utility function to reset the count of failed login attempts
 * for a user in the specified collection of the database. It is used in the context of
 * user authentication, especially after a successful login or when the account lockout
 * duration has expired. This function is crucial for maintaining the security and
 * integrity of the user authentication process.
 *
 * @requires logger - Logger module for logging errors and information.
 * @module resetFailedAttempts - Exported function to reset failed login attempts.
 */

import logger from "../shared/logger.js";
import { ADMIN_COLLECTION_NAME, MAX_FAILED_ATTEMPTS } from "../config/config.js";
import updateById from "../shared/updateById.js";

/**
 * Resets the count of failed login attempts for a user.
 *
 * This function updates the user's record in the database, setting the number of allowed
 * failed attempts back to its default value and nullifying the timestamp of the last failed
 * attempt. It is called after a successful login or when an account lockout duration has expired.
 *
 * @async
 * @function resetFailedAttempts
 * @param {Object} db - The database connection object.
 * @param {Object} adminDetails - The admin details object.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
const resetFailedAttempts = async (db, adminDetails) => {
    try {
        adminDetails.allowedFailedAttempts = MAX_FAILED_ATTEMPTS;
        adminDetails.lastFailedAttempts = null;

        await updateById(db, ADMIN_COLLECTION_NAME, adminDetails?.id, adminDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default resetFailedAttempts;