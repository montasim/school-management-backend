import validateWithSchema from "../../../helpers/validateWithSchema.js";
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
const levelBodyValidator = validateWithSchema(LevelSchema.levelBodySchema, 'body');

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
const levelParamsValidator = await validateWithSchema(LevelSchema.levelParamsSchema, 'params');

/**
 * @namespace LevelValidators
 * @description Exported level validators to be used in routes.
 */
export const LevelValidators = {
    levelBodyValidator,
    levelParamsValidator,
};
