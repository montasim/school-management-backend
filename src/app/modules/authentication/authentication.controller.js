import { AuthenticationService } from "./authentication.service.js";

/**
 * Controller for handling login requests.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const loginController = async (req, res) => {
    try {
        const {
            userName,
            password,
        } = req?.body;
        const loginDetails = {
            userName,
            password
        };
        const loginServiceResponse = await AuthenticationService.loginService(req?.db, loginDetails);
        const returnData = {
            data: loginServiceResponse?.data,
            success: loginServiceResponse?.success,
            status: loginServiceResponse?.status,
            message: loginServiceResponse?.message,
        };

        return res.status(loginServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Controller for handling signup requests.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const signupController = async (req, res) => {
    try {
        const {
            name,
            userName,
            password,
            confirmPassword,
        } = req?.body;
        const signupDetails = {
            name,
            userName,
            password,
            confirmPassword,
        };
        const signupServiceResponse = await AuthenticationService.signupService(req?.db, signupDetails);
        const returnData = {
            data: signupServiceResponse?.data,
            success: signupServiceResponse?.success,
            status: signupServiceResponse?.status,
            message: signupServiceResponse?.message,
        };

        return res.status(signupServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Controller for handling signup requests.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const resetPasswordController = async (req, res) => {
    try {
        const { adminId } = req?.params;
        const {
            password,
            confirmPassword,
            requestedBy
        } = req?.body;
        const resetPasswordDetails = {
            password,
            confirmPassword,
            requestedBy
        };
        const resetPasswordServiceResponse = await AuthenticationService.resetPasswordService(req?.db, adminId, resetPasswordDetails);
        const returnData = {
            data: resetPasswordServiceResponse?.data,
            success: resetPasswordServiceResponse?.success,
            status: resetPasswordServiceResponse?.status,
            message: resetPasswordServiceResponse?.message,
        };

        return res.status(resetPasswordServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Controller for handling admin deletion requests.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Express response object.
 */
const deleteUserController = async (req, res) => {
    try {
        const { adminId } = req?.params;
        const { requestedBy } = req?.query;
        const deleteAdminServiceResponse = await AuthenticationService.deleteUserService(req?.db, requestedBy, adminId);
        const returnData = {
            data: deleteAdminServiceResponse?.data,
            success: deleteAdminServiceResponse?.success,
            status: deleteAdminServiceResponse?.status,
            message: deleteAdminServiceResponse?.message,
        };

        return res.status(deleteAdminServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
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