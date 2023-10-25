import {ADMIN_COLLECTION_NAME} from "../constants/index.js";

const isRequesterValid = async (db, requestedBy) => {
    const requesterValidity = await db
        .collection(ADMIN_COLLECTION_NAME)
        .findOne({ id: requestedBy });

    return !!requesterValidity;
};

export default isRequesterValid;