import jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from "../../constants/index.js";

const verifyJwt = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            const verified = jwt.verify(token, SECRET_TOKEN);
            req.requestedBy = verified?.id;

            next();
        } else {
            const returnData = {
                data: {},
                success: false,
                status: 401,
                message: "Unauthorized",
            };

            return res.status(returnData?.status).json(returnData);
        }
    } catch (error) {
        const returnData = {
            data: {},
            success: false,
            status: 400,
            message: "Invalid token",
        };

        res.status(returnData?.status).json(returnData);
    }
};

export default verifyJwt;