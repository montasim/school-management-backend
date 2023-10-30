import winston from 'winston';

// Define log levels
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
};

// Define log colors
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    verbose: 'magenta',
    debug: 'blue',
};

// Create a custom format for logs
const logFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })
);

// Configure Winston
const logger = winston.createLogger({
    levels: logLevels,
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Output logs to the console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
        new winston.transports.File({ filename: 'logs/verbose.log', level: 'verbose' }),
        new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    level: 'http', // Minimum log level to display (change as needed)
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;
