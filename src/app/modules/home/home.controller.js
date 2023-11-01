import logger from "../../../shared/logger.js";
import {SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK} from "../../../constants/constants.js";

/**
 * Controller to handle the home endpoint.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const homeController = async (req, res) => {
    try {
        const returnData = {
            data: "Home page of the school management API",
            success: true,
            status: STATUS_OK,
            message: "Welcome to school management API 🚀",
        };

        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: SERVER_DOWN_MESSAGE,
            success: true,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default homeController;
