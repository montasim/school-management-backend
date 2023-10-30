import {CATEGORY_COLLECTION_NAME} from "../config/config.js";

/**
 * Checks if a category with the given name already exists in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} name - The name of the category to check.
 * @returns {Promise<boolean>} Returns true if the category already exists, otherwise false.
 */
const isCategoryAlreadyExists = async (db, name) => {
    const isCategoryExists = await db
        .collection(CATEGORY_COLLECTION_NAME)
        .findOne({ name: name });

    return !!isCategoryExists;
};

export default isCategoryAlreadyExists;
