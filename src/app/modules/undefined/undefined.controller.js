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
        return res.status(404).send({ message: "This route is to test the undefined route 😁" });
    } catch (error) {
        logger.error(error);

        return res.status(500).send({ message: "An error occurred while processing the request" });
    }
};

export default undefinedController;
