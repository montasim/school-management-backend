import logger from "./logger.js";
import { ADMIN_COLLECTION_NAME } from "../config/config.js";

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