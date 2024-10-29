import { google } from 'googleapis';
import { Readable } from 'stream';
import logger from '../shared/logger.js';
import getGoogleDriveAuthorization from './getGoogleDriveAuthorization.js';
import { GOOGLE_DRIVE_FOLDER_KEY } from '../config/config.js';

/**
 * Uploads a file to Google Drive and sets its permissions to be readable by anyone with the link.
 *
 * @async
 * @function uploadFile
 * @param {Express.Multer.File} file - An object representing the file to be uploaded, as provided by Multer.
 * @returns {Promise<{fileId: string, shareableLink: string, downloadLink: string}>} An object containing the file ID, shareable link, and download link.
 */
const uploadFile = async (file) => {
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

        fileStream.push(file.buffer);
        fileStream.push(null);

        const { data: fileData } = await drive.files.create({
            requestBody: fileMetaData,
            media: {
                body: fileStream,
                mimeType: file?.mimetype,
            },
            fields: 'id',
        });

        await drive.permissions.create({
            fileId: fileData?.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const { data: fileInfo } = await drive.files.get({
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
 * @function deleteFile
 * @param {string} fileId - The ID of the file to be deleted.
 * @returns {Promise<Object>} The response from the Google Drive API.
 */
const deleteFile = async (fileId) => {
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

const googleDriveFileOperations = {
    uploadFile,
    deleteFile,
};

export default googleDriveFileOperations;