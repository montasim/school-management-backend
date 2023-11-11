import logger from "../../../shared/logger.js";
import {SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK} from "../../../constants/constants.js";

/**
 * @async
 * @function undefinedController
 * @description Controller for getting the undefined status of the system.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const undefinedController = async (req, res) => {
    try {
        const returnData = {
            data: "Undefined API endpoint of the school management API",
            success: true,
            status: STATUS_OK,
            message: "The API endpoint you are trying to access is not defined 😁",
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

export default undefinedController;
