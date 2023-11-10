import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteOfficialLinkValidators } from "./websiteOfficialLink.validator.js";
import { WebsiteOfficialLinkController } from "./websiteOfficialLink.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   websiteOfficialLink:
 *     summary: Create a website important information link.
 *     description: Endpoint to add a website important information link to the system.
 *     parameters:
 *       - in: body
 *         name: websiteOfficialLink
 *         description: The website important information link to create.
 *         schema:
 *           $ref: '#/definitions/WebsiteOfficialLink'
 *     responses:
 *       200:
 *         description: Website important information link successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    WebsiteOfficialLinkValidators.websiteOfficialLinkBodyValidator,
    WebsiteOfficialLinkController.createWebsiteOfficialLink
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
    WebsiteOfficialLinkController.getWebsiteOfficialLink
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
 *           $ref: '#/definitions/WebsiteOfficialLink'
 *     responses:
 *       200:
 *         description: Website important information link successfully updated.
 */
router.put("/", [
    authTokenMiddleware,
    WebsiteOfficialLinkValidators.websiteOfficialLinkBodyValidator,
    WebsiteOfficialLinkController.updateWebsiteOfficialLink
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
    WebsiteOfficialLinkController.deleteWebsiteOfficialLink
]);

export default router;