import app from './app.js';
import { PORT } from "./config/config.js";
import { SERVER_LOG_MESSAGE } from "./constants/constants.js";
import logger from "./shared/logger.js";

/**
 * This module is responsible for starting the Express server.
 *
 * @module server
 */

/**
 * Starts the Express server and listens for incoming requests.
 * Logs the server start message and the port it's listening on.
 */
app.listen(PORT, () => {
    /**
     * Log the server start message along with the port number.
     */
    logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);
    // Optionally, this message can be logged to the console directly.
    // console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});