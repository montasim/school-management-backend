import express from "express";
import cors from "cors";
import corsOptions from "./app/middlewares/corsConfig.js";
import { PORT } from "./config/config.js";
import { SERVER_LOG_MESSAGE } from "./constants/constants.js";
import { Database } from "./app/middlewares/database.js";
import appRoutes from "./app/routes/index.js";
import logger from "./app/middlewares/logger.js";

const app = express();

/**
 * Middleware to parse JSON requests.
 */
app.use(express.json());

app.use(cors(corsOptions));

// app.use(isBrowserRequest);

// Connect to the database
app.use(Database.connectToDatabase);

/**
 * Main route that attaches all application routes.
 * For example, if there is a "/status" route in `appRoutes`,
 * you can access it directly via "http://localhost:<PORT>/status".
 */
app.use(`/`, appRoutes);

// Disconnect from the database
// app.use(Database.disconnectFromDatabase);

/**
 * Start the Express server.
 * @listens {number} PORT - The port number from constants.
 */
app.listen(PORT, () => {
    /**
     * Log server startup message to Winston logger.
     * @function
     */
    logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);

    // console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});

export default app;
