import fs from 'fs';
import path from 'path';
import logger from "./logger.js";

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
            // Resolve the path to an absolute path
            const absoluteFolderPath = path.resolve(directoryName);

            // Ensure the path exists, creating the directory if necessary.
            return await fs.promises.mkdir(absoluteFolderPath, { recursive: true });
        }
    } catch (error) {
        // Log the error using the logger
        logger.error(error);

        // Propagate the error to the calling function
        throw error;
    }
};

export default createFolderIfNotExists;
