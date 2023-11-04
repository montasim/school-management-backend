import { google } from 'googleapis';
import logger from "../shared/logger.js";
import authorizeGoogleDrive from "./authorizeGoogleDrive.js";
import { GOOGLE_DRIVE_FOLDER_KEY } from "../config/config.js";

/**
 * Uploads a file to Google Drive.
 *
 * @async
 * @function
 * @param fileName
 * @param fileBuffer
 * @param mimeType
 * @returns {Promise<Object>} Returns an object containing the file ID and shareable link.
 */
const uploadFile = async ( fileName, fileBuffer, mimeType ) => {
    try {
        const authorizationClient = await authorizeGoogleDrive();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient
        });
        const fileMetaData = {
            name: fileName,
            parents: [GOOGLE_DRIVE_FOLDER_KEY],
        };

        // Upload the file
        const { data: fileData } = await drive.files.create({
            requestBody: fileMetaData,
            media: {
                body: fileBuffer, // Directly use the file buffer
                mimeType: mimeType,
            },
            fields: 'id',
        });

        // Set the file permissions to 'anyone with the link can view'
        await drive.permissions.create({
            fileId: fileData.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get the shareable link
        const { data: fileInfo } = await drive.files.get({
            fileId: fileData.id,
            fields: 'webViewLink',
        });

        return {
            fileId: fileData.id,
            shareableLink: fileInfo.webViewLink
        };
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a file from Google Drive.
 *
 * @async
 * @function
 * @param {string} fileId - The ID of the file to be deleted.
 * @returns {Promise<Object>} Returns the response from Google Drive API.
 */
const deleteFile = async ( fileId ) => {
    try {
        const authorizationClient = await authorizeGoogleDrive();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient
        });

        return await drive.files.delete({ fileId });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Object to handle Google Drive operations.
 * @namespace HandleGoogleDrive
 * @property {function} uploadFile - Function to upload a file to Google Drive.
 * @property {function} deleteFile - Function to delete a file from Google Drive.
 */
export const HandleGoogleDrive = {
    uploadFile,
    deleteFile
};