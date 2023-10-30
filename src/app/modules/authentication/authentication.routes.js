import express from "express";
import { AuthenticationValidators } from "./authentication.validator.js";
import { AuthenticationController } from "./authentication.controller.js";

const router = express.Router();

/**
 * POST /login route to authenticate a user.
 * @name Login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post(
    "/login",
    AuthenticationValidators.loginValidator,
    AuthenticationController.loginController
);

/**
 * POST /signup route to register a new user.
 * @name Signup
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post(
    "/signup",
    AuthenticationValidators.signupValidator,
    AuthenticationController.signupController
);

/**
 * PUT /reset-password/:adminId route to reset password for a specific admin.
 * @name ResetPassword
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put(
    "/reset-password/:adminId",
    AuthenticationValidators.authenticationParamsValidator,
    AuthenticationValidators.resetPasswordValidator,
    AuthenticationController.resetPasswordController
);

/**
 * DELETE /delete-user/:adminId route to delete a specific admin user.
 * @name DeleteUser
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete(
    "/delete-user/:adminId",
    AuthenticationValidators.authenticationParamsValidator,
    AuthenticationValidators.deleteAdminQueryValidator,
    AuthenticationController.deleteUserController
);

export default router;
