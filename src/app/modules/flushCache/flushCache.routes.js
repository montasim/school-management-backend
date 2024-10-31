import express from "express";

import { FlushCacheController } from "./flushCache.controller.js";

import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a flushCache by ID.
 *     description: Endpoint to delete a flushCache by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the flushCache to delete.
 *     responses:
 *       200:
 *         description: FlushCache successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: FlushCache not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific flushCache.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
router.delete("/", [
    authTokenMiddleware,
    FlushCacheController.deleteFlushCacheController
]);

export default router;
