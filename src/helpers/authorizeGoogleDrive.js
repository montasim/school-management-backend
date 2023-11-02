import { google } from "googleapis";
import { GOOGLE_DRIVE_CLIENT_EMAIL } from "../config/config.js";
import googleDriveApiKeys from "../../googleDriveApiKeys.json" assert { type: 'json' };
import logger from "../shared/logger.js";

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

        // Initialize a JWT client for authentication with Google Drive.
        const jwtClient = new google.auth.JWT(
            GOOGLE_DRIVE_CLIENT_EMAIL,
            null,
            googleDriveApiKeys.private_key,
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