import express from "express";
import { AuthenticationValidators } from "./authentication.validator.js";
import { AuthenticationController } from "./authentication.controller.js";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: login an admin.
 *     description: Endpoint to login admin to the system.
 *     parameters:
 *       - in: body
 *         name: login
 *         description: The admin to login.
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         description: Admin successfully logged in.
 */
router.post(
    "/login",
    AuthenticationValidators.loginValidator,
    AuthenticationController.loginController
);

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Verify an admin.
 *     description: Endpoint to verify the login admin of the system.
 *     responses:
 *       200:
 *         description: Admin verified.
 */
router.get(
    "/verify-user",
    authTokenMiddleware,
    AuthenticationController.verifyUserController
);

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create an admin.
 *     description: Endpoint to add a new admin to the system.
 *     parameters:
 *       - in: body
 *         name: signup
 *         description: The admin to create.
 *         schema:
 *           $ref: '#/definitions/signup'
 *     responses:
 *       200:
 *         description: Admin successfully created.
 */
router.post(
    "/signup",
    AuthenticationValidators.signupValidator,
    AuthenticationController.signupController
);

/**
 * @swagger
 * /{reset-password}:
 *   put:
 *     summary: Reset password an admin by ID.
 *     description: Endpoint to update the password of an admin by their ID.
 *     parameters:
 *       - in: body
 *         name: admin
 *         description: Updated details of the admin password.
 *         schema:
 *           $ref: '#/definitions/reset-password'
 *     responses:
 *       200:
 *         description: Admin password successfully updated.
 */
router.put(
    "/reset-password",
    authTokenMiddleware,
    AuthenticationValidators.resetPasswordValidator,
    AuthenticationController.resetPasswordController
);

/**
 * @swagger
 * /{administrationId}:
 *   delete:
 *     summary: Delete an administration by ID.
 *     description: Endpoint to delete an administration by their ID.
 *     parameters:
 *       - in: body
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administration successfully deleted.
 */
router.delete(
    "/delete-user",
    authTokenMiddleware,
    AuthenticationController.deleteUserController
);

export default router;
