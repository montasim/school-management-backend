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
    const userAgent = req.headers['user-agent'];
    const { userName, password, db } = extractFromRequest(req, ['userName', 'password']);
    const loginDetails = { userName, password, userAgent };

    await handleServiceResponse(res, AuthenticationService.loginService, db, loginDetails);
};

/**
 * @async
 * @function loginController
 * @description Controller for login an admin.
 *
 * @param {express.Request} req - Express request object containing login details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const verifyUserController = async (req, res) => {
    const {adminId, db } = extractFromRequest(req, []);

    await handleServiceResponse(res, AuthenticationService.verifyUserService, db, adminId);
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
    const { name, userName, password, confirmPassword, db } = extractFromRequest(req, ['name', 'userName', 'password', 'confirmPassword']);
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
    const { oldPassword, newPassword, confirmNewPassword, adminId, tokenId, db } = extractFromRequest(req, ['oldPassword', 'newPassword', 'confirmNewPassword']);
    const resetPasswordDetails = { oldPassword, newPassword, confirmNewPassword, adminId, tokenId };

    await handleServiceResponse(res, AuthenticationService.resetPasswordService, db, resetPasswordDetails);
};

/**
 * @async
 * @function logoutController
 * @description Controller for log out an admin.
 *
 * @param {express.Request} req - Express request object containing used details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const logoutController = async (req, res) => {
    const { adminId, tokenId, db } = extractFromRequest(req, ['oldPassword', 'newPassword', 'confirmNewPassword']);

    await handleServiceResponse(res, AuthenticationService.logoutService, db, adminId, tokenId);
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
    const { password, confirmPassword, adminId, tokenId, db } = extractFromRequest(req, ['password', 'confirmPassword']);
    const deleteAdminDetails = { password, confirmPassword, adminId, tokenId };

    await handleServiceResponse(res, AuthenticationService.deleteUserService, db, deleteAdminDetails);
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
    verifyUserController,
    signupController,
    resetPasswordController,
    logoutController,
    deleteUserController,
};