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
        const requesterValidity = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ id: adminId });

        return !!requesterValidity;
    } catch (error) {
        logger.error(error);
    }
};

export default isValidRequest;
