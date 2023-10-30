import express from "express";
import cors from "cors";
import favicon from "express-favicon";
import path from "path";
import corsOptions from "./app/middlewares/corsConfig.js";
import { PORT } from "./constants/index.js";
import logger from "./app/middlewares/logger.js";
import isBrowserRequest from "./app/middlewares/isBrowserRequest.js";
import { Database } from "./app/middlewares/database.js";
import appRoutes from "./app/routes/index.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors(corsOptions));

// Middleware to serve the favicon
// app.use(favicon(path.join(__dirname, './public/favicon.ico')));

/**
* Middleware to handle browser requests.
app.use(cors({
 * It checks if the request is made from a browser and prevents access to API endpoints from browsers.
  origin: "https://school-abid.vercel.app",
 *
  methods: "GET,PUT,POST,DELETE",
 * @param {object} req - The Express request object.
  credentials: true, // If you need to support cookies or authentication
 * @param {object} res - The Express response object.
}));
 * @param {function} next - The next middleware function in the pipeline.

 */
// app.use(isBrowserRequest);

// Custom logging middleware
// app.use(logger);

// Connect to the database
app.use(Database.connectToDatabase);

/**
// Main route that attaches all application routes
 * Main route that attaches all application routes.
 * For example, if there is a "/status" route in `appRoutes`,
 * you can access it directly via "http://localhost:<PORT>/status".
 */
app.use(`/`, appRoutes);

// Disconnect from the database
app.use(Database.disconnectFromDatabase);

/**
 * Start the Express server.
 * @listens {number} PORT - The port number from constants.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
