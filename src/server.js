/**
 * @fileoverview Server initialization and configuration module.
 *
 * This module is responsible for initializing and starting the Express server. It imports the configured
 * Express application from 'app.js' and starts listening for incoming requests on a specified port.
 * The server start message and the port number are logged to provide visibility on the server status.
 * This module acts as the entry point for running the application server.
 *
 * @requires app - The configured Express application.
 * @requires PORT - The port number on which the server will listen.
 * @requires SERVER_LOG_MESSAGE - A message to be logged when the server starts.
 * @requires logger - A logging utility for logging messages.
 * @module server - Server initialization and configuration.
 */

import app from './app.js';
import { PORT } from "./config/config.js";
import { SERVER_LOG_MESSAGE } from "./constants/constants.js";
import logger from "./shared/logger.js";
import { DatabaseMiddleware } from "./app/middlewares/databaseMiddleware.js";

/**
 * Initializes and starts the Express server.
 *
 * The server listens on the port specified in the configuration and logs a message
 * indicating successful launch and the listening port. The `app.listen` method is
 * used to bind and listen for connections on the specified host and port. This file
 * serves as the starting point for the server, bringing together various configurations
 * and setting the server in motion.
 *
 * @function app.listen - Initiates the server to start listening on the specified port.
 * @param {number} PORT - The port number from the configuration.
 * @callback logger.http - Logs the server start-up message with the port number.
 */
const server = app.listen(PORT, () => {
    /**
     * Log the server start message along with the port number.
     */
    logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);
    // Optionally, this message can be logged to the console directly.
    // console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});

process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);

    logger.error(error);

    try {
        app.use(DatabaseMiddleware.disconnect);
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

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        // Close other resources like database connections here
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        // Close other resources here
    });
});