/**
 * @fileoverview Video Gallery Validators.
 *
 * This file contains the validator functions for the video gallery data.
 * It includes validators for both the body and parameters of incoming requests related to important
 * information links. The validators ensure that the data provided in requests meets the expected
 * format and criteria as defined in the corresponding schemas. These validators are used as middleware
 * in the video gallery routes to validate request data before processing.
 *
 * @requires validateDataWithSchema - Function to validate data against a given Joi schema.
 * @requires VideoGallerySchema - Schemas for website important information link validation.
 * @module VideoGalleryValidators - Exports validators for use in route handling.
 */

import validateDataWithSchema from "../../../../helpers/validateDataWithSchema.js";
import { VideoGallerySchema } from "./videoGallery.schema.js";

/**
 * Validator for Video Gallery Body Data.
 *
 * Validates the request body data for operations related to a video gallery.
 * Utilize the Joi schema defined in VideoGallerySchema to ensure the provided
 * data in the request body adheres to the specified structure and rules. This validator is used as
 * middleware in routes to check the integrity and format of incoming data for important information links.
 */

const videoGalleryBodyValidator = validateDataWithSchema(VideoGallerySchema.videoGalleryBodySchema, 'body');

/**
 * Validator for Video Gallery Parameters.
 *
 * Validates the request parameters, particularly the ID of the important information link,
 * for operations that require specifying a specific link. It checks the ID against the Joi schema
 * defined in VideoGallerySchema to ensure it meets the required format.
 * This validator is crucial in routes that handle operations on individual important information links.
 */
const videoGalleryParamsValidator = validateDataWithSchema(VideoGallerySchema.videoGalleryParamsSchema, 'params');

/**
 * @namespace WebsiteValidators
 * @description Exported website important information link validators to be used in routes.
 */
export const VideoGalleryValidators = {
    videoGalleryBodyValidator,
    videoGalleryParamsValidator,
};