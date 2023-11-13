/**
 * @fileoverview Multer Error Handling Middleware
 *
 * This module defines a middleware function for handling errors that might occur during file
 * uploads using Multer. It specifically intercepts errors thrown by Multer and other unexpected
 * errors, formatting them into appropriate HTTP responses. This middleware ensures that file
 * upload errors are caught and handled gracefully, providing clear feedback to the client about
 * the nature of the error. It's particularly useful in routes where file uploads are a key part
 * of the request handling process.
 *
 * @module multerErrorHandlerMiddleware
 * @requires multer - Multer library for handling multipart/form-data, primarily used for uploading files.
 * @requires generateResponseData - Utility function for generating standardized response data objects.
 * @requires constants - Module containing constant values like HTTP status codes.
 */

import multer from "multer";
import generateResponseData from "../../shared/generateResponseData.js";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from "../../constants/constants.js";

/**
 * Middleware to handle errors during file upload with Multer.
 * It intercepts Multer errors and other errors during the file upload process and sends
 * appropriate HTTP responses.
 *
 * @param {Error} error - The error object, if any error occurred during the middleware processing.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express middleware stack.
 */
const multerErrorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Handle multer-specific errors here
        return res.status(STATUS_BAD_REQUEST).json(generateResponseData({}, false, STATUS_BAD_REQUEST, error?.message));
    } else if (error) {
        // Handle other errors here
        return res.status(STATUS_INTERNAL_SERVER_ERROR).json(generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, "An unknown error occurred while uploading the file"));
    } else {
        // If no error, proceed to the next middleware
        next();
    }
};

export default multerErrorHandlerMiddleware;