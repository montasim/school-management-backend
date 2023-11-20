/**
 * @fileoverview Middleware Validators for 'Level' Data in Express Application.
 *
 * This file contains middleware functions for validating 'level' data in the application.
 * It leverages the LevelSchema to validate different aspects of level data, such as the
 * body content and request parameters. The validators ensure that the data provided in
 * requests adheres to the expected format and structure before being processed by the
 * application's logic. This improves the robustness and security of the application by
 * preventing invalid or malformed data from being processed.
 *
 * Each validator function is designed to be used as middleware in Express routes,
 * facilitating the modular and reusable validation of level-related data across the application.
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { LevelSchema } from "./level.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for level's body data.
 *
 * Uses the levelBodySchema from the LevelSchema to validate
 * the body of the incoming request. This ensures that the level's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const levelBodyValidator = validateDataWithSchema(LevelSchema.levelBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for level's ID in request parameters.
 *
 * Uses the levelParamsSchema from the LevelSchema to validate
 * the level ID provided in the request parameters. This ensures that
 * the level ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const levelParamsValidator = await validateDataWithSchema(LevelSchema.levelParamsSchema, 'params');

/**
 * @namespace LevelValidators
 * @description Exported level validators to be used in routes.
 */
export const LevelValidators = {
    levelBodyValidator,
    levelParamsValidator,
};