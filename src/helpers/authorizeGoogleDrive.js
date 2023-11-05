import { google } from "googleapis";
import logger from "../shared/logger.js";
import { GOOGLE_DRIVE_CLIENT_EMAIL, GOOGLE_DRIVE_PRIVATE_KEY, GOOGLE_DRIVE_SCOPE } from "../config/config.js";

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
        const SCOPE = [GOOGLE_DRIVE_SCOPE];
        const private_key = Buffer.from(GOOGLE_DRIVE_PRIVATE_KEY, 'base64').toString('utf-8');

        // Initialize a JWT client for authentication with Google Drive.
        const jwtClient = new google.auth.JWT(
            GOOGLE_DRIVE_CLIENT_EMAIL,
            null,
            private_key,
            SCOPE,
        );

        // Authorize the JWT client.
        await jwtClient.authorize();

        // Return the authorized JWT client.
        return jwtClient;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default authorizeGoogleDrive;