import express from "express";
import cors from "cors";
import requestLoggingMiddleware from "./app/middlewares/requestLoggingMiddleware.js";
import corsConfigurationMiddleware from "./app/middlewares/corsConfigurationMiddleware.js";
import userRateLimiter from "./app/middlewares/userRateLimiter.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";
import appRoutes from "./app/routes/index.js";

/**
 * Create an instance of an Express application.
 * @type {Express.Application}
 */
const app = express();

// To serve static files:
app.use(express.static('./'));

/**
 * Use the JSON middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Use the log middleware to log incoming requests.
 */
app.use(requestLoggingMiddleware);

/**
 * Use the CORS middleware with a custom configuration.
 */
app.use(cors(corsConfigurationMiddleware));

/**
 * Use middleware to determine if the request comes from a browser.
 */
// app.use(isBrowserRequestMiddleware);

/**
 * Apply the rate limiter to all routes
 */
app.use(userRateLimiter);

/**
 * Connect to the database before processing requests.
 */
app.use(DatabaseMiddleware.connect);

/**
 * Use application routes.
 */
app.use(`/`, appRoutes);

/**
 * Optionally, disconnect from the database after processing requests.
 * Uncomment the line below to enable this behavior.
 */
// app.use(DatabaseMiddleware.disconnect);

export default app;
