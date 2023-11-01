import logger from "../../../shared/logger.js";

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
            status: 200,
            message: "Welcome to school management API 🚀",
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

export default homeController;
