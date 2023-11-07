import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { DesignationValidators } from "./designation.validator.js";
import { DesignationController } from "./designation.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a designation.
 *     description: Endpoint to add a new designation to the system.
 *     parameters:
 *       - in: body
 *         name: designation
 *         description: The designation to create.
 *         schema:
 *           $ref: '#/definitions/Designation'
 *     responses:
 *       200:
 *         description: Designation successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    DesignationValidators.designationBodyValidator,
    DesignationController.createDesignationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all designation.
 *     description: Endpoint to retrieve a list of all designation.
 *     responses:
 *       200:
 *         description: A list of designation.
 */
router.get("/", [
    DesignationController.getDesignationListController
]);

/**
 * @swagger
 * /{designationId}:
 *   get:
 *     summary: Retrieve a specific designation by ID.
 *     description: Endpoint to get details of a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Designation details.
 */
router.get("/:designationId", [
    DesignationValidators.designationParamsValidator,
    DesignationController.getADesignationController
]);

/**
 * @swagger
 * /{designationId}:
 *   put:
 *     summary: Update a designation by ID.
 *     description: Endpoint to update the details of a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: designation
 *         description: Updated details of the designation.
 *         schema:
 *           $ref: '#/definitions/Designation'
 *     responses:
 *       200:
 *         description: Designation successfully updated.
 */
router.put("/:designationId", [
    verifyAuthenticationTokenMiddleware,
    DesignationValidators.designationParamsValidator,
    DesignationValidators.designationBodyValidator,
    DesignationController.updateADesignationController
]);

/**
 * @swagger
 * /{designationId}:
 *   delete:
 *     summary: Delete a designation by ID.
 *     description: Endpoint to delete a designation by their ID.
 *     parameters:
 *       - in: path
 *         name: designationId
 *         required: true
 *         description: ID of the designation to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Designation successfully deleted.
 */
router.delete("/:designationId", [
    verifyAuthenticationTokenMiddleware,
    DesignationValidators.designationParamsValidator,
    DesignationController.deleteADesignationController
]);

export default router;
