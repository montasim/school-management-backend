import { RoutineSchema } from "./routine.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for routine's body data.
 *
 * Uses the routineBodySchema from the RoutineSchema to validate
 * the body of the incoming request. This ensures that the routine's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const routineBodyValidator = validateWithSchema(RoutineSchema.routineBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for routine's ID in request parameters.
 *
 * Uses the routineParamsSchema from the RoutineSchema to validate
 * the routine ID provided in the request parameters. This ensures that
 * the routine ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const routineParamsValidator = validateWithSchema(RoutineSchema.routineParamsSchema, 'params');

/**
 * @namespace RoutineValidators
 * @description Exported routine validators to be used in routes.
 */
export const RoutineValidators = {
    routineBodyValidator,
    routineParamsValidator,
};