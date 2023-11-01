import logger from "../shared/logger.js";

/**
 * Executes the provided service function, handles its response, and sends
 * the result back to the client. In case of errors, sends a 500 status code.
 *
 * @function
 * @async
 * @param {Object} res - The Express response object.
 * @param {Function} serviceFunction - The service function to be executed.
 * @param {...*} params - Arguments to be passed to the service function.
 * @returns {Object} Express response object with the appropriate status code and data.
 * @example
 * // In a controller function:
 * await handleServiceResponse(res, someServiceFunction, arg1, arg2);
 */
const handleServiceResponse = async (res, serviceFunction, ...params) => {
    try {
        const { data, success, status, message } = await serviceFunction(...params);

        return res.status(status).json({ data, success, status, message });
    } catch (error) {
        logger.error(error);

        return res.status(500).json(error);
    }
};

export default handleServiceResponse;