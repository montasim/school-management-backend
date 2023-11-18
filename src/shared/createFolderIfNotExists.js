/**
 * @fileoverview Directory Creation Utility
 *
 * This utility module provides a function for creating a directory if it does not already exist.
 * It uses Node.js File System (fs) module to check the existence of the directory and to create it if necessary.
 * The function is designed to handle the creation of nested directories as well. Error handling is implemented
 * to log any issues that occur during the directory creation process. This module is useful in scenarios where
 * ensuring the existence of a directory is required before performing file operations.
 *
 * @module createFolderIfNotExists
 */

import logger from "./logger.js";
import fs from "fs";

/**
 * Creates a directory if it does not exist.
 *
 * This asynchronous function checks for the existence of a directory at the given path. If the directory does not exist,
 * it creates the directory, including any necessary parent directories. This is particularly useful in ensuring that
 * file operations do not fail due to missing directories. The function handles errors by logging them and returning the error object.
 *
 * @async
 * @param {string} directoryName - The path of the directory to be created.
 * @throws {Error} - Throws an error if there is an issue with creating the directory.
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