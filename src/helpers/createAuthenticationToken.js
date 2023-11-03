import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/config.js";
import logger from "../shared/logger.js";

/**
 * Generates a JSON Web Token (JWT) for the given user details.
 *
 * @async
 * @function
 * @param {Object} userDetails - An object containing user details.
 * @param {string} userDetails.id - The unique identifier of the user.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.userName - The username of the user.
 * @returns {Promise<string>} Returns a promise that resolves with the generated JWT.
 * @throws {Error} Throws an error if token generation fails.
 */
const createAuthenticationToken = async (userDetails = {}) => {
    try {
        // Sign and return the JWT token with user details and secret
        return jwt.sign(
            {
                id: userDetails.id,
                name: userDetails.name,
                userName: userDetails.userName,
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
