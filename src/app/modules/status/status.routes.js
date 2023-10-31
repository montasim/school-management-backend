import express from "express";
import statusController from "./status.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Checks status of the system.
 *     description: Endpoint to check the status of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.:
 *       500:
 *         description: Server is down.
 */
router.all("*", statusController);

export default router;
