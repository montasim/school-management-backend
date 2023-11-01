import logger from "./logger.js";
import fs from "fs";

/**
 * Creates a folder at the given directory path if it does not exist.
 *
 * @function
 * @async
 * @param {string} directoryName - The path of the directory to be created.
 * @throws Will throw an error if the directory creation fails.
 */
const createFolderIfNotExists = async (directoryName) => {
    try {
        // Check if the directory exists
        if (!fs.existsSync(directoryName)){
            // If not, create the directory (and any necessary parent directories)
            fs.mkdirSync(directoryName, { recursive: true });
        }
    } catch (error) {
        // Log the error using the logger
        logger.error(error);

        // Propagate the error to the calling function
        throw error;
    }
};

export default createFolderIfNotExists;
