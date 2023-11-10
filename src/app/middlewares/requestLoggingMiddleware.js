/**
 * @fileoverview Request and Response Logging Middleware.
 *
 * This module defines a middleware for logging details of incoming requests and their responses in an Express application.
 * It captures and logs critical information about each request, including the URL, request method, headers, body, and the
 * response's status code and message. Additionally, it calculates and logs the duration of each request. The middleware
 * utilizes a shared logger utility to output these logs. It is designed to be inserted into the Express middleware stack,
 * enabling a centralized logging mechanism for monitoring and debugging purposes. The middleware also includes error handling
 * to log any exceptions that occur during the request/response cycle.
 *
 * @requires logger - Shared logging utility for logging request and response details.
 * @module logMiddleware - Middleware for logging request and response details in an Express application.
 */

import logger from '../../shared/logger.js';

/**
 * Logs the details of a request and its response using a logger.
 *
 * @function
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 * @param {function} next - The callback function to move to the next middleware in the stack.
 */
const requestLoggingMiddleware = (req, res, next) => {
    try {
        // Record the start time of the request.
        const requestStartTime = Date.now();

        // Event listener for when the response finishes.
        res.on('finish', () => {
            // Calculate the duration of the request.
            const requestDurationMs = Date.now() - requestStartTime;

            // Clone headers and remove the Authorization header to avoid logging sensitive information.
            const headersWithoutAuthorization = { ...req.headers };
            delete headersWithoutAuthorization.authorization;

            // Metadata to log.
            const requestLogDetails = {
                url: req.originalUrl,
                req: {
                    method: req.method,
                    headers: headersWithoutAuthorization,
                    body: req.body,
                },
                res: {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    duration: requestDurationMs,
                },
            };

            // Log the request completion information.
            logger.log({
                level: 'info',
                message: 'Request completed',
                meta: requestLogDetails,
            });
        });

        // Event listener for any errors in the request/response cycle.
        res.on('error', (error) => {
            // Metadata to log in case of error.
            const responseLogDetails = {
                url: req.originalUrl,
                error,
            };


            // Log the error information.
            logger.log({
                level: 'error',
                message: 'Request error',
                meta: responseLogDetails,
            });
        });

        // Move to the next middleware.
        next();
    } catch (error) {
        logger.error(error);
    }
};

export default requestLoggingMiddleware;