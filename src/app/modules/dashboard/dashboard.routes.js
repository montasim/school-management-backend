import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { DashboardController } from "./dashboard.controller.js";

const router = express.Router();

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: Get the summary.
 *     description: Endpoint to get the summary of the system.
 *     responses:
 *       200:
 *         description: Summary fetched successfully.
 */
router.get("/summary", [
    authTokenMiddleware,
    DashboardController.getSummaryController
]);


export default router;
