import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { ResultValidators } from "./result.validator.js";
import { ResultController } from "./result.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a result.
 *     description: Endpoint to add a new result to the system.
 *     parameters:
 *       - in: body
 *         name: result
 *         description: The result to create.
 *         schema:
 *           $ref: '#/definitions/Result'
 *     responses:
 *       200:
 *         description: Result successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    ResultValidators.resultBodyValidator,
    ResultController.createResultController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all results.
 *     description: Endpoint to retrieve a list of all results.
 *     responses:
 *       200:
 *         description: A list of results.
 */
router.get("/", [
    ResultController.getResultListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific result by ID.
 *     description: Endpoint to get details of a result by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the result to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Result details.
 */
router.get("/:fileName", [
    ResultValidators.resultParamsValidator,
    ResultController.getAResultController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a result by ID.
 *     description: Endpoint to delete a result by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the result to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Result successfully deleted.
 */
router.delete("/:fileName", [
    authTokenMiddleware,
    ResultValidators.resultParamsValidator,
    ResultController.deleteAResultController
]);

export default router;
