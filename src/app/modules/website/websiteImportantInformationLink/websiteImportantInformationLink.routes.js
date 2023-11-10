import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteImportantInformationLinkValidators } from "./websiteImportantInformationLink.validator.js";
import { WebsiteImportantInformationLinkController } from "./websiteImportantInformationLink.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   websiteImportantInformationLink:
 *     summary: Create a website important information link.
 *     description: Endpoint to add a website important information link to the system.
 *     parameters:
 *       - in: body
 *         name: websiteImportantInformationLink
 *         description: The website important information link to create.
 *         schema:
 *           $ref: '#/definitions/WebsiteImportantInformationLink'
 *     responses:
 *       200:
 *         description: Website important information link successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkBodyValidator,
    WebsiteImportantInformationLinkController.createWebsiteImportantInformationLink
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
    WebsiteImportantInformationLinkController.getWebsiteImportantInformationLink
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
 *           $ref: '#/definitions/WebsiteImportantInformationLink'
 *     responses:
 *       200:
 *         description: Website important information link successfully updated.
 */
router.put("/", [
    authTokenMiddleware,
    WebsiteImportantInformationLinkValidators.websiteImportantInformationLinkBodyValidator,
    WebsiteImportantInformationLinkController.updateWebsiteImportantInformationLink
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
    WebsiteImportantInformationLinkController.deleteWebsiteImportantInformationLink
]);

export default router;