import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { NoticeValidators } from "./notice.validator.js";
import { NoticeController } from "./notice.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a notice.
 *     description: Endpoint to add a new notice to the system.
 *     parameters:
 *       - in: body
 *         name: notice
 *         description: The notice to create.
 *         schema:
 *           $ref: '#/definitions/Notice'
 *     responses:
 *       200:
 *         description: Notice successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    NoticeValidators.noticeBodyValidator,
    NoticeController.createNoticeController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all notices.
 *     description: Endpoint to retrieve a list of all notices.
 *     responses:
 *       200:
 *         description: A list of notices.
 */
router.get("/", [
    NoticeController.getNoticeListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific notice by ID.
 *     description: Endpoint to get details of a notice by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the notice to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice details.
 */
router.get("/:fileName", [
    NoticeValidators.noticeParamsValidator,
    NoticeController.getANoticeController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a notice by ID.
 *     description: Endpoint to delete a notice by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the notice to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice successfully deleted.
 */
router.delete("/:fileName", [
    authTokenMiddleware,
    NoticeValidators.noticeParamsValidator,
    NoticeController.deleteANoticeController
]);

export default router;
