import express from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import requestLoggingMiddleware from "./app/middlewares/requestLoggingMiddleware.js";
import corsConfigurationMiddleware from "./app/middlewares/corsConfigurationMiddleware.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";
import appRoutes from "./app/routes/app.routes.js";
import {
    JSON_PAYLOAD_LIMIT,
    STATUS_INTERNAL_SERVER_ERROR,
    EMAIL_RECIPIENTS,
    ALLOWED_ORIGIN,
} from "./constants/constants.js";
import logger from "./shared/logger.js";
import generateResponseData from "./shared/generateResponseData.js";
import sendEmailToProvidedEmailAddress from "./helpers/sendEmailToProvidedEmailAddress.js";
import errorEmailBody from "./shared/errorEmailBody.js";

const app = express();

/**
 * Sets various HTTP security headers.
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: [
                "'self'", ...ALLOWED_ORIGIN], // Allow image requests from localhost:5000
        },
    },
}));

/**
 * Logs incoming HTTP requests.
 */
app.use(requestLoggingMiddleware);

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json({ limit: JSON_PAYLOAD_LIMIT }));

/**
 * Parses incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ limit: JSON_PAYLOAD_LIMIT, extended: true }));

/**
 * CORS configuration to handle cross-origin requests.
 */
app.use(cors(corsConfigurationMiddleware));

/**
 * Middleware to explicitly set Cross-Origin Resource Policy.
 */
app.use((req, res, next) => {
    res.header("cross-origin-resource-policy", "cross-origin");
    next();
});

/**
 * Establishes a database connection for each request.
 */
app.use(DatabaseMiddleware.connect);

// Serve static files from the "files" directory, accessible at "/files"
app.use('/files', express.static(path.join(process.cwd(), 'files')));

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

    const emailSubject = `School Management System: Uncaught Server Exception`;
    const emailRecipients = [...EMAIL_RECIPIENTS];

    try {
        for (const address of emailRecipients) {
            await sendEmailToProvidedEmailAddress(address, emailSubject, errorEmailBody(error));
        }
    } catch (emailError) {
        console.error('Failed to send error notification email:', emailError);
    }

    return res.status(STATUS_INTERNAL_SERVER_ERROR).json(
        generateResponseData(
            {},
            false,
            STATUS_INTERNAL_SERVER_ERROR,
            `UNCAUGHT EXCEPTION FROM SERVER: "${error}"`
        )
    );
});

export default app;
