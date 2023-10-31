import generateResponse from "../../../helpers/generateResponse.js";
import logger from "../../middlewares/logger.js";

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
        return generateResponse({}, true, 404, "Route not found");
    } catch (error) {
        logger.error(error);

        return generateResponse({}, false, 500, "An error occurred while processing the request");
    }
};

export default undefinedController;
