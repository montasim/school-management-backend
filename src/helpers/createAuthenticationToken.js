/**
 * @fileoverview JWT Authentication Token Generator.
 *
 * This module provides a function to generate JSON Web Tokens (JWT) for user authentication.
 * It utilizes the 'jsonwebtoken' library to create tokens that encode user details. These tokens
 * are used for securing and managing authentication in the application. The function signs the token
 * with a secret key and sets an expiration time. This utility is crucial for implementing token-based
 * authentication mechanisms in the application, ensuring secure transmission and validation of user credentials.
 *
 * @requires jwt - JSON Web Token library for creating JWTs.
 * @requires config - Configuration module that includes the secret key for signing JWTs.
 * @requires logger - Shared logging utility for error handling.
 * @module createAuthenticationToken - Function to generate JWTs for user authentication.
 */

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import {ADMIN_COLLECTION_NAME, SECRET_TOKEN} from "../config/config.js";
import logger from "../shared/logger.js";
import updateById from "../shared/updateById.js";

/**
 * Generates a JSON Web Token (JWT) for the given user details.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param userAgent
 * @param {Object} adminDetails - An object containing user details.
 * @param {string} adminDetails.id - The unique identifier of the user.
 * @param {string} adminDetails.name - The name of the user.
 * @param {string} adminDetails.userName - The username of the user.
 * @returns {Promise<string>} Returns a promise that resolves with the generated JWT.
 * @throws {Error} Throws an error if token generation fails.
 */
const createAuthenticationToken = async (db, userAgent, adminDetails = {}) => {
    try {
        const { id, name, userName, tokenId } = adminDetails;
        const newTokenId = uuidv4(); // Generate a unique identifier for this token

        // Initialize tokenId array if it doesn't exist
        if (!tokenId) {
            adminDetails.tokenId = [];
        }

        // Append new token ID
        adminDetails?.tokenId?.push(newTokenId);

        // Limit the number of stored token IDs
        if (adminDetails?.tokenId?.length > 3) {
            adminDetails?.tokenId?.shift(); // Remove the oldest token ID
        }

        await updateById(db, ADMIN_COLLECTION_NAME, id, adminDetails);

        // Sign and return the JWT token with user details and secret
        return jwt.sign(
            {
                tokenId: newTokenId,
                id: id,
                userName: userName,
                name: name,
                userAgent: userAgent,
            },
            SECRET_TOKEN,
            {
                expiresIn: '1d',
            }
        );
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default createAuthenticationToken;