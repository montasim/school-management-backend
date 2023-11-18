/**
 * @fileoverview MongoDB Connection Middleware Module.
 *
 * This module provides middleware functions for connecting to and disconnecting from a MongoDB database using the MongoClient from the "mongodb" package.
 * It ensures the reuse of a single MongoClient instance across the application for efficient database interactions. The module imports configuration
 * settings from "../../config/config.js" and a logger utility from "../../shared/logger.js" for logging purposes.
 *
 * The module exports an object `DatabaseMiddleware` containing the middleware functions `connect` and `disconnect`.
 *
 * @module DatabaseMiddleware
 */

import { MongoClient } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "../../config/config.js";
import logger from "../../shared/logger.js";

/**
 * Variable to hold the MongoClient instance.
 * @type {MongoClient}
 */
let client;

/**
 * Retrieves a singleton instance of the MongoClient.
 *
 * This function initializes and returns a MongoClient instance connected to the database. It ensures that only a single instance of MongoClient
 * is created and reused throughout the application, following the singleton pattern. This approach helps in managing database connections efficiently
 * and avoiding the overhead of establishing multiple connections. The function connects the client to the database using the URI provided in the
 * configuration file and sets options for `useNewUrlParser` and `useUnifiedTopology` to enable the new URL parser and the unified topology layer
 * respectively.
 *
 * @returns {Promise<MongoClient>} A promise that resolves to the MongoClient instance, connected to the database.
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
 * Middleware to establish a connection to the MongoDB database.
 * Attaches the database client and the specific database instance to the request object.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the connection is established and the middleware processing is complete.
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
 * Middleware to close the MongoDB database connection.
 * This function is optional and can be used to close the database connection after a request is processed.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the connection is closed and the middleware processing is complete.
 */
const disconnect = async (req, res, next) => {
  try {
    // Close the MongoDB client connection
    if (req?.dbClient?.isConnected())
      await req?.dbClient?.close();

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