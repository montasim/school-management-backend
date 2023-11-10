import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteSocialMediaValidators } from "./websiteSocialMedia.validator.js";
import { WebsiteSocialMediaController } from "./websiteSocialMedia.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   websiteSocialMedia:
 *     summary: Create a website important information link.
 *     description: Endpoint to add a website important information link to the system.
 *     parameters:
 *       - in: body
 *         name: websiteSocialMedia
 *         description: The website important information link to create.
 *         schema:
 *           $ref: '#/definitions/WebsiteSocialMedia'
 *     responses:
 *       200:
 *         description: Website important information link successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    WebsiteSocialMediaValidators.websiteSocialMediaBodyValidator,
    WebsiteSocialMediaController.createWebsiteSocialMedia
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website important information link.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website important information link.
 */
router.get("/", [
    WebsiteSocialMediaController.getWebsiteSocialMedia
]);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a website important information link.
 *     description: Endpoint to update the details of a website.
 *     parameters:
 *       - in: body
 *         name: website
 *         description: Updated details of the website.
 *         schema:
 *           $ref: '#/definitions/WebsiteSocialMedia'
 *     responses:
 *       200:
 *         description: Website important information link successfully updated.
 */
router.put("/", [
    authTokenMiddleware,
    WebsiteSocialMediaValidators.websiteSocialMediaBodyValidator,
    WebsiteSocialMediaController.updateWebsiteSocialMedia
]);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a website important information link.
 *     description: Endpoint to delete a website important information link.
 *     responses:
 *       200:
 *         description: Website important information link successfully deleted.
 */
router.delete("/", [
    authTokenMiddleware,
    WebsiteSocialMediaController.deleteWebsiteSocialMedia
]);

export default router;