import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { AuthenticationSchema } from "./authentication.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for login body data.
 *
 * Uses the loginSchema from the LoginSchema to validate
 * the body of the incoming request. This ensures that the login
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const loginValidator = validateDataWithSchema(AuthenticationSchema.loginSchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for signup body data.
 *
 * Uses the signupSchema from the SignupSchema to validate
 * the body of the incoming request. This ensures that the signup
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const signupValidator = validateDataWithSchema(AuthenticationSchema.signupSchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for reset password body data.
 *
 * Uses the resetPasswordSchema from the ResetPasswordSchema to validate
 * the body of the incoming request. This ensures that the reset password
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const resetPasswordValidator = validateDataWithSchema(AuthenticationSchema.resetPasswordSchema, 'body');

/**
 * @typedef {Object} AuthenticationValidators
 * @property {Function} loginValidator - Validates login request.
 * @property {Function} signupValidator - Validates signup request.
 * @property {Function} resetPasswordValidator - Validates reset password request.
 */
export const AuthenticationValidators = {
    loginValidator,
    signupValidator,
    resetPasswordValidator,
};
