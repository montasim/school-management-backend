import express from "express";
import indexController from "./index.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Index of the system.
 *     description: Endpoint to check the index of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.:
 *       500:
 *         description: Server is down.
 */
router.all("/", indexController);

export default router;
