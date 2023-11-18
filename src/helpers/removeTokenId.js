/**
 * @fileoverview Token ID Removal Service
 *
 * This service module provides functionality for removing a specific token ID from an administrator's record in the database.
 * It is particularly useful in the context of managing authentication tokens, especially when a token becomes invalid or expires.
 * The service modifies the 'tokenId' array in the admin's record by filtering out the specified token ID. It also decrements the
 * 'currentlyLoggedInDevice' count if necessary. The module relies on shared utilities for database updates and logging.
 *
 * @module removeTokenIdService
 */

import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import logger from "../shared/logger.js";
import updateById from "../shared/updateById.js";

/**
 * Removes a specific token ID from an admin's record.
 *
 * This asynchronous function updates an admin's record by removing a given token ID from the 'tokenId' array. It is primarily used
 * when a token is no longer valid or has been revoked. The function also adjusts the 'currentlyLoggedInDevice' count as necessary.
 * If the admin record and tokenId array exist, it filters out the specified token ID and updates the record in the database.
 *
 * @async
 * @param {Object} db - The database connection object.
 * @param {Object} foundAdminDetails - The admin's record from the database.
 * @param {string} tokenId - The token ID to remove from the admin's record.
 * @returns {Promise<void>} A promise indicating the completion of the operation. Errors are logged and returned.
 */
const removeTokenId = async (db, foundAdminDetails, tokenId) => {
    try {
        if (foundAdminDetails && foundAdminDetails?.tokenId) {
            foundAdminDetails.tokenId = foundAdminDetails?.tokenId?.filter(id => id !== tokenId);

            // Decrement the currentlyLoggedInDevice count.
            if (foundAdminDetails?.currentlyLoggedInDevice > 0)
                foundAdminDetails.currentlyLoggedInDevice -= 1;

            await updateById(db, ADMIN_COLLECTION_NAME, foundAdminDetails?.id, foundAdminDetails);
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default removeTokenId;
