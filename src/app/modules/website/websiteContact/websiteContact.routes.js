import express from "express";
import verifyAuthenticationTokenMiddleware from "../../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { WebsiteConfigurationValidators } from "./websiteContact.validator.js";
import { WebsiteContactController } from "./websiteContact.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   websiteConfiguration:
 *     summary: Create a website configuration.
 *     description: Endpoint to add a website configuration to the system.
 *     parameters:
 *       - in: body
 *         name: websiteConfiguration
 *         description: The website configuration to create.
 *         schema:
 *           $ref: '#/definitions/WebsiteConfiguration'
 *     responses:
 *       200:
 *         description: Website configuration successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteConfigurationValidators.websiteConfigurationBodyValidator,
    WebsiteContactController.createConfigurationWebsite
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website configuration.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website configuration.
 */
router.get("/", [
    WebsiteContactController.getConfigurationWebsite
]);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a website configuration.
 *     description: Endpoint to update the details of a website.
 *     parameters:
 *       - in: body
 *         name: website
 *         description: Updated details of the website.
 *         schema:
 *           $ref: '#/definitions/WebsiteConfiguration'
 *     responses:
 *       200:
 *         description: Website configuration successfully updated.
 */
router.put("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteConfigurationValidators.websiteConfigurationBodyValidator,
    WebsiteContactController.updateWebsiteConfiguration
]);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a website configuration.
 *     description: Endpoint to delete a website configuration.
 *     responses:
 *       200:
 *         description: Website configuration successfully deleted.
 */
router.delete("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteContactController.deleteWebsiteConfiguration
]);

export default router;
