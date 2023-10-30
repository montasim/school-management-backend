import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../../constants/index.js"; // Preferably store this in an environment variable or some secure configuration

const verifyJwt = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        const returnData = {
            data: {},
            success: false,
            status: 401,
            message: "Unauthorized",
        };

        return res.status(returnData?.status).json(returnData);
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.FORBIDDEN,
                message: "Unauthorized",
            };

            return res.status(returnData?.status).json(returnData);
        }

        req.userId = decoded.id;
        next();
    });
};

export default verifyJwt;