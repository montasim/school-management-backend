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
                .status(200)
                .send({ message: "Server is up and running" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Server is down" });
    }
};

export default statusController;
