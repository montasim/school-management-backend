/**
 * @fileoverview Token Revocation Check Service
 *
 * This service is responsible for checking whether a given token (identified by 'jti')
 * has been revoked. It checks the administrator's record in the database to determine
 * if the token is still active. If the token is not found in the admins 'tokenId' array,
 * it is considered revoked. The service also calls 'removeTokenId' to remove the token ID
 * from the admins record if necessary.
 *
 * @function isTokenRevoked
 * @param {Object} db - Database connection object.
 * @param {string} adminId - ID of the admin to check the token for.
 * @param {string} jti - The 'jti' (JWT ID) of the token to check.
 * @returns {Promise<boolean>} A boolean indicating whether the token has been revoked.
 */

import findByField from "../shared/findByField.js";
import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import logger from "../shared/logger.js";
import removeTokenDetails from "./removeTokenId.js";
import updateById from "../shared/updateById.js";

/**
 * Checks if a given token is revoked for a specified admin user.
 *
 * This asynchronous function queries the database to retrieve the admin user's details using their ID. It then checks the admins 'tokenId' array
 * to determine if the provided 'jti' (JWT ID) is included, indicating that the token is still active. If the token is not found in this array,
 * it is considered revoked, and an attempt is made to remove the token ID from the admins record. The function returns a boolean indicating
 * the revocation status of the token.
 *
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} adminId - The ID of the admin user to check the token for.
 * @param {string} jti - The JWT ID of the token to check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the token has been revoked.
 */
const isTokenRevoked = async (db, adminId, jti) => {
    try {
        const foundAdminDetails = await findByField(db, ADMIN_COLLECTION_NAME, 'id', adminId);

        if (!foundAdminDetails?.tokenDetails) {
            return true; // If there's no tokenDetails array, consider the token revoked.
        }

        let tokenRevoked = true; // Assume the token is revoked by default.
        let validTokenCount = 0; // Counter for valid tokens

        for (let tokenDetails of foundAdminDetails.tokenDetails) {
            const tokenTimestamp = new Date(tokenDetails?.tokenTimestamp);
            const tokenId = tokenDetails?.tokenId;
            const currentTime = new Date();
            const hoursDifference = (currentTime - tokenTimestamp) / (1000 * 60 * 60); // Convert milliseconds to hours

            if (hoursDifference <= 12) {
                if (tokenId === jti) {
                    tokenRevoked = false; // Valid and non-expired token found.
                }
                validTokenCount++; // Increment valid token count
            } else {
                // Remove expired tokens
                await removeTokenDetails(db, foundAdminDetails, tokenId, validTokenCount);
            }
        }

        // Update the currentlyLoggedInDevice count
        foundAdminDetails.currentlyLoggedInDevice = validTokenCount;

        await updateById(db, ADMIN_COLLECTION_NAME, adminId, foundAdminDetails);

        return tokenRevoked;
    } catch (error) {
        logger.error(error);

        return true; // In case of error, consider the token revoked.
    }
};

export default isTokenRevoked;