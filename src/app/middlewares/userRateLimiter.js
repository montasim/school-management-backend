import rateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";
import { MONGODB_URI } from "../../config/config.js";

/**
 * A rate limiter middleware configured to use MongoDB as a store.
 * Limits each user to a certain number of requests within a defined time window.
 * @type {import("express").RequestHandler}
 */
let userRateLimiter;

try {
    userRateLimiter = rateLimit({
        store: new MongoStore({
            uri: MONGODB_URI, // Connection string for MongoDB
            // Optional options for rate-limit-mongo
            // See: https://github.com/2do2go/rate-limit-mongo#options
        }),
        windowMs: 15 * 60 * 1000, // Defines the time window to be 15 minutes
        max: 100, // Limits each user to 100 requests per windowMs
        message: "You have exceeded the 100 requests in 15 minutes limit!", // Message to be displayed on exceeding the limit
        headers: true, // Adds rate limit headers to responses
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
export default userRateLimiter;
