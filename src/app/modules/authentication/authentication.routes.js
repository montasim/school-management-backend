import express from "express";
import { AuthenticationValidators } from "./authentication.validator.js";
import { AuthenticationController } from "./authentication.controller.js";

const router = express.Router();

router.post(
    "/login",
    AuthenticationValidators.loginValidator,
    AuthenticationController.loginController
);

router.post(
    "/signup",
    AuthenticationValidators.signupValidator,
    AuthenticationController.signupController
);

router.put(
    "/reset-password",
    AuthenticationValidators.resetPasswordValidator,
    AuthenticationController.resetPasswordController
);

router.delete(
    "/delete-user",
    AuthenticationValidators.deleteUserValidator,
    AuthenticationController.deleteUserController
);

export default router;
