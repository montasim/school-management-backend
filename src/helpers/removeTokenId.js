import { ADMIN_COLLECTION_NAME } from "../config/config.js";
import findById from "../shared/findById.js";
import logger from "../shared/logger.js";

const removeTokenId = async (db, adminId, tokenId) => {
    try {
        const foundAdminDetails = await findById(db, ADMIN_COLLECTION_NAME, adminId);

        console.log(foundAdminDetails)

        if (foundAdminDetails && foundAdminDetails?.tokenId) {
            foundAdminDetails.tokenId = foundAdminDetails?.tokenId?.filter(id => id !== tokenId);



            await db.collection(ADMIN_COLLECTION_NAME).updateOne({ id: adminId }, { $set: { tokenId: foundAdminDetails.tokenId } });
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default removeTokenId;
