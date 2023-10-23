import { StatusCodes } from "http-status-codes";

/**
 * Controller to handle the status endpoint.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const statusController = async (req, res) => {
    try {
        if (!res.headersSent) {
            return res
                .status(StatusCodes.OK)
                .send({ message: "Server is up and running" });
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Server is down" });
    }
};

export default statusController;
