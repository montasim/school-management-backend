// External Modules
import jwt from 'jsonwebtoken';

// Internal Modules - Configurations
import { SECRET_TOKEN } from '../../config/config.js';

// Internal Modules - Shared Utilities
import generateResponseData from '../../shared/generateResponseData.js';
import logger from '../../shared/logger.js';

// Internal Modules - Constants
import { STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../../constants/constants.js';

// Extracts token from the Authorization header
const extractToken = (header) => {
    const bearer = 'Bearer ';
    return header?.startsWith(bearer) ? header.slice(bearer.length) : null;
};

// Verifies the validity of the token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_TOKEN);
    } catch (error) {
        logger.error(error);
        return null;
    }
};

// Sends an unauthorized response
const sendUnauthorizedResponse = (res) => {
    res.status(STATUS_UNAUTHORIZED).json(generateResponseData({}, false, STATUS_UNAUTHORIZED, 'Unauthorized'));
};

// Sends an invalid token response
const sendInvalidTokenResponse = (res) => {
    res.status(STATUS_BAD_REQUEST).json(generateResponseData({}, false, STATUS_BAD_REQUEST, 'Invalid token'));
};

// Main middleware to verify authentication token
const verifyAuthenticationTokenMiddleware = (req, res, next) => {
    const token = extractToken(req.headers['authorization']);

    if (!token) {
        return sendUnauthorizedResponse(res);
    }

    const verified = verifyToken(token);

    if (!verified) {
        return sendInvalidTokenResponse(res);
    }

    req.adminId = verified.id;
    req.adminUserName = verified.userName;

    next();
};

export default verifyAuthenticationTokenMiddleware;
