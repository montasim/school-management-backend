/**
 * Sends a response with validation error details.
 *
 * @function
 * @param {Object} res - The Express response object.
 * @param {Object} error - Joi validation error object.
 * @returns {Object} Express response object with status code and error messages.
 * @example
 * // In a middleware or controller function:
 * if (validationError) {
 *     return handleValidationError(res, validationError);
 * }
 */

const handleValidationError = (res, error) => {
    const messages = error.details.map(detail => detail.message);

    return res.status(400).json({
        data: {},
        success: false,
        status: 400,
        message: messages,
    });
};

export default handleValidationError;