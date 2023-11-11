/**
 * @fileoverview Utility function for validating requesters in the application.
 *
 * This module exports a function that checks the validity of a requester by verifying their ID against
 * records in the admin collection of the database. It is designed to ensure that requests made to
 * certain routes or functionalities in the application are done by authenticated and authorized users.
 * The function uses the admin collection name from the application's configuration and logs any errors
 * encountered during the validation process.
 *
 * @requires ADMIN_COLLECTION_NAME - The name of the admin collection in the database, defined in the application's configuration.
 * @requires logger - Shared logging utility for error logging.
 * @module isValidRequest - Function to validate the identity of the requester based on their admin ID.
 */

import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the requester ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} adminId - The ID of the requester to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isValidRequest = async (db, adminId) => {
    try {
        if (!ADMIN_COLLECTION_NAME) {
            logger.error("COLLECTION_NAME is not defined");

            return false;
        }

        const requesterValidity = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ id: adminId });

        return requesterValidity?.id === adminId;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default isValidRequest;