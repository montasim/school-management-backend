import { google } from "googleapis";
import logger from "../shared/logger.js";
import fs from "fs";

/**
 * Authorizes and authenticates the application to access Google Drive using service account credentials.
 * @function
 * @async
 * @returns {google.auth.JWT} A JWT client instance, authenticated and ready to make requests.
 * @throws Will throw an error if the authentication fails.
 */
const authorizeGoogleDrive = async () => {
    try {
        // Define the scope of access required by the application.
        const SCOPE = ["https://www.googleapis.com/auth/drive"];
        const googleDriveApiKeys = JSON.parse(fs.readFileSync('./googleDriveApiKeys.json', 'utf8'));
        const { client_email, private_key } = googleDriveApiKeys;

        // Initialize a JWT client for authentication with Google Drive.
        const jwtClient = new google.auth.JWT(
            client_email,
            null,
            private_key,
            SCOPE,
        );

        // Authorize the JWT client.
        await jwtClient.authorize();

        // Return the authorized JWT client.
        return jwtClient;
    } catch (error) {
        // Log and return the error if authorization fails.
        logger.error(error);

        return error;
    }
};

export default authorizeGoogleDrive;