import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { OthersInformationValidators } from "./othersInformation.validator.js";
import { OthersInformationController } from "./othersInformation.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create an othersInformation.
 *     description: Endpoint to add a new othersInformation to the system.
 *     parameters:
 *       - in: body
 *         name: othersInformation
 *         description: The othersInformation to create.
 *         schema:
 *           $ref: '#/definitions/OthersInformation'
 *     responses:
 *       200:
 *         description: OthersInformation successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    OthersInformationValidators.othersInformationBodyValidator,
    OthersInformationController.createOthersInformationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all othersInformations.
 *     description: Endpoint to retrieve a list of all othersInformations.
 *     responses:
 *       200:
 *         description: A list of othersInformations.
 */
router.get("/", [
    OthersInformationController.getOthersInformationListController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   get:
 *     summary: Retrieve a specific othersInformation by ID.
 *     description: Endpoint to get details of an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformation details.
 */
router.get("/:othersInformationId", [
    OthersInformationValidators.othersInformationParamsValidator,
    OthersInformationController.getAOthersInformationController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   put:
 *     summary: Update an othersInformation by ID.
 *     description: Endpoint to update the details of an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: othersInformation
 *         description: Updated details of the othersInformation.
 *         schema:
 *           $ref: '#/definitions/OthersInformation'
 *     responses:
 *       200:
 *         description: OthersInformation successfully updated.
 */
router.put("/:othersInformationId", [
    verifyAuthenticationTokenMiddleware,
    OthersInformationValidators.othersInformationParamsValidator,
    OthersInformationValidators.othersInformationBodyValidator,
    OthersInformationController.updateAOthersInformationController
]);

/**
 * @swagger
 * /{othersInformationId}:
 *   delete:
 *     summary: Delete an othersInformation by ID.
 *     description: Endpoint to delete an othersInformation by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationId
 *         required: true
 *         description: ID of the othersInformation to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformation successfully deleted.
 */
router.delete("/:othersInformationId", [
    verifyAuthenticationTokenMiddleware,
    OthersInformationValidators.othersInformationParamsValidator,
    OthersInformationController.deleteAOthersInformationController
]);

export default router;
