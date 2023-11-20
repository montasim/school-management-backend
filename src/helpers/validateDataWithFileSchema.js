/**
 * @fileoverview Middleware for Express.js to validate request data including both body and file.
 *
 * This file contains a middleware function that is designed to validate incoming requests in an Express.js
 * application. It is specifically tailored to handle requests that may include both JSON body data and file data,
 * such as an image. The function utilizes Joi, a schema description language and validator for JavaScript, to
 * ensure that the data conforms to predefined schemas. The middleware is flexible enough to handle scenarios where
 * the file upload is either mandatory or optional, based on the requirements of the specific route it is used in.
 * It first checks the presence of a file in the request and validates the file and body data against the provided
 * Joi schemas. If any validation fails, it sends a detailed error response. If the validations pass, it proceeds
 * to the next middleware in the Express pipeline.
 */

import Joi from "joi";
import {
    MAXIMUM_FILE_SIZE,
    STATUS_BAD_REQUEST,
    STATUS_INTERNAL_SERVER_ERROR
} from "../constants/constants.js";
import logger from "../shared/logger.js";

/**
 * Middleware for Express.js to validate both the request body and a file upload, with optional file requirement.
 *
 * This middleware function is crafted to support validation of both JSON body data and file data in incoming
 * requests. It leverages Joi for validation, providing robustness and flexibility. The function can be configured
 * to either require or not require a file in the request, making it suitable for different scenarios like creating
 * (where a file might be mandatory) or updating entries (where a file might be optional). If the file is required
 * but missing, or if there are validation issues with the body or file, it responds with a bad request status and
 * a descriptive error message. On successful validation, the middleware forwards control to the next handler in the
 * Express middleware chain.
 *
 * @param {Joi.Schema} bodyValidationSchema - Joi schema for validating the JSON body of the request.
 * @param {Joi.Schema} fileValidationSchema - Joi schema for validating the file included in the request.
 * @param {boolean} [isFileRequired=true] - Flag to indicate if the file is mandatory in the request.
 * @returns {Function} An Express middleware function which takes the standard Express `req`, `res`, and `next` parameters.
 */
const validateDataWithFileSchema = (bodyValidationSchema, fileValidationSchema, isFileRequired = true) => async (req, res, next) => {
    try {
        // Create an object to validate. Initially only includes body.
        const dataToValidate = {
            body: req?.body
        };

        // Add file to validation object if present, or if file is mandatory but missing, return error
        if (req?.file) {
            dataToValidate.file = req?.file;

            // Check if file size exceeds 1.1 MB
            if (req?.file?.size > MAXIMUM_FILE_SIZE) {
                return res?.status(STATUS_BAD_REQUEST).json({
                    data: {},
                    success: false,
                    status: STATUS_BAD_REQUEST,
                    message: `File size exceeds the ${MAXIMUM_FILE_SIZE}MB limit`
                });
            }
        } else if (isFileRequired) {
            return res?.status(STATUS_BAD_REQUEST).json({
                data: {},
                success: false,
                status: STATUS_BAD_REQUEST,
                message: 'File is missing'
            });
        }

        // Create a combined Joi schema. The file schema is applied only if the file is present or required.
        const combinedValidationSchema = Joi.object({
            body: bodyValidationSchema, // Schema for body
            ...(req?.file || isFileRequired ? { file: fileValidationSchema } : {}) // Conditional schema for file
        });

        // Validating with the combined schema
        const { error } = combinedValidationSchema.validate(dataToValidate, { allowUnknown: true, abortEarly: false });

        if (error) {
            const messages = error?.details.map(detail => detail.message).join(', ');
            return res.status(STATUS_BAD_REQUEST).json({
                data: {},
                success: false,
                status: STATUS_BAD_REQUEST,
                message: messages
            });
        }

        next();
    } catch (error) {
        logger.error(error);

        return res?.status(STATUS_INTERNAL_SERVER_ERROR).json(error);
    }
};

export default validateDataWithFileSchema;