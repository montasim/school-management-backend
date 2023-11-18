/**
 * @fileoverview MIME Type Setting Utility
 *
 * This utility module provides a function for determining the MIME type of a file based on its file extension.
 * It contains a mapping of common file extensions to their respective MIME types. The function `setMimeTypeFromExtension`
 * takes a file name as input and returns the corresponding MIME type. If the file extension is not recognized, it defaults
 * to 'application/octet-stream'. This module is useful for handling file uploads, downloads, and serving files with correct
 * MIME types in web applications.
 *
 * @module setMimeTypeFromExtension
 */

import logger from "../shared/logger.js";

/**
 * Determines the MIME type of file based on its extension.
 *
 * This function extracts the file extension from the provided file name and maps it to a corresponding MIME type.
 * It uses a predefined object that associates file extensions with MIME types. If the extension is not recognized,
 * the function defaults to returning 'application/octet-stream', which is a generic binary file MIME type. This utility
 * is useful in scenarios where the correct MIME type needs to be set or identified for file handling operations.
 *
 * @param {string} fileName - The name of the file including its extension.
 * @returns {string} - The MIME type corresponding to the file's extension, or 'application/octet-stream' if the extension is not recognized.
 */
const setMimeTypeFromExtension = ( fileName = "" ) => {
    try {
        // Define a mapping of file extensions to MIME types
        const extensionToMimeType = {
            pdf: 'application/pdf',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            ico: 'image/x-icon',
            // Add more extensions and MIME types as needed
        };
        
        // Extract the file extension from the file name
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        // Look up the MIME type based on the file extension
        return extensionToMimeType[fileExtension] || 'application/octet-stream';
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default setMimeTypeFromExtension;
  
  
  
  
  
  