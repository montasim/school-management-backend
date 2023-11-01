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
        return res.status(200).send({ message: "🚀" });
    } catch (error) {
        logger.error(error);

        return res.status(500).send({ message: "Server is down 🥲🥲🥲" });
    }
};

export default homeController;
