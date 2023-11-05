import { MongoClient } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "../../config/config.js";
import logger from "../../shared/logger.js";

/**
 * Variable to hold the MongoClient instance.
 * @type {MongoClient}
 */
let client;

/**
 * Function to get an instance of MongoClient.
 * Ensures that only a single instance of MongoClient is created and reused.
 * @returns {Promise<MongoClient>} The MongoClient instance.
 */
const getClient = async () => {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    console.info("Database connection successfully established 🚀");
  }

  return client;
};

/**
 * Middleware function for connecting to the MongoDB database.
 * Ensures that the database connection is established and available in the request object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {Promise<void>} Proceeds to the next middleware/controller after establishing the connection.
 */
const connect = async (req, res, next) => {
  try {
    const client = await getClient();
    req.dbClient = client;
    req.db = client.db(DATABASE_NAME);
    next();
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);

    logger.error(error);
  }
};

/**
 * Middleware function for disconnecting from the MongoDB database.
 * (Optional) Closes the database connection after request processing.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {Promise<void>} Proceeds to the next middleware/controller after disconnecting.
 */
const disconnect = async (req, res, next) => {
  try {
    // Close the MongoDB client connection
    await req.dbClient.close();

    console.info("Database connection closed");

    next();
  } catch (error) {
    console.error(`Error closing the Database connection: ${error.message}`);
    
    logger.error(error);
  }
};

/**
 * Object containing database-related middleware functions.
 * @type {object}
 */
export const DatabaseMiddleware = {
  connect,
  disconnect,
};