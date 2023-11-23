/**
 * @fileoverview Rate Limiter Middleware Using MongoDB for Express.js Applications.
 *
 * This module provides a rate-limiting middleware designed for Express.js applications, utilizing MongoDB as the backend store.
 * The middleware is configured to limit the number of requests a user can make within a specified time window, helping to prevent
 * abuse and excessive use of resources. It is particularly useful for API endpoints where controlling the request rate is critical
 * for maintaining server performance and avoiding overloading. The configuration includes defining the time window, maximum number
 * of requests allowed, and the response message when the limit is exceeded. The module leverages the `express-rate-limit` and
 * `rate-limit-mongo` packages to implement these functionalities, offering a robust solution for rate limiting in Express.js
 * applications with MongoDB integration.
 *
 * @requires rateLimit - Middleware for rate-limiting requests in Express.js.
 * @requires MongoStore - Store for keeping rate limit data in MongoDB.
 * @requires config - Application configuration including MongoDB URI.
 * @module userRateLimiter - Exported rate limiter middleware for use in Express.js routes.
 */

import rateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import { MONGODB_URI } from "../../config/config.js";
import {
    RATE_LIMIT_HEADERS,
    RATE_LIMIT_MAX,
    RATE_LIMIT_MESSAGE,
    RATE_LIMIT_WINDOW_MS
} from "../../constants/constants.js";

/**
 * Initializes a rate limiting middleware using MongoDB as the store.
 * This middleware is crucial for controlling the rate of requests to the application, ensuring that users do not exceed
 * a specified number of requests within a given time frame. The configuration involves setting up a MongoDB store for
 * tracking request counts, defining the duration of the rate-limiting window, and specifying the maximum number of
 * allowed requests. The middleware also includes a custom message for users who exceed the limit and supports adding
 * rate limit headers to responses. This setup is vital for maintaining the application's stability and preventing
 * overuse of resources, making it a key component in the application's request handling pipeline.
 *
 * @type {import("express").RequestHandler} - The rate limiter middleware to be used with Express.js routes.
 * @throws Error - Captures and logs any errors during the initialization of the rate limiter.
 */
let rateLimiterMiddleware;

try {
    rateLimiterMiddleware = rateLimit({
        store: new MongoStore({
            uri: MONGODB_URI, // Connection string for MongoDB
            // Optional options for rate-limit-mongo
            // See: https://github.com/2do2go/rate-limit-mongo#options
        }),
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX,
        message: RATE_LIMIT_MESSAGE,
        headers: RATE_LIMIT_HEADERS,
    });
} catch (error) {
    /**
     * Log the error if rate limiter initialization fails.
     * Additional error handling can be implemented here.
     */
    console.error("Failed to create rate limiter:", error);
    // Consider implementing fallback mechanisms or additional notifications here.
}

/**
 * Export the configured rate limiter middleware.
 */
export default rateLimiterMiddleware;