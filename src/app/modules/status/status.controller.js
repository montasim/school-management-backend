import logger from "../../../shared/logger.js";
import {SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK} from "../../../constants/constants.js";

/**
 * @async
 * @function statusController
 * @description Controller for getting the status of the system.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const statusController = async (req, res) => {
    try {
        const returnData = {
            data: "Status page of the school management API",
            success: true,
            status: STATUS_OK,
            message: "Server is up and running 🚀",
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

export default statusController;
