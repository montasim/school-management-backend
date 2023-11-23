/**
 * @fileoverview Announcement Routes
 *
 * This module defines the routes for managing announcements in the system. It includes
 * endpoints for creating, retrieving, updating, and deleting announcements.
 *
 * @module AnnouncementRoutes
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { AnnouncementValidators } from "./announcement.validator.js";
import { AnnouncementController } from "./announcement.controller.js";
import { CacheMiddleware } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create an announcement.
 *     description: Endpoint to add a new announcement to the system.
 *     parameters:
 *       - in: body
 *         name: announcement
 *         description: The announcement to create.
 *         schema:
 *           $ref: '#/definitions/Announcement'
 *     responses:
 *       200:
 *         description: Announcement successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post("/", [
    authTokenMiddleware,
    AnnouncementValidators.announcementBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    AnnouncementController.createAnnouncementController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all announcement.
 *     description: Endpoint to retrieve a list of all announcement.
 *     responses:
 *       200:
 *         description: A list of announcement.
 *       404:
 *         description: announcement not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    AnnouncementController.getAnnouncementListController
]);

/**
 * @swagger
 * /{announcementId}:
 *   get:
 *     summary: Retrieve a specific announcement by ID.
 *     description: Endpoint to get details of an announcement by their ID.
 *     parameters:
 *       - in: path
 *         name: announcementId
 *         required: true
 *         description: ID of the announcement to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement details.
 *       404:
 *         description: Announcement not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.get("/:announcementId", [
    AnnouncementValidators.announcementParamsValidator,
    CacheMiddleware.createCacheMiddleware,
    AnnouncementController.getAAnnouncementController
]);

/**
 * @swagger
 * /{announcementId}:
 *   put:
 *     summary: Update an announcement by ID.
 *     description: Endpoint to update the details of an announcement by their ID.
 *     parameters:
 *       - in: path
 *         name: announcementId
 *         required: true
 *         description: ID of the announcement to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: announcement
 *         description: Updated details of the announcement.
 *         schema:
 *           $ref: '#/definitions/Announcement'
 *     responses:
 *       200:
 *         description: Announcement successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.put("/:announcementId", [
    authTokenMiddleware,
    AnnouncementValidators.announcementParamsValidator,
    AnnouncementValidators.announcementBodyValidator,
    CacheMiddleware.deleteCacheMiddleware,
    AnnouncementController.updateAAnnouncementController
]);

/**
 * @swagger
 * /{announcementId}:
 *   delete:
 *     summary: Delete an announcement by ID.
 *     description: Endpoint to delete an announcement by their ID.
 *     parameters:
 *       - in: path
 *         name: announcementId
 *         required: true
 *         description: ID of the announcement to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Announcement not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:announcementId", [
    authTokenMiddleware,
    AnnouncementValidators.announcementParamsValidator,
    CacheMiddleware.deleteCacheMiddleware,
    AnnouncementController.deleteAAnnouncementController
]);

export default router;