/**
 * @file isBrowserRequest.js
 * @description Middleware to check if a request is made from a web browser.
 * This module defines a middleware function that examines the user-agent header
 * to determine if the incoming request is from a web browser. If it detects a
 * browser request, it responds with an error; otherwise, it allows the request
 * to proceed to other routes and middleware.
 * @module IsBrowserRequest
 */

/**
 * Middleware function to check if a request is made from a web browser.
 * It examines the user-agent header to determine if the request is from a browser.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {void|object} Proceeds to the next middleware/controller if not a browser request
 */
const isBrowserRequest = (req, res, next) => {
  // Check if the request is made from a browser
  const isBrowserRequest = req.headers["user-agent"].includes("Mozilla");

  if (isBrowserRequest) {
    return res
      .status(400)
      .json({ error: "API endpoints can't be accessed from a browser." });
  } else {
    // Proceed to other routes and middleware
    next();
  }
};

export default isBrowserRequest;
