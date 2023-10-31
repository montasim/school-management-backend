import generateResponse from "../../../helpers/generateResponse.js";
import logger from "../../middlewares/logger.js";

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
        return generateResponse({}, true, 200, "Server is up and running");
    } catch (error) {
        logger.error(error);

        return generateResponse({}, false, 500, "Server is down");
    }
};

export default statusController;
