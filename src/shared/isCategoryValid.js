import {CATEGORY_COLLECTION_NAME} from "../constants/index.js";

/**
 * Check if the requester is valid by looking up the requester's ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} categoryId - The ID of the category to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isCategoryValid = async (db, categoryId) => {
    const requestedCategoryValidity = await db
        .collection(CATEGORY_COLLECTION_NAME)
        .findOne({ id: categoryId });

    return !!requestedCategoryValidity;
};

export default isCategoryValid;
