/**
 * @fileoverview Interface for Google Drive File Operations.
 *
 * This module provides functionality to interact with Google Drive for file operations.
 * It includes functions to upload files to Google Drive and set appropriate permissions for shared access,
 * as well as to delete files from Google Drive. These functions use the Google Drive API and are built on
 * top of the googleapis library. The module handles authorization, file stream creation, and API interactions,
 * and returns relevant information such as file IDs and shareable links. Errors encountered during these
 * operations are logged using a shared logger utility.
 *
 * @requires google - Google APIs client library.
 * @requires logger - Shared logging utility for error logging.
 * @requires getGoogleDriveAuthorization - Function to authorize the application to access Google Drive.
 * @requires GOOGLE_DRIVE_FOLDER_KEY - Folder key for Google Drive uploads, defined in the application's configuration.
 * @module GoogleDriveFileOperations - Exports functions for uploading and deleting files on Google Drive.
 */

import { google } from 'googleapis';
import { Readable } from "stream";
import logger from "../shared/logger.js";
import getGoogleDriveAuthorization from "./getGoogleDriveAuthorization.js";
import { GOOGLE_DRIVE_FOLDER_KEY } from "../config/config.js";

/**
 * Uploads a file to Google Drive and sets its permissions to be readable by anyone with the link.
 *
 * @async
 * @function uploadFileToDrive
 * @param {Express.Multer.File} file - An object representing the file to be uploaded, as provided by Multer.
 * @returns {Promise<{fileId: string, shareableLink: string}>} An object containing the file ID and shareable link from Google Drive.
 */
const uploadFileToDrive = async (file) => {
    try {
        const authorizationClient = await getGoogleDriveAuthorization();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient
        });
        const fileMetaData = {
            name: file?.originalname,
            parents: [GOOGLE_DRIVE_FOLDER_KEY],
        };
        const fileStream = new Readable();

        fileStream?.push(file.buffer);
        fileStream?.push(null);

        // Upload the file
        const { data: fileData } = await drive?.files?.create({
            requestBody: fileMetaData,
            media: {
                body: fileStream,
                mimeType: file?.mimetype,
            },
            fields: 'id',
        });

        // Set the file permissions to 'anyone with the link can view'
        await drive.permissions.create({
            fileId: fileData?.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get the shareable link
        const { data: fileInfo } = await drive?.files.get({
            fileId: fileData?.id,
            fields: 'webViewLink',
        });

        return {
            fileId: fileData?.id,
            shareableLink: fileInfo?.webViewLink,
            downloadLink: `https://drive.google.com/u/1/uc?id=${fileData?.id}&export=download`,
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
 * @function deleteFileFromDrive
 * @param {string} fileId - The ID of the file to be deleted.
 * @returns {Promise<GoogleApis.Common.Schema$Empty>} The response from the Google Drive API.
 */
const deleteFileFromDrive = async (fileId) => {
    try {
        const authorizationClient = await getGoogleDriveAuthorization();
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
 * @namespace GoogleDriveFileOperations
 */
export const GoogleDriveFileOperations = {
    uploadFileToDrive,
    deleteFileFromDrive
};