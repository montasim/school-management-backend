/**
 * @fileoverview Main Express Application Setup.
 *
 * This file configures the Express.js application with various middlewares for security, performance, and functionality.
 * It includes Helmet for setting security-related HTTP headers, HPP for protection against HTTP Parameter Pollution,
 * CSRF protection, CORS for cross-origin resource sharing, session management, request logging, JSON body parsing
 * with size limits, URL-encoded body parsing, static file serving with caching, and rate limiting to prevent abuse.
 * The application also establishes a database connection for each request and includes routes for the application.
 * A global error handler is added to catch and handle unhandled exceptions and errors.
 *
 * @requires express: Express.js framework for building web applications.
 * @requires helmet: Middleware for setting security-related HTTP headers.
 * @requires hpp: Middleware for protection against HTTP Parameter Pollution.
 * @requires csurf: Middleware for CSRF protection.
 * @requires cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
 * @requires session: Middleware for session management.
 * @requires requestLoggingMiddleware: Custom middleware for logging incoming requests.
 * @requires corsConfigurationMiddleware: Custom configuration for the CORS middleware.
 * @requires userRateLimiter: Middleware for limiting the rate of requests.
 * @requires DatabaseMiddleware: Custom middleware for managing database connections.
 * @requires appRoutes: Module containing application routes.
 * @requires STATUS_INTERNAL_SERVER_ERROR: Constant representing the internal server error status code.
 * @requires logger: Utility for logging.
 * @module app - Exported Express.js application instance.
 */

import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import timeout from "connect-timeout";
import cookieParser from "cookie-parser";
import csurf from 'csurf';
import cors from "cors";
import session from 'express-session';
import requestLoggingMiddleware from "./app/middlewares/requestLoggingMiddleware.js";
import corsConfigurationMiddleware from "./app/middlewares/corsConfigurationMiddleware.js";
import rateLimiterMiddleware from "./app/middlewares/rateLimiterMiddleware.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";
import appRoutes from "./app/routes/app.routes.js";
import { EMAIL_SERVICE_USER, SECRET_KEY } from "./config/config.js";
import {
    JSON_PAYLOAD_LIMIT,
    TIMEOUT_IN_SECONDS,
    STANDARD_CACHE_TTL_IN_MILLISECOND,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    EMAIL_RECIPIENTS
} from "./constants/constants.js";
import logger from "./shared/logger.js";
import generateResponseData from "./shared/generateResponseData.js";
import sendEmailToProvidedEmailAddress from "./helpers/sendEmailToProvidedEmailAddress.js";
import errorEmailBody from "../../projify-backend/src/shared/errorEmailBody.js";

const app = express();

/**
 * Sets various HTTP security headers.
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            // Add other directives as per your requirement
        },
    },
}));

/**
 * Protects against HTTP Parameter Pollution attacks.
 */
app.use(hpp());

/**
 * Timeout after 60 seconds
 */
app.use(timeout(TIMEOUT_IN_SECONDS));

/**
 * Serves static files with caching.
 */
app?.use(express?.static('./', { maxAge: STANDARD_CACHE_TTL_IN_MILLISECOND })); // Cache duration in milliseconds

/**
 * Logs incoming HTTP requests.
 */
app.use(requestLoggingMiddleware);

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json({ limit:  JSON_PAYLOAD_LIMIT})); // Limit set for payload size

/**
 * Parses incoming requests with urlencoded payloads.
 */
app.use(express.urlencoded({ limit: JSON_PAYLOAD_LIMIT, extended: true }));

/**
 * Applies CORS configuration to handle cross-origin requests.
 */
app.use(cors(corsConfigurationMiddleware));

/**
 * Session Middleware Configuration.
 *
 * The session middleware is configured with a secret key to sign the session ID cookie,
 * adding security to the session. Additional options can be set based on the application's
 * requirements.
 */
// app.use(session({
//     secret: SECRET_KEY, // Use environment variable for production
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true, // Enhances security by preventing client-side script access to the cookie
//         secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         // Set other cookie options as needed
//     }
// }));

/**
 * Parsing cookies
 */
// app.use(cookieParser());

/**
 * CSRF protection
 */
// app.use(csurf({
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//     }
// }));

/**
 * Applies rate limiting to all incoming requests.
 */
app.use(rateLimiterMiddleware);

/**
 * Establishes a database connection for each request.
 */
app.use(DatabaseMiddleware.connect);

/**
 * Includes the application routes.
 */
app.use(`/`, appRoutes);

/**
 * Global error handler for catching unhandled exceptions and errors.
 */
app.use(async (error, req, res, next) => {
    logger.error(error);

    console.error(error?.stack);

    /**
     * Optionally, disconnect from the database after processing requests.
     * Uncomment the line below to enable this behavior.
     */
    app.use(DatabaseMiddleware.disconnect);

    // Prepare the email content
    const emailSubject = `School Management System: Uncaught Server Exception`;
    // List of email addresses to notify
    const emailRecipients = [...EMAIL_RECIPIENTS];

    // Send an email notification about the exception
    try {
        for (const address of emailRecipients) {
            await sendEmailToProvidedEmailAddress(address, emailSubject, errorEmailBody(error));
        }
    } catch (error) {
        console.error('Failed to send error notification email:', error);
    }

    return res?.status(STATUS_INTERNAL_SERVER_ERROR).json(
        generateResponseData(
            {},
            false,
            STATUS_INTERNAL_SERVER_ERROR,
            `UNCAUGHT EXCEPTION FROM SERVER: "${error}"`
        )
    );
});

export default app;