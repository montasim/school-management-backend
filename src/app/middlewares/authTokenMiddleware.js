/**
 * @fileoverview Authentication middleware for token verification.
 *
 * This module provides functionality for JWT (JSON Web Token) authentication in the application.
 * It includes methods for extracting the authentication token from the request header, verifying the token's
 * validity, and a middleware function for integrating token verification into the Express application's request-response cycle.
 * If the token is missing or invalid, the middleware responds with the appropriate error. Otherwise, it populates
 * the request object with the authenticated user's details and proceeds to the next middleware.
 *
 * @requires jwt - JSON Web Token for creating and verifying tokens.
 * @requires SECRET_TOKEN - Secret key used for token verification, defined in the application's configuration.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Logging utility for error logging.
 * @requires STATUS_BAD_REQUEST - Constant representing the bad request HTTP status code.
 * @requires STATUS_UNAUTHORIZED - Constant representing the unauthorized HTTP status code.
 * @module authTokenMiddleware - Express middleware for JWT token verification.
 */

import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../../config/config.js';
import generateResponseData from '../../shared/generateResponseData.js';
import logger from '../../shared/logger.js';
import { STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../../constants/constants.js';
import isTokenRevoked from "../../helpers/isTokenRevoked.js";

/**
 * Extracts the token from the Authorization header.
 *
 * @param {string} header - The Authorization header content.
 * @returns {string|null} The extracted token if present, otherwise null.
 */
const extractToken = (header) => {
    const bearer = 'Bearer ';

    return header?.startsWith(bearer) ? header.slice(bearer.length) : null;
};

/**
 * Verifies the validity of the provided JWT token.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {object|null} The decoded token if valid, otherwise null.
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_TOKEN);
    } catch (error) {
        logger.error(error);

        return null;
    }
};

/**
 * Middleware to verify the authentication token.
 * Extracts the token from the request header, validates it, and sets user information in the request.
 * If the token is missing or invalid, it sends an appropriate response.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express app's request-response cycle.
 */
const authTokenMiddleware = async (req, res, next) => {
    try {
        const token = extractToken(req?.headers['authorization']);

        if (!token)
            return res?.status(STATUS_UNAUTHORIZED).json(generateResponseData({}, false, STATUS_UNAUTHORIZED, 'Unauthorized'));

        const verified = verifyToken(token);

        if (!verified)
            return res?.status(STATUS_BAD_REQUEST).json(generateResponseData({}, false, STATUS_BAD_REQUEST, 'Invalid token'));

        if (await isTokenRevoked(req?.db, verified?.id, verified?.tokenId))
            return res?.status(STATUS_UNAUTHORIZED).json(generateResponseData({}, false, STATUS_UNAUTHORIZED, 'Unauthorized'));

        const userAgent = req?.headers['user-agent'];

        if (userAgent !== verified?.userAgent)
            return res?.status(STATUS_UNAUTHORIZED).json(generateResponseData({}, false, STATUS_UNAUTHORIZED, 'Unauthorized'));

        req.adminId = verified?.id;
        req.tokenId = verified?.tokenId;
        req.adminUserName = verified?.userName;
        req.name = verified?.name;

        next();
    } catch (error) {
        logger.error(error);

        return null;
    }
};

export default authTokenMiddleware;