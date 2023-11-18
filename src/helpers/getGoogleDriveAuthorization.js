/**
 * @fileoverview Google Drive Authentication Module.
 *
 * This module provides functionality to authorize and authenticate an application with Google Drive using service account credentials.
 * It leverages Google's APIs and a set of private credentials to establish a secure connection to Google Drive. This setup allows the application
 * to perform actions on Google Drive as specified by the given scope. The module imports necessary configuration from "../config/config.js" and uses
 * a logger from "../shared/logger.js" for logging purposes.
 *
 * @module getGoogleDriveAuthorization
 */

import { google } from "googleapis";
import logger from "../shared/logger.js";
import { GOOGLE_DRIVE_CLIENT_EMAIL, GOOGLE_DRIVE_PRIVATE_KEY, GOOGLE_DRIVE_SCOPE } from "../config/config.js";

/**
 * Authorizes and authenticates the application to access Google Drive.
 *
 * This asynchronous function initializes and authorizes a JWT client using Google Drive service account credentials.
 * The JWT client is configured with the necessary scope of access and private key information. It returns an authorized JWT client instance
 * that can be used to interact with Google Drive API. Any failure in the authorization process is caught and logged, and the error is returned.
 *
 * @async
 * @returns {Promise<google.auth.JWT>} A promise that resolves to the authorized JWT client instance.
 * @throws {Error} If authentication fails, an error is thrown and logged.
 */
const getGoogleDriveAuthorization = async () => {
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

export default getGoogleDriveAuthorization;