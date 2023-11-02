import { google } from "googleapis";
import { GOOGLE_DRIVE_CLIENT_EMAIL } from "../config/config.js";
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
        const GOOGLE_DRIVE_PRIVATE_KEY = "aa902db1cdc443a6044735ab7856ceed3918c4be";

        // Initialize a JWT client for authentication with Google Drive.
        const jwtClient = new google.auth.JWT(
            GOOGLE_DRIVE_CLIENT_EMAIL,
            null,
            GOOGLE_DRIVE_PRIVATE_KEY,
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