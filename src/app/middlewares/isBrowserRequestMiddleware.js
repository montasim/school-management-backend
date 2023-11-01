import { STATUS_BAD_REQUEST } from "../../constants/constants.js";
import logger from "../../shared/logger.js";

/**
 * Middleware function to strictly check if a request is made from a web browser.
 * It examines the user-agent header to determine if the request is from a browser,
 * looking for specific substrings that are commonly present in browsers' user-agent strings.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {void|object} Proceeds to the next middleware/controller if not a browser request
 */
const isBrowserRequestMiddleware = (req, res, next) => {
  try {
    // Retrieve the user-agent header
    const userAgent = req.headers["user-agent"];

    // List of substrings commonly found in browsers' user-agent strings
    const browserIdentifiers = ["Mozilla", "Chrome", "Safari", "Opera", "MSIE", "Edge", "Firefox"];

    // Check if the request is made from a browser
    const isBrowserRequest = browserIdentifiers.some(identifier => userAgent.includes(identifier));

    if (isBrowserRequest) {
      return res
          .status(STATUS_BAD_REQUEST)
          .json({ error: "API endpoints can't be accessed from a browser." });
    } else {
      // Proceed to other routes and middleware
      next();
    }
  } catch (error) {
    logger.error(error);
  }
};

export default isBrowserRequestMiddleware;
