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
        return res.status(200).send({ message: "Server is up and running 🚀" });
    } catch (error) {
        logger.error(error);

        return res.status(200).send({ message: "Server is down 🥲🥲🥲" });
    }
};

export default statusController;
