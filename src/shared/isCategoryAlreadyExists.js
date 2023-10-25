import {CATEGORY_COLLECTION_NAME} from "../constants/index.js";

const isCategoryAlreadyExists = async (db, name) => {
    const isCategoryExists = await db
        .collection(CATEGORY_COLLECTION_NAME)
        .findOne({ name: name });

    return !!isCategoryExists;
};

export default isCategoryAlreadyExists;