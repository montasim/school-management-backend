import express from "express";
import verifyJwt from "../../middlewares/verifyAuthenticationToken.js";
import multerConfig from "../../../helpers/multerConfig.js";
import { DownloadValidators } from "./download.validator.js";
import { DownloadController } from "./download.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a download.
 *     description: Endpoint to add a new download to the system.
 *     parameters:
 *       - in: body
 *         name: download
 *         description: The download to create.
 *         schema:
 *           $ref: '#/definitions/Download'
 *     responses:
 *       200:
 *         description: Download successfully created.
 */
router.post("/", [
    verifyJwt,
    multerConfig.single('file'),
    DownloadValidators.downloadBodyValidator,
    DownloadController.createDownloadController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all downloads.
 *     description: Endpoint to retrieve a list of all downloads.
 *     responses:
 *       200:
 *         description: A list of downloads.
 */
router.get("/", [
    DownloadController.getDownloadListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific download by ID.
 *     description: Endpoint to get details of a download by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the download to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Download details.
 */
router.get("/:fileName", [
    DownloadValidators.downloadParamsValidator,
    DownloadController.getADownloadController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a download by ID.
 *     description: Endpoint to delete a download by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the download to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Download successfully deleted.
 */
router.delete("/:fileName", [
    verifyJwt,
    DownloadValidators.downloadParamsValidator,
    DownloadController.deleteADownloadController
]);

export default router;
