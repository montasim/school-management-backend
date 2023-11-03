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