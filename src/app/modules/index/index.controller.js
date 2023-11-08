import logger from "../../../shared/logger.js";
import { SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR } from "../../../constants/constants.js";
import returnData from "./index.constants.js";

const indexController = async (req, res) => {
    try {
        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: SERVER_DOWN_MESSAGE,
            success: false,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default indexController;