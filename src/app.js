import express from "express";
import { API_VERSION, PORT } from "./constants/index.js";
import appRoutes from "./app/routes/index.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

/**
 * Main route that attaches all application routes.
 * For example, if there is a "/status" route in `appRoutes`,
 * you can access it directly via "http://localhost:<PORT>/status".
 */
app.use(`/`, appRoutes);

/**
 * Start the Express server.
 * @listens {number} PORT - The port number from constants.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/** Express application */
export default app;
