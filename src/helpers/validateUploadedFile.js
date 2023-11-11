/**
 * @fileoverview Utility function for validating uploaded files in Express applications.
 *
 * This module provides a function for validating the size and MIME type of files uploaded
 * through an Express request. It is designed to be used as part of the request handling
 * process, ensuring that uploaded files meet specific criteria defined by the application's
 * requirements. The function checks if the uploaded file exists, validates its size against
 * a maximum file size limit, and verifies that the file's MIME type is among the allowed types.
 * Validation failures result in appropriate HTTP responses being sent back to the client.
 *
 * @requires STATUS_BAD_REQUEST - Constant representing the bad request HTTP status code.
 * @requires generateResponseData - Utility function for generating standardized response data.
 * @requires logger - Shared logging utility for error handling.
 * @module validateUploadedFile - Function for validating file uploads in Express routes.
 */

import { STATUS_BAD_REQUEST } from "../constants/constants.js";
import generateResponseData from "../shared/generateResponseData.js";
import logger from "../shared/logger.js";

/**
 * Validates the uploaded file for size and type.
 *
 * @param {object} res - The Express response object.
 * @param {object} file - The uploaded file object from the request.
 * @param {number} maxFileSize - The maximum allowed file size in bytes.
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types for the file.
 * @returns {object|null} - Returns the response object if validation fails, otherwise null.
 */
const validateUploadedFile = (res, file, maxFileSize, allowedMimeTypes) => {
    try {
        if (!file) {
            return res.status(STATUS_BAD_REQUEST).send(generateResponseData({}, false, STATUS_BAD_REQUEST, "No file provided"));
        }

        if (file.size > maxFileSize) {
            return res.status(STATUS_BAD_REQUEST).send(generateResponseData({}, false, STATUS_BAD_REQUEST, "File size is too large"));
        }

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(STATUS_BAD_REQUEST).send(generateResponseData({}, false, STATUS_BAD_REQUEST, "Invalid file type"));
        }

        return null; // File is valid
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default validateUploadedFile;