// CORS related
const ALLOWED_ORIGIN = [
    "https://school-abid.vercel.app",
    "http://localhost:3000",
];
const ALLOWED_METHODS = "GET,PUT,POST,DELETE";

// Log related
const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
};
const LOG_COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    verbose: 'magenta',
    debug: 'blue',
};

// Message related
const SERVER_LOG_MESSAGE = "Server running on port";
const FORBIDDEN_MESSAGE = "You do not have necessary permission";

const UPLOAD_DIRECTORY_MAP = {
    'download': 'download',
    'notice': 'notice',
    'result': 'result',
    'routine': 'routine'
};

export {
    ALLOWED_ORIGIN,
    ALLOWED_METHODS,
    LOG_LEVELS,
    LOG_COLORS,
    SERVER_LOG_MESSAGE,
    FORBIDDEN_MESSAGE,
    UPLOAD_DIRECTORY_MAP,
};