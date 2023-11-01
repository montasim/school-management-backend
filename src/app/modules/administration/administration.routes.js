import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { AdministrationValidators } from "./administration.validator.js";
import { AdministrationController } from "./administration.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create an administration.
 *     description: Endpoint to add a new administration to the system.
 *     parameters:
 *       - in: body
 *         name: administration
 *         description: The administration to create.
 *         schema:
 *           $ref: '#/definitions/Administration'
 *     responses:
 *       200:
 *         description: Administration successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    AdministrationValidators.administrationBodyValidator,
    AdministrationController.createAdministrationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all administrations.
 *     description: Endpoint to retrieve a list of all administrations.
 *     responses:
 *       200:
 *         description: A list of administrations.
 */
router.get("/", [
    AdministrationController.getAdministrationListController
]);

/**
 * @swagger
 * /{administrationId}:
 *   get:
 *     summary: Retrieve a specific administration by ID.
 *     description: Endpoint to get details of an administration by their ID.
 *     parameters:
 *       - in: path
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administration details.
 */
router.get("/:administrationId", [
    AdministrationValidators.administrationParamsValidator,
    AdministrationController.getAAdministrationController
]);

/**
 * @swagger
 * /{administrationId}:
 *   put:
 *     summary: Update an administration by ID.
 *     description: Endpoint to update the details of an administration by their ID.
 *     parameters:
 *       - in: path
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: administration
 *         description: Updated details of the administration.
 *         schema:
 *           $ref: '#/definitions/Administration'
 *     responses:
 *       200:
 *         description: Administration successfully updated.
 */
router.put("/:administrationId", [
    verifyAuthenticationTokenMiddleware,
    AdministrationValidators.administrationParamsValidator,
    AdministrationValidators.administrationBodyValidator,
    AdministrationController.updateAAdministrationController
]);

/**
 * @swagger
 * /{administrationId}:
 *   delete:
 *     summary: Delete an administration by ID.
 *     description: Endpoint to delete an administration by their ID.
 *     parameters:
 *       - in: path
 *         name: administrationId
 *         required: true
 *         description: ID of the administration to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administration successfully deleted.
 */
router.delete("/:administrationId", [
    verifyAuthenticationTokenMiddleware,
    AdministrationValidators.administrationParamsValidator,
    AdministrationController.deleteAAdministrationController
]);

export default router;
