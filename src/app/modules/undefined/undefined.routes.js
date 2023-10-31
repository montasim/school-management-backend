import express from "express";
import undefinedController from "./undefined.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Checks undefined route of the system.
 *     description: Endpoint to check the undefined route of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.:
 *       500:
 *         description: Server is down.
 */
router.all("*", undefinedController);

export default router;
