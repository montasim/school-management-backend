import logger from "../shared/logger.js";

/**
 * Extracts specified keys from the request body and parameters. Also extracts the
 * 'requestedBy' and 'db' fields directly from the request object.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @param {string[]} keysFromBody - Array of keys to extract from request body.
 * @param {string[]} keysFromParams - Array of keys to extract from request parameters.
 * @returns {Object} Extracted data from the request.
 * @throws {Object} Will throw an error if extraction fails.
 * @example
 * const data = extractFromRequest(req, ['name', 'level', 'image'], ['studentId']);
 * // data might look like: { name: 'John', level: '1', image: 'img.jpg', studentId: 'student-12345' }
 */
const extractFromRequest = (req, keysFromBody = [], keysFromParams = []) => {
    try {
        const extractedData = {};

        keysFromBody.forEach(key => {
            if (req.body && key in req.body) extractedData[key] = req.body[key];
        });

        keysFromParams.forEach(key => {
            if (req.params && key in req.params) extractedData[key] = req.params[key];
        });

        extractedData.requestedBy = req.requestedBy;
        extractedData.db = req.db;

        return extractedData;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default extractFromRequest;