import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { WebsiteValidators } from "./website.validator.js";
import { WebsiteController } from "./website.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a website.
 *     description: Endpoint to add a new website to the system.
 *     parameters:
 *       - in: body
 *         name: website
 *         description: The website to create.
 *         schema:
 *           $ref: '#/definitions/Website'
 *     responses:
 *       200:
 *         description: Website successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteValidators.websiteBodyValidator,
    WebsiteController.createWebsite
]);

/**
 * @swagger
 * /{websiteId}:
 *   get:
 *     summary: Retrieve a website configuration.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website details.
 */
router.get("/", [
    WebsiteController.getWebsite
]);

/**
 * @swagger
 * /{websiteId}:
 *   put:
 *     summary: Update a website by ID.
 *     description: Endpoint to update the details of a website by their ID.
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         required: true
 *         description: ID of the website to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: website
 *         description: Updated details of the website.
 *         schema:
 *           $ref: '#/definitions/Website'
 *     responses:
 *       200:
 *         description: Website successfully updated.
 */
router.put("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteValidators.websiteBodyValidator,
    WebsiteController.updateAWebsite
]);

/**
 * @swagger
 * /{websiteId}:
 *   delete:
 *     summary: Delete a website by ID.
 *     description: Endpoint to delete a website by their ID.
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         required: true
 *         description: ID of the website to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Website successfully deleted.
 */
router.delete("/", [
    verifyAuthenticationTokenMiddleware,
    WebsiteController.deleteAWebsite
]);

export default router;
