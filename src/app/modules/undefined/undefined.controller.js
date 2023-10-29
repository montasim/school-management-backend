import { StatusCodes } from "http-status-codes";

/**
 * Handle requests to undefined routes.
 *
 * If the route isn't defined in the application, it sends a 404 Not Found response.
 * If any internal error occurs while processing, it sends a 500 Internal Server Error response.
 *
 * @async
 * @function
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {express.Response} Express response object.
 */
const undefinedController = async (req, res) => {
    try {
        if (!res.headersSent) {
            return res
                .status(404)
                .send({ message: "Route not found!" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "An error occurred while processing the request." });
    }
};

export default undefinedController;
