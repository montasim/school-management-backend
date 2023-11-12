import findById from "../shared/findById.js";
import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import logger from "../shared/logger.js";

const isTokenRevoked = async (db, adminId, jti) => {
    try {
        const foundAdminDetails = await findById(db, ADMIN_COLLECTION_NAME, adminId);

        // Check if tokenId array exists and contains the provided jti
        return !foundAdminDetails?.tokenId?.includes(jti);
    } catch (error) {
        logger.error(error);

        return false;
    }
};

export default isTokenRevoked;