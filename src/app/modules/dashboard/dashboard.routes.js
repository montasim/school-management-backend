import express from "express";
import verifyAuthenticationToken from "../../middlewares/verifyAuthenticationToken.js";
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
    verifyAuthenticationToken,
    DashboardController.getSummaryController
]);


export default router;
