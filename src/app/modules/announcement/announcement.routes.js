import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { AnnouncementValidators } from "./announcement.validator.js";
import { AnnouncementController } from "./announcement.controller.js";

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
 */
router.post("/", [
    authTokenMiddleware,
    AnnouncementValidators.announcementBodyValidator,
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
 */
router.get("/", [
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
 */
router.get("/:announcementId", [
    AnnouncementValidators.announcementParamsValidator,
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
 */
router.put("/:announcementId", [
    authTokenMiddleware,
    AnnouncementValidators.announcementParamsValidator,
    AnnouncementValidators.announcementBodyValidator,
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
 */
router.delete("/:announcementId", [
    authTokenMiddleware,
    AnnouncementValidators.announcementParamsValidator,
    AnnouncementController.deleteAAnnouncementController
]);

export default router;
