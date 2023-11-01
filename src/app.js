import express from "express";
import cors from "cors";
import corsOptions from "./app/middlewares/corsConfig.js";
import { PORT } from "./config/config.js";
import { SERVER_LOG_MESSAGE } from "./constants/constants.js";
import { Database } from "./app/middlewares/database.js";
import appRoutes from "./app/routes/index.js";
import logger from "./app/middlewares/logger.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
// server.use(isBrowserRequest);
app.use(Database.connectToDatabase);
app.use(`/`, appRoutes);
// server.use(Database.disconnectFromDatabase);

app.listen(PORT, () => {
    // logger.http(`${SERVER_LOG_MESSAGE} ${PORT}`);
    console.log(`${SERVER_LOG_MESSAGE} ${PORT}`);
});

export default app;
