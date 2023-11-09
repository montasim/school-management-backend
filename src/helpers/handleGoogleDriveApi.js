import { google } from 'googleapis';
import logger from "../shared/logger.js";
import authorizeGoogleDrive from "./authorizeGoogleDrive.js";
import bufferToStream from "./bufferToStream.js";
import { GOOGLE_DRIVE_FOLDER_KEY } from "../config/config.js";

/**
 * Uploads a file to Google Drive and sets its permissions to be readable by anyone with the link.
 *
 * @async
 * @function uploadFile
 * @param {Express.Multer.File} file - An object representing the file to be uploaded, as provided by Multer.
 * @returns {Promise<{fileId: string, shareableLink: string}>} An object containing the file ID and shareable link from Google Drive.
 */
const uploadFile = async (file) => {
    try {
        const authorizationClient = await authorizeGoogleDrive();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient
        });
        const fileMetaData = {
            name: file?.originalname,
            parents: [GOOGLE_DRIVE_FOLDER_KEY],
        };

        const fileStream = bufferToStream(file.buffer);

        // Upload the file
        const { data: fileData } = await drive.files.create({
            requestBody: fileMetaData,
            media: {
                body: fileStream,
                mimeType: file?.mimetype,
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
 * @function deleteFile
 * @param {string} fileId - The ID of the file to be deleted.
 * @returns {Promise<GoogleApis.Common.Schema$Empty>} The response from the Google Drive API.
 */
const deleteFile = async (fileId) => {
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
 * Provides an interface for Google Drive file operations, including uploading and deleting files.
 *
 * @namespace HandleGoogleDrive
 */
export const HandleGoogleDrive = {
    uploadFile,
    deleteFile
};