import fs from "fs";
import logger from "../shared/logger.js";

/**
 * Deletes a file from local storage.
 *
 * @async
 * @function
 * @param {string} uniquePath - The path to the file that needs to be deleted.
 * @returns {Promise<Error|undefined>} Returns an Error object on failure, otherwise undefined.
 */
const deleteFileFromLocalStorage = async (uniquePath) => {
    try {
        // Attempt to delete the file asynchronously
        fs.unlink(uniquePath, (err) => {
            if (err) {
                // Log error if deletion fails
                logger.error(`Error deleting file from local storage: ${err}`);
            }
        });
    } catch (error) {
        // Log and return any errors that occur outside fs.unlink
        logger.error(error);

        return  error;
    }
}

export default deleteFileFromLocalStorage;