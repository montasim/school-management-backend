import express from "express";
import homeController from "./home.controller.js";

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
router.all("/", homeController);

export default router;
