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
app.listen(PORT, () => {
    /**
     * Log the server start message along with the port number.
     */
    logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);
    // Optionally, this message can be logged to the console directly.
    // console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});