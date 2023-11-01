import express from "express";
import cors from "cors";
import corsOptions from "./src/app/middlewares/corsConfig.js";
import { PORT } from "./src/config/config.js";
import { SERVER_LOG_MESSAGE } from "./src/constants/constants.js";
import { Database } from "./src/app/middlewares/database.js";
import appRoutes from "./src/app/routes/index.js";
import logger from "./src/app/middlewares/logger.js";

const server = express();

/**
 * Middleware to parse JSON requests.
 */
server.use(express.json());

server.use(cors(corsOptions));

// server.use(isBrowserRequest);

// Connect to the database
server.use(Database.connectToDatabase);

/**
 * Main route that attaches all application routes.
 * For example, if there is a "/status" route in `appRoutes`,
 * you can access it directly via "http://localhost:<PORT>/status".
 */
server.use(`/`, appRoutes);

// Disconnect from the database
// server.use(Database.disconnectFromDatabase);

/**
 * Start the Express server.
 * @listens {number} PORT - The port number from constants.
 */
server.listen(PORT, () => {
    // /**
    //  * Log server startup message to Winston logger.
    //  * @function
    //  */
    // logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);

    console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});

export default server;
