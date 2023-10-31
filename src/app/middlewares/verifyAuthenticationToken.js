import jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from "../../config/config.js";
import generateResponse from "../../helpers/generateResponse.js";
import logger from "./logger.js";

const verifyAuthenticationToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            const verified = jwt.verify(token, SECRET_TOKEN);
            req.requestedBy = verified?.id;

            console.log(req.requestedBy)

            next();
        } else {
            return generateResponse({}, false, 401, 'Unauthorized');
        }
    } catch (error) {
        logger.error(error);

        return generateResponse({}, false, 400, 'Invalid token');
    }
};

export default verifyAuthenticationToken;