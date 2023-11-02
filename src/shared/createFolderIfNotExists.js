import fs from 'fs';
import path from 'path';

/**
 * Creates the specified folder if it doesn't exist.
 *
 * @function createFolderIfNotExists
 * @param {string} directoryName - The path of the folder to create.
 * @returns {Promise<void>}
 */
const createFolderIfNotExists = async (directoryName) => {
    try {
        // Resolve the path to an absolute path
        const absoluteFolderPath = path.resolve(directoryName);

        // Ensure the path exists, creating the directory if necessary.
        await fs.promises.mkdir(absoluteFolderPath, { recursive: true });
    } catch (error) {
        console.error(`Failed to ensure folder exists at ${directoryName}:`, error);
    }
};

export default createFolderIfNotExists;
