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
            return fs.mkdirSync(directoryName, {recursive: true});
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default createFolderIfNotExists;
