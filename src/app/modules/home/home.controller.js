import generateResponse from "../../../helpers/generateResponse.js";
import logger from "../../middlewares/logger.js";

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
        return generateResponse({}, true, 200, "🚀");
    } catch (error) {
        logger.error(error);

        return generateResponse({}, false, 500, "Server is down");
    }
};

export default homeController;
