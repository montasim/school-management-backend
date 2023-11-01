import jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from "../../config/config.js";
import generateResponseData from "../../helpers/generateResponseData.js";
import logger from "./logger.js";

const verifyAuthenticationToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            const verified = jwt.verify(token, SECRET_TOKEN);
            req.requestedBy = verified?.id;

            next();
        } else {
            return generateResponseData({}, false, 401, 'Unauthorized');
        }
    } catch (error) {
        logger.error(error);

        return generateResponseData({}, false, 400, 'Invalid token');
    }
};

export default verifyAuthenticationToken;