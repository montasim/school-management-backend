/**
 * @fileoverview Server Initialization and Configuration Module.
 *
 * This module is responsible for initializing and starting the Express server.
 * It imports the configured Express application from 'app.js' and starts listening
 * for incoming requests on a specified port. This module logs the server start
 * message and port number to provide visibility on the server status and acts as
 * the entry point for running the application server.
 *
 * Global handlers for 'uncaughtException', 'SIGTERM', and 'SIGINT' signals are also
 * set up to ensure graceful shutdown and resource management.
 *
 * @requires app - The configured Express application.
 * @requires PORT - The port number on which the server will listen.
 * @requires SERVER_LOG_MESSAGE - A message to be logged when the server starts.
 * @requires logger - A logging utility for logging messages.
 * @requires DatabaseMiddleware - Middleware for database connectivity.
 * @module server - Server initialization and configuration.
 */

import fs from "fs";
import https from 'https';
import app from './app.js';
import { PORT } from "./config/config.js";
import { EMAIL_RECIPIENTS, SERVER_LOG_MESSAGE } from "./constants/constants.js";
import logger from "./shared/logger.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";
import handleCriticalError from "./helpers/handleCriticalError.js";
import sendEmailToProvidedEmailAddress from "./helpers/sendEmailToProvidedEmailAddress.js";
import errorEmailBody from "./shared/errorEmailBody.js";

let server;

/**
 * Initializes and starts the Express server.
 *
 * The server listens to the port specified in the configuration and logs a message
 * indicating successful launch and the listening port. The `app.listen` method is
 * used to bind and listen for connections on the specified host and port. This file
 * serves as the starting point for the server, bringing together various configurations
 * and setting the server in motion.
 *
 * @function app.listen - Initiates the server to start listening on the specified port.
 * @param {number} PORT - The port number from the configuration.
 * @callback logger.http - Logs the server start-up message with the port number.
 */
try {

    /**
     * HTTPS Server Setup.
     *
     * This section initializes an HTTPS server with SSL options. It reads the SSL key and certificate
     * from the specified file paths and uses them to create a secure HTTPS server. If there is an
     * error reading the SSL files or starting the server, it is caught and handled in the catch block.
     *
     * @throws {Error} Will throw an error if the SSL files are not found or if the server fails to start.
     */
    // const sslOptions = {
    //     key: fs.readFileSync('path/to/key.pem'),
    //     cert: fs.readFileSync('path/to/cert.pem'),
    // };

    // // Uncomment the following lines to enable HTTPS server
    // server = https.createServer(sslOptions, app).listen(PORT, () => {
    //     logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);
    //
    //     // Optionally, this message can be logged to the console directly.
    //     console.log(`Server is running on HTTPS port ${PORT}`);
    // });


    /**
     * Initializes and starts the Express server.
     * Listens on the specified port and log the server a start-up message.
     *
     * @function server.listen
     * @param {number} PORT - The port number from the configuration.
     * @callback - Logs the server start-up message with the port number.
     */
    server = app.listen(PORT, () => {
        logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);

        // console.log(`${SERVER_LOG_MESSAGE} ${PORT}`); // Alternative console logging
    });
} catch (error) {
    // Prepare the email content
    const emailSubject = `School Management System: Critical Error`;
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

    handleCriticalError(error);
}

/**
 * Global handler for uncaught exceptions.
 *
 * This function is triggered when an uncaught exception occurs in the application.
 * It logs the error using both console and a custom logger, attempts to close the database connection
 * for cleanup, and then shuts down the server to prevent further operations in an unstable state.
 * The process is exited with a status code of 1 to indicate an error situation.
 *
 * @param {Error} error - The uncaught exception error object.
 */
process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);

    logger.error(error);

    try {
        // app.use(DatabaseMiddleware.disconnect);
    } catch (dbError) {
        console.error('Error closing the database connection:', dbError);

        logger.error(dbError);
    }

    // Stop the server from accepting new connections and finish existing connections
    server.close(() => {
        console.log('HTTP server closed due to uncaught exception');

        // Exit the process with a non-zero code to indicate an error
        process.exit(1);
    });
});

/**
 * Global handler for the SIGTERM signal.
 *
 * This handler is invoked when the application receives a SIGTERM signal, typically from the operating system
 * when a request is made to stop the application (like during a service restart). It logs the signal reception,
 * gracefully shuts down the server, and attempts to close the database connection. This ensures a clean and
 * orderly shutdown of the application.
 */
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');

    logger.error('SIGTERM signal received: closing HTTP server');

    server.close(() => {
        console.log('SIGTERM: HTTP server closed');

        // Close other resources like database connections here
        // app.use(DatabaseMiddleware.disconnect);
    });
});

/**
 * Global handler for the SIGINT signal.
 *
 * This handler is triggered when the application receives a SIGINT signal, which usually occurs when the user
 * interrupts the process (e.g., Ctrl+C in the terminal). It logs the signal reception and gracefully shuts down
 * the server. This handler is particularly important during development, as it allows for safe termination of the
 * application during manual tests.
 */
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');

    logger.error('SIGINT signal received: closing HTTP server');

    server.close(() => {
        console.log('SIGINT: HTTP server closed');

        // Close other resources here
    });
});