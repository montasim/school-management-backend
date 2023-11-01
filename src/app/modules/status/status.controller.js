import logger from "../../../shared/logger.js";

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
            status: 200,
            message: "Server is up and running 🚀",
        };

        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: "Server is down 🥲🥲🥲",
            success: true,
            status: 500,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default statusController;
