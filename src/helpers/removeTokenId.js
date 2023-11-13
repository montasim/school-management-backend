import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import findById from "../shared/findById.js";
import logger from "../shared/logger.js";
import updateById from "../shared/updateById.js";

const removeTokenId = async (db, foundAdminDetails, tokenId) => {
    try {
        if (foundAdminDetails && foundAdminDetails?.tokenId) {
            console.log(foundAdminDetails.tokenId, tokenId)
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
