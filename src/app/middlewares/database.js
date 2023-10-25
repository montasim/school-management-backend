/**
 * @file database.js
 * @description This module handles the establishment and termination of a connection to the MongoDB database.
 * It imports necessary dependencies for connecting to the database and configuration settings from the "constants.js" module.
 * The module defines middleware functions to connect to and disconnect from the database.
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "../../constants/index.js";

/**
 * Middleware function for connecting to the MongoDB database.
 * Initializes a MongoDB client and establishes a connection to the database.
 * Adds the client and database references to the request object for subsequent use.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {Promise<void>} Proceeds to the next middleware/controller after establishing the connection
 */
const connectToDatabase = async (req, res, next) => {
  try {
    // Create a new MongoClient instance with connection options
    const client = new MongoClient(MONGODB_URI, {
      serverApi: ServerApiVersion.v1,
    });

    // Establish a connection to the MongoDB server
    await client.connect();

    // Attach the client and database references to the request object
    req.dbClient = client;
    req.db = client.db(DATABASE_NAME);

    console.info("Database connection successfully established.");

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
};

/**
 * Middleware function for disconnecting from the MongoDB database.
 * Closes the previously established database connection.
 * @param {object} req - Express request object
 * @returns {Promise<void>} Proceeds to the next middleware/controller after disconnecting from the database
 */
const disconnectFromDatabase = async (req) => {
  try {
    // Close the MongoDB client connection
    await req.dbClient.close();

    console.info("Database connection closed.");
  } catch (error) {
    console.error(`Error closing the Database connection: ${error.message}`);
  }
};

/**
 * Object containing database-related middleware functions.
 */
export const Database = {
  connectToDatabase,
  disconnectFromDatabase,
};