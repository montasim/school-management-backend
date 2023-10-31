import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../../config/config.js";
import logger from "./logger.js";

const createAuthenticationToken = async (userDetails = {}) => {
    try {
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

        throw error;
    }
};

export default createAuthenticationToken;