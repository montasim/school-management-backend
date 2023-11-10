/**
 * @fileoverview Logger Configuration and Creation.
 *
 * This module configures and creates a logger instance using the Winston library. It sets up logging to
 * both the console and multiple log files, categorizing logs based on their severity levels such as error, warn,
 * info, http, verbose, and debug. The module also ensures the existence of a log directory, creating it if it
 * doesn't exist. The configured logger is used throughout the application for consistent logging practices,
 * facilitating easier debugging and monitoring of the application's behavior.
 *
 * @requires winston - A versatile logging library for Node.js.
 * @requires path - Core Node.js module for handling and transforming file paths.
 * @requires constants - Application constants for configuring log levels and colors.
 * @requires createFolderIfNotExists - Utility to ensure the existence of a directory.
 * @module logger - Configured Winston logger instance for application-wide logging.
 */

import winston from 'winston';
import path from "path";
import { LOG_LEVELS, LOG_COLORS } from "../constants/constants.js";
import createFolderIfNotExists from "./createFolderIfNotExists.js";

/**
 * Configure and create a logger instance using Winston.
 * This logger outputs logs to the console and to different log files.
 * The logs directory is created if it does not exist.
 *
 * @module logger
 */

// Apply the color settings to Winston
winston.addColors(LOG_COLORS);

// Define the logs directory path
const logsDirectory = '/tmp/logs';

/**
 * Ensures the logs directory exists, creating it if necessary.
 */
await createFolderIfNotExists(logsDirectory);

// Define a custom log format
const logFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, meta }) => {
        const { req, res, error, url } = meta || {};

        return `${timestamp} [${level}] URL: ${url} Req: ${JSON.stringify(req)} Res: ${JSON.stringify(res)} Error: ${error} Message: ${message}`;
    })
);

/**
 * Create a Winston logger instance with the specified log levels, format, and transports.
 *
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
    levels: LOG_LEVELS,
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Output logs to the console
        new winston.transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'warn.log'), level: 'warn' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'info.log'), level: 'info' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'http.log'), level: 'http' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'verbose.log'), level: 'verbose' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'debug.log'), level: 'debug' }),
        new winston.transports.File({ filename: path.join(logsDirectory, 'combined.log') }),
    ],
    level: 'http', // Minimum log level to display
});

export default logger;