/**
 * @fileoverview Admin Login Tracking Utility
 *
 * This utility module provides a function to update and track the login details of an admin user in the database.
 * It specifically increments the 'currentlyLoggedInDevice' count and updates the 'lastLoginAt' timestamp for the
 * admin user's record. This module is useful for monitoring admin user activities and managing concurrent login sessions.
 * It relies on a shared logger for error logging and predefined constants from the application's configuration.
 *
 * @module addCurrentlyLoggedInDevice
 */

import logger from "./logger.js";
import { ADMIN_COLLECTION_NAME } from "../config/config.js";

/**
 * Increments the count of currently logged-in devices for an admin user.
 *
 * This asynchronous function updates the 'currentlyLoggedInDevice' field by incrementing its count and sets the 'lastLoginAt'
 * field to the current date and time in the admin user's record. This is used to track active sessions and the most recent login
 * activity of an admin user. The function handles any errors by logging them and returning the error object.
 *
 * @param {Object} db - The database connection object.
 * @param {Object} foundAdminDetails - The admin user's record from the database.
 * @returns {Promise<void>} - A promise indicating the completion of the operation. Errors are logged and returned.
 */
const addCurrentlyLoggedInDevice = async (db, foundAdminDetails) => {
    try {
        foundAdminDetails.currentlyLoggedInDevice += 1;
        foundAdminDetails.lastLoginAt = new Date();

        await db.collection(ADMIN_COLLECTION_NAME).updateOne({ userName: foundAdminDetails?.userName }, { $set: foundAdminDetails });
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default addCurrentlyLoggedInDevice;