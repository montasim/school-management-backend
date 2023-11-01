import logger from '../../shared/logger.js';

/**
 * Middleware to log details of incoming requests and their responses.
 * Logs include the URL, request method, headers, body, response status code,
 * status message, and duration of the request.
 *
 * @module logMiddleware
 */

/**
 * Logs the details of a request and its response using a logger.
 *
 * @function
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 * @param {function} next - The callback function to move to the next middleware in the stack.
 */
const logMiddleware = (req, res, next) => {
    // Record the start time of the request.
    const start = Date.now();

    // Event listener for when the response finishes.
    res.on('finish', () => {
        // Calculate the duration of the request.
        const duration = Date.now() - start;

        // Clone headers and remove the Authorization header to avoid logging sensitive information.
        const sanitizedHeaders = { ...req.headers };
        delete sanitizedHeaders.authorization;

        // Metadata to log.
        const meta = {
            url: req.originalUrl,
            req: {
                method: req.method,
                headers: sanitizedHeaders,
                body: req.body,
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                duration,
            },
        };

        // Log the request completion information.
        logger.log({
            level: 'info',
            message: 'Request completed',
            meta,
        });
    });

    // Event listener for any errors in the request/response cycle.
    res.on('error', (error) => {
        // Metadata to log in case of error.
        const meta = {
            url: req.originalUrl,
            error,
        };

        // Log the error information.
        logger.log({
            level: 'error',
            message: 'Request error',
            meta,
        });
    });

    // Move to the next middleware.
    next();
};

export default logMiddleware;