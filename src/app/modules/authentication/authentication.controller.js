import { AuthenticationService } from "./authentication.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function loginController
 * @description Controller for login an admin.
 *
 * @param {express.Request} req - Express request object containing login details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const loginController = async (req, res) => {
    const { username, password, db } = extractFromRequest(req, ['username', 'password']);
    const loginDetails = { username, password };

    await handleServiceResponse(res, AuthenticationService.loginService, db, loginDetails);
};

/**
 * @async
 * @function signupController
 * @description Controller for signup an admin.
 *
 * @param {express.Request} req - Express request object containing signup details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const signupController = async (req, res) => {
    const { name, userName, password, confirmPassword, db } = extractFromRequest(req, ['name', 'username', 'password', 'confirmPassword']);
    const signupDetails = { name, userName, password, confirmPassword };

    await handleServiceResponse(res, AuthenticationService.signupService, db, signupDetails);
};

/**
 * @async
 * @function resetPasswordController
 * @description Controller for reset an admin password.
 *
 * @param {express.Request} req - Express request object containing signup details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const resetPasswordController = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword, db } = extractFromRequest(req, ['oldPassword', 'newPassword', 'confirmNewPassword']);
    const resetPasswordDetails = { oldPassword, newPassword, confirmNewPassword };

    await handleServiceResponse(res, AuthenticationService.resetPasswordService, db, resetPasswordDetails);
};

/**
 * @async
 * @function deleteAnAdmin
 * @description Controller for deleting an admin.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteUserController = async (req, res) => {
    const { password, confirmPassword, db } = extractFromRequest(req, ['password', 'confirmPassword']);
    const resetPasswordDetails = { password, confirmPassword };

    await handleServiceResponse(res, AuthenticationService.deleteUserService, db, resetPasswordDetails);
};

/**
 * @typedef {Object} AuthenticationControllers
 * @property {Function} loginController - Controller for login route.
 * @property {Function} signupController - Controller for signup route.
 * @property {Function} resetPasswordController - Controller for password reset route.
 * @property {Function} deleteUserController - Controller for delete user route.
 */
export const AuthenticationController = {
    loginController,
    signupController,
    resetPasswordController,
    deleteUserController,
};