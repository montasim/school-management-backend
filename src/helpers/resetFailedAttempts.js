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
import { ADMIN_COLLECTION_NAME } from "../config/config.js";

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
 * @param {string} userName - The username of the account for which to reset the failed attempts.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
const resetFailedAttempts = async (db, userName) => {
    try {
        const resetAttemptsDetails = {
            allowedFailedAttempts: 3,
            lastFailedAttempts: null,
        };

        await db.collection(ADMIN_COLLECTION_NAME).updateOne({ userName: userName }, { $set: resetAttemptsDetails });
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default resetFailedAttempts;