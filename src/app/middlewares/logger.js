
import fs from "fs";
import useragent from "useragent";

/**
* Middleware function for logging HTTP requests and responses.
* Captures relevant information about the incoming request and the resulting response,
* and appends the log data to an access log file.
* @param {object} req - Express request object
* @param {object} res - Express response object
* @param {function} next - Next middleware function
* @returns {void} Proceeds to the next middleware/controller after logging
*/
const logger = (req, res, next) => {
  // Parse the user-agent header to extract browser information
  const browser = useragent.parse(req.headers["user-agent"]).toString();

  // Create log data object containing relevant request and response information
  const logData = {
    timestamp: new Date().toISOString(),
    protocol: req.protocol,
    host: req.get("host"),
    url: req.originalUrl,
    browser: browser,
    method: req.method,
    status: res.statusCode,
    data: res.body,
  };

  // Convert log data to JSON format and add a newline character
  const log = JSON.stringify(logData) + "\n";

  // Append the log data to the access log file
  fs.appendFile("../logs/access.log", log, (error) => {
    if (error) console.error(error);
  });

  // Proceed to the next middleware/controller
  next();
};

export default logger;