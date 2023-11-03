import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { LevelValidators } from "./level.validator.js";
import { LevelController } from "./level.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a level.
 *     description: Endpoint to add a new level to the system.
 *     parameters:
 *       - in: body
 *         name: level
 *         description: The level to create.
 *         schema:
 *           $ref: '#/definitions/Level'
 *     responses:
 *       200:
 *         description: Level successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    LevelValidators.levelBodyValidator,
    LevelController.createLevelController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all level.
 *     description: Endpoint to retrieve a list of all level.
 *     responses:
 *       200:
 *         description: A list of level.
 */
router.get("/", [
    LevelController.getLevelListController
]);

/**
 * @swagger
 * /{levelId}:
 *   get:
 *     summary: Retrieve a specific level by ID.
 *     description: Endpoint to get details of a level by their ID.
 *     parameters:
 *       - in: path
 *         name: levelId
 *         required: true
 *         description: ID of the level to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Level details.
 */
router.get("/:levelId", [
    LevelValidators.levelParamsValidator,
    LevelController.getALevelController
]);

/**
 * @swagger
 * /{levelId}:
 *   put:
 *     summary: Update a level by ID.
 *     description: Endpoint to update the details of a level by their ID.
 *     parameters:
 *       - in: path
 *         name: levelId
 *         required: true
 *         description: ID of the level to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: level
 *         description: Updated details of the level.
 *         schema:
 *           $ref: '#/definitions/Level'
 *     responses:
 *       200:
 *         description: Level successfully updated.
 */
router.put("/:levelId", [
    verifyAuthenticationTokenMiddleware,
    LevelValidators.levelParamsValidator,
    LevelValidators.levelBodyValidator,
    LevelController.updateALevelController
]);

/**
 * @swagger
 * /{levelId}:
 *   delete:
 *     summary: Delete a level by ID.
 *     description: Endpoint to delete a level by their ID.
 *     parameters:
 *       - in: path
 *         name: levelId
 *         required: true
 *         description: ID of the level to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Level successfully deleted.
 */
router.delete("/:levelId", [
    verifyAuthenticationTokenMiddleware,
    LevelValidators.levelParamsValidator,
    LevelController.deleteALevelController
]);

export default router;
