/**
 * @fileoverview Token Revocation Check Service
 *
 * This service is responsible for checking whether a given token (identified by 'jti')
 * has been revoked. It checks the administrator's record in the database to determine
 * if the token is still active. If the token is not found in the admin's 'tokenId' array,
 * it is considered revoked. The service also calls 'removeTokenId' to remove the token ID
 * from the admin's record if necessary.
 *
 * @function isTokenRevoked
 * @param {Object} db - Database connection object.
 * @param {string} adminId - ID of the admin to check the token for.
 * @param {string} jti - The 'jti' (JWT ID) of the token to check.
 * @returns {Promise<boolean>} A boolean indicating whether the token has been revoked.
 */

import findById from "../shared/findById.js";
import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import logger from "../shared/logger.js";
import removeTokenId from "./removeTokenId.js";

const isTokenRevoked = async (db, adminId, jti) => {
    try {
        const foundAdminDetails = await findById(db, ADMIN_COLLECTION_NAME, adminId);

        // Check if tokenId array exists and contains the provided jti
        if (foundAdminDetails?.tokenId?.includes(jti)) {
            return false;
        } else {
            await removeTokenId(db, foundAdminDetails, jti);
        }
        return !foundAdminDetails?.tokenId?.includes(jti);
    } catch (error) {
        logger.error(error);

        return false;
    }
};

export default isTokenRevoked;