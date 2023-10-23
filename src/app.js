import express from "express";
import { API_VERSION, PORT } from "./constants/index.js";
import isBrowserRequest from "./app/middlewares/isBrowserRequest.js";
import appRoutes from "./app/routes/index.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

/**
 * Middleware to handle browser requests.
 * It checks if the request is made from a browser and prevents access to API endpoints from browsers.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the pipeline.
 */
app.use(isBrowserRequest);

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
