/**
 * @fileoverview Middleware for Blocking Browser-Based Requests.
 *
 * This module exports a middleware function designed to identify and block HTTP requests made from web browsers. It primarily relies on
 * examining the 'user-agent' header of incoming requests, searching for substrings that are typically found in user-agents of common web browsers.
 * The middleware is useful in contexts where API endpoints are intended to be accessed exclusively by non-browser clients, such as mobile apps or
 * server-to-server communications.
 *
 * @module isBrowserRequestMiddleware
 */

import { STATUS_BAD_REQUEST } from "../../constants/constants.js";
import logger from "../../shared/logger.js";

/**
 * Middleware to check if the incoming request is made from a web browser.
 *
 * It checks the 'user-agent' header of the request against a set of identifiers common to browsers. If any of these identifiers are found,
 * the middleware concludes that the request originated from a browser and responds with a status indicating a bad request. This is particularly
 * useful for APIs that are not meant to be consumed by browsers. In cases where the request does not originate from a browser, the middleware
 * simply passes control to the next function in the middleware chain.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {void|object} - Either proceeds to the next middleware/controller or ends the response cycle with a status code and error message.
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