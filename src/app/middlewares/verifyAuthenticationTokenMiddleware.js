// External Modules
import jwt from 'jsonwebtoken';

// Internal Modules - Configurations
import { SECRET_TOKEN } from '../../config/config.js';

// Internal Modules - Shared Utilities
import generateResponseData from '../../shared/generateResponseData.js';
import logger from '../../shared/logger.js';

// Internal Modules - Constants
import { STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED } from '../../constants/constants.js';


const verifyAuthenticationTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            const verified = jwt.verify(token, SECRET_TOKEN);
            req.adminId = verified?.id;
            req.adminUserName = verified?.userName;

            next();
        } else {
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, 'Unauthorized');
        }
    } catch (error) {
        logger.error(error);

        return generateResponseData({}, false, STATUS_BAD_REQUEST, 'Invalid token');
    }
};

export default verifyAuthenticationTokenMiddleware;