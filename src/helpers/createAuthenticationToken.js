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
import findById from "../shared/findById.js";

/**
 * Generates a JSON Web Token (JWT) for the given user details.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param userAgent
 * @param {Object} userDetails - An object containing user details.
 * @param {string} userDetails.id - The unique identifier of the user.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.userName - The username of the user.
 * @returns {Promise<string>} Returns a promise that resolves with the generated JWT.
 * @throws {Error} Throws an error if token generation fails.
 */
const createAuthenticationToken = async (db, userAgent, userDetails = {}) => {
    try {
        const { id, name, userName } = userDetails;
        const tokenId = uuidv4(); // Generate a unique identifier for this token
        const foundAdminDetails = await findById(db, ADMIN_COLLECTION_NAME, id);

       foundAdminDetails.tokenId.push(tokenId);

        // Limit the number of stored token IDs
        if (foundAdminDetails.tokenId.length > 3) {
            foundAdminDetails.tokenId.shift(); // Remove the oldest token ID
        }

        await db.collection(ADMIN_COLLECTION_NAME).updateOne({ userName: foundAdminDetails.userName }, { $set: { tokenId: foundAdminDetails.tokenId } });

        // Sign and return the JWT token with user details and secret
        return jwt.sign(
            {
                tokenId: tokenId,
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