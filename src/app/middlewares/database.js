import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "../../constants/index.js";

const connectToDatabase = async (req, res, next) => {
  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();

    req.dbClient = client;
    req.db = client.db(DATABASE_NAME);

    console.info("Database connection successfully established.");

    next();
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
};

const disconnectFromDatabase = async (req) => {
  try {
    await req.dbClient.close();

    console.info("Database connection closed.");
  } catch (error) {
    console.error(`Error closing the Database connection: ${error.message}`);
  }
};

export const Database = {
  connectToDatabase,
  disconnectFromDatabase,
};
