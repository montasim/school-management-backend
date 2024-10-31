import express from "express";

import {CacheMiddleware} from "../../middlewares/cacheMiddleware.js";

import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /flush-cache:
 *   delete:
 *     summary: Flush all cache entries.
 *     description: Endpoint to delete all cached entries.
 *     responses:
 *       200:
 *         description: All cache entries successfully flushed.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for flushing all cache.
 * Requires authentication.
 * @route DELETE /flush-cache
 */
router.delete("/", [
    authTokenMiddleware,
    CacheMiddleware.flushAllCacheMiddleware
]);

export default router;
