import logger from "../shared/logger.js";

/**
 * Set the MIME type of file based on its file extension.
 *
 * @param {string} fileName - The name of the file including the extension.
 * @returns {string} The MIME type of the file or 'application/octet-stream' if the extension is not recognized.
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
  
  
  
  
  
  