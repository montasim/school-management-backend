import fs from 'fs';
import { google } from 'googleapis';
import logger from "./logger.js";
import deleteFileFromLocalStorage from "../helpers/deleteFileFromLocalStorage.js";
import authorizeGoogleDrive from "../helpers/authorizeGoogleDrive.js";

/**
 * Uploads a file to Google Drive.
 *
 * @async
 * @function
 * @param {string} uniquePath - The unique path to the file on local storage.
 * @param {string} uniqueFilename - The unique filename to be used in Google Drive.
 * @param {Object} file - The file object containing details of the file.
 * @param {string} file.mimetype - The MIME type of the file.
 * @returns {Promise<Object>} Returns an object containing the file ID and shareable link.
 */
const uploadFile = async (uniquePath, uniqueFilename, file) => {
    try {
        const authorizationClient = await authorizeGoogleDrive();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient
        });
        const fileMetaData = {
            name: uniqueFilename,
            parents: ['1de6FsdZyPYHh4tjqPbf4NCE9cpKWHAB6'],
        };
        // Upload the file
        const { data: fileData } = await drive.files.create({
            requestBody: fileMetaData,
            media: {
                body: fs.createReadStream(uniquePath),  // Replace hardcoded filename with uniqueFilename
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
    } finally {
        await deleteFileFromLocalStorage(uniquePath);
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
 * Object to handle Google Drive operations.
 * @namespace HandleGoogleDrive
 * @property {function} uploadFile - Function to upload a file to Google Drive.
 * @property {function} deleteFile - Function to delete a file from Google Drive.
 */
export const HandleGoogleDrive = {
    uploadFile,
    deleteFile
};