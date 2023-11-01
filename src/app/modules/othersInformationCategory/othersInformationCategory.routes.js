import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { CategoryValidators } from "./othersInformationCategory.validator.js";
import { OthersInformationCategoryController } from "./othersInformationCategory.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a othersInformationCategory.
 *     description: Endpoint to add a new othersInformationCategory to the system.
 *     parameters:
 *       - in: body
 *         name: othersInformationCategory
 *         description: The othersInformationCategory to create.
 *         schema:
 *           $ref: '#/definitions/OthersInformationCategory'
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    CategoryValidators.othersInformationCategoryBodyValidator,
    OthersInformationCategoryController.createOthersInformationCategory
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all othersInformationCategory.
 *     description: Endpoint to retrieve a list of all othersInformationCategory.
 *     responses:
 *       200:
 *         description: A list of othersInformationCategory.
 */
router.get("/", [
    OthersInformationCategoryController.getOthersInformationCategoryList
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   get:
 *     summary: Retrieve a specific othersInformationCategory by ID.
 *     description: Endpoint to get details of a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformationCategory details.
 */
router.get("/:othersInformationCategoryId", [
    CategoryValidators.othersInformationCategoryParamsValidator,
    OthersInformationCategoryController.getAOthersInformationCategory
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   put:
 *     summary: Update a othersInformationCategory by ID.
 *     description: Endpoint to update the details of a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: othersInformationCategory
 *         description: Updated details of the othersInformationCategory.
 *         schema:
 *           $ref: '#/definitions/OthersInformationCategory'
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully updated.
 */
router.put("/:othersInformationCategoryId", [
    verifyAuthenticationTokenMiddleware,
    CategoryValidators.othersInformationCategoryParamsValidator,
    CategoryValidators.othersInformationCategoryBodyValidator,
    OthersInformationCategoryController.updateAOthersInformationCategory
]);

/**
 * @swagger
 * /{othersInformationCategoryId}:
 *   delete:
 *     summary: Delete a othersInformationCategory by ID.
 *     description: Endpoint to delete a othersInformationCategory by their ID.
 *     parameters:
 *       - in: path
 *         name: othersInformationCategoryId
 *         required: true
 *         description: ID of the othersInformationCategory to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OthersInformationCategory successfully deleted.
 */
router.delete("/:othersInformationCategoryId", [
    verifyAuthenticationTokenMiddleware,
    CategoryValidators.othersInformationCategoryParamsValidator,
    OthersInformationCategoryController.deleteAOthersInformationCategory
]);

export default router;
