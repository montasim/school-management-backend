/**
 * @fileoverview Middleware Generator for Joi Schema Validation.
 *
 * This module exports a function that generates Express middleware for validating request data against a provided Joi schema.
 * The function takes a Joi schema and a source indicator (such as 'body', 'query', or 'params') to determine where to
 * look for the data in the request object. If validation fails, it sends a standardized error response; otherwise, it
 * allows the request to proceed to the next middleware. This utility simplifies adding validation logic to routes,
 * ensuring that incoming data adheres to the expected structure and types before being processed by the route handlers.
 *
 * @requires handleValidationError - Function to handle and respond to validation errors.
 * @requires logger - Shared logging utility for error logging.
 * @requires constants - Application constants, including HTTP status codes.
 * @module validateWithSchema - Generates middleware for Joi schema validation in Express routes.
 */

import handleValidationError from "./handleValidationError.js";
import logger from "../shared/logger.js";
import { STATUS_INTERNAL_SERVER_ERROR } from "../constants/constants.js";

/**
 * Generates a middleware to validate request data against a provided Joi schema.
 *
 * @function
 * @async
 * @param {Object} schema - The Joi schema to validate against.
 * @param {string} source - The location of the data on the request object. E.g., 'body', 'query', 'params'.
 * @returns {Function} Middleware function for validation.
 * @example
 * // Usage
 * router.homePagePost('/path', validateWithSchema(mySchema, 'body'), myController);
 */
const validateWithSchema = (schema, source) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req[source]);

        if (error) {
            return handleValidationError(res, error);
        }

        next();
    } catch (error) {
        logger.error(error);

        return res.status(STATUS_INTERNAL_SERVER_ERROR).json(error);
    }
};

export default validateWithSchema;