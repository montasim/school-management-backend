import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { RoutineValidators } from "./routine.validator.js";
import { RoutineController } from "./routine.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a routine.
 *     description: Endpoint to add a new routine to the system.
 *     parameters:
 *       - in: body
 *         name: routine
 *         description: The routine to create.
 *         schema:
 *           $ref: '#/definitions/Routine'
 *     responses:
 *       200:
 *         description: Routine successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    RoutineValidators.routineBodyValidator,
    RoutineController.createRoutineController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all routines.
 *     description: Endpoint to retrieve a list of all routines.
 *     responses:
 *       200:
 *         description: A list of routines.
 */
router.get("/", [
    RoutineController.getRoutineListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific routine by ID.
 *     description: Endpoint to get details of a routine by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the routine to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Routine details.
 */
router.get("/:fileName", [
    RoutineValidators.routineParamsValidator,
    RoutineController.getARoutineController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a routine by ID.
 *     description: Endpoint to delete a routine by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the routine to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Routine successfully deleted.
 */
router.delete("/:fileName", [
    authTokenMiddleware,
    RoutineValidators.routineParamsValidator,
    RoutineController.deleteARoutineController
]);

export default router;
