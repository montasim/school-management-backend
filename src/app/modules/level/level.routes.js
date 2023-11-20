/**
 * @fileoverview Express router setup for managing 'levels' in the application.
 *
 * This file defines routes for various operations related to 'levels',
 * such as creating, retrieving, updating, and deleting levels. It includes
 * routes for getting all levels, a specific level by ID, adding a new level,
 * updating a level, and deleting a level. Each route is associated with
 * specific middleware for authentication and validation, ensuring secure and
 * robust handling of requests.
 *
 * Swagger annotations are included for each route to facilitate the generation
 * of API documentation, providing details like summaries, descriptions,
 * parameter specifications, and expected responses for each endpoint.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
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
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
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
 *       404:
 *         description: Level not found.
 *       500:
 *         description: Internal server error.
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
 *       404:
 *         description: Level not found with the provided ID.
 *       500:
 *         description: Internal server error.
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
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:levelId", [
    authTokenMiddleware,
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
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Level not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:levelId", [
    authTokenMiddleware,
    LevelValidators.levelParamsValidator,
    LevelController.deleteALevelController
]);

export default router;