/**
 * @file authorizationHeader.js
 * @description This module defines authorizationHeader middleware functions for various user roles.
 * It imports HTTP status codes from the "http-status-codes" library and the secret token from the "constants.js" module.
 * These middleware functions validate the presence and validity of the authorization token in request headers
 * to ensure secure access to different parts of the application based on user roles.
 */

import validateAgainstSchema from "../helpers/validateAgainstSchema.js";
import authorizationHeaderSchema from "../helpers/authorizationHeaderSchema.js";

/**
 * This module imports HTTP status codes from the "http-status-codes" library
 * and the secret token from the "constants.js" module located in the "utils" directory.
 * These imported values are commonly used throughout the application for status code handling and authorization.
 */

/**
 * Middleware function for general authorizationHeader.
 * Validates the presence and validity of the authorization token in the request headers.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {Promise<void>} Sends an unauthorized response if validation fails, proceeds to the next middleware/controller otherwise
 */

const authorizationHeader = async (req, res, next) => {
  const secretToken = req.headers.authorization;

  // Use the validateAgainstSchema function to validate the authorization header
  validateAgainstSchema(authorizationHeaderSchema, secretToken, res);

  next();
};

/**
 * Object containing authorizationHeader middleware functions for different user roles.
 */
