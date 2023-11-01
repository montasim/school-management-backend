import logger from "../../../shared/logger.js";

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
            data: "Undefined page of the school management API",
            success: true,
            status: 200,
            message: "This route is to test the undefined route 😁",
        };

        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: "An error occurred while processing the request 🥲🥲🥲",
            success: true,
            status: 500,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default undefinedController;
