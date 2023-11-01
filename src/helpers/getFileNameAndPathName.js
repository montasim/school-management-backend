import path from "path";
import fs from "fs";
import logger from "../shared/logger.js";

/**
 * Generates a unique filename and path for an uploaded file by appending a timestamp before the file extension.
 * It also renames the file on the disk to ensure consistency between the filename and the actual file path.
 *
 * @async
 * @function
 * @param {Express.Multer.File} file - The multer file object representing the uploaded file.
 * @returns {Promise<Object>} - An object containing the unique filename and the corresponding file path.
 * @throws {Error} - Throws an error if file renaming operation fails.
 */
const getFileNameAndPathName = async (file) => {
    try {
        // Extract file extension and original filename
        const fileExtension = path.extname(file?.originalname);
        const originalBasename = path.basename(file?.originalname, fileExtension);

        // Generate unique timestamp
        const timestamp = Date.now();

        // Create a new filename by appending the timestamp before the extension
        const uniqueFilename = `${originalBasename}-${timestamp}${fileExtension}`;
        const uniquePath = path.join(path.dirname(file?.path), uniqueFilename);

        // Rename the file to include the timestamp in the name
        fs.renameSync(file?.path, uniquePath);

        // Return the unique filename and path
        return { uniqueFilename, uniquePath };
    } catch (error) {
        logger.error(error);

        // Propagate the error to the caller
        throw error;
    }
}

export default getFileNameAndPathName;
