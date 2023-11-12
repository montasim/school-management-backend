/**
 * @fileoverview Main Express Application Setup.
 *
 * This module sets up the Express.js application, configuring essential middlewares and routes for the server.
 * It includes initializations for JSON request parsing, request logging, Cross-Origin Resource Sharing (CORS),
 * rate limiting, and database connectivity. The application is structured to serve static files, handle JSON requests,
 * log all incoming requests for monitoring purposes, apply CORS policies for security, and limit request rates to
 * prevent abuse. Additionally, the module integrates database middleware to establish a connection with the database
 * before processing incoming requests and optionally disconnect after processing. The application's routes are defined
 * in a separate module and are included here to set up the overall routing mechanism. This setup forms the backbone
 * of the Express.js server, ensuring that it is well-configured, secure, and ready to handle various types of requests.
 *
 * @requires express - Express.js framework for building web applications.
 * @requires cors - Middleware for enabling CORS (Cross-Origin Resource Sharing).
 * @requires requestLoggingMiddleware - Middleware for logging incoming requests.
 * @requires corsConfigurationMiddleware - Custom configuration for the CORS middleware.
 * @requires userRateLimiter - Middleware for limiting the rate of requests.
 * @requires DatabaseMiddleware - Middleware for database connectivity.
 * @requires appRoutes - Routing module for defining application routes.
 * @module app - Exported Express.js application instance.
 */

import express from "express";
import cors from "cors";
import requestLoggingMiddleware from "./app/middlewares/requestLoggingMiddleware.js";
import corsConfigurationMiddleware from "./app/middlewares/corsConfigurationMiddleware.js";
import userRateLimiter from "./app/middlewares/userRateLimiter.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";
import appRoutes from "./app/routes/index.js";


/**
 * Initializes and configures an Express.js application instance.
 * This initialization includes applying various middlewares and setting up the routes for the application.
 * The middlewares include JSON parser for request body parsing, request logging for monitoring and debugging,
 * CORS handling with a custom configuration for cross-origin requests, and rate limiting to control request frequency.
 * The database connection is established before handling any routes through the DatabaseMiddleware.
 * All the application-specific routes are then mounted to the Express app. Optionally, there's provision to
 * disconnect from the database after request processing. This setup ensures a structured and efficient handling
 * of requests with necessary preprocessing and postprocessing steps, providing a solid foundation for the
 * web application's backend architecture.
 *
 * @type {Express.Application} - The configured Express.js application ready for use.
 */
const app = express();

/**
 * To serve static files
 */
app.use(express.static('./'));

/**
 * Use the log middleware to log incoming requests.
 */
app.use(requestLoggingMiddleware);

/**
 * Use the JSON middleware to parse incoming JSON requests.
 */
app.use(express.json());

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