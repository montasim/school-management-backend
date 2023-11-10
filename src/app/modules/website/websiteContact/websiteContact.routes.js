import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { WebsiteContactValidators } from "./websiteContact.validator.js";
import { WebsiteContactController } from "./websiteContact.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   websiteContact:
 *     summary: Create a website contact.
 *     description: Endpoint to add a website contact to the system.
 *     parameters:
 *       - in: body
 *         name: websiteContact
 *         description: The website contact to create.
 *         schema:
 *           $ref: '#/definitions/WebsiteContact'
 *     responses:
 *       200:
 *         description: Website contact successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    WebsiteContactValidators.websiteContactBodyValidator,
    WebsiteContactController.createWebsiteContact
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a website contact.
 *     description: Endpoint to get details of a website.
 *     responses:
 *       200:
 *         description: Website contact.
 */
router.get("/", [
    WebsiteContactController.getWebsiteContact
]);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a website contact.
 *     description: Endpoint to update the details of a website.
 *     parameters:
 *       - in: body
 *         name: website
 *         description: Updated details of the website.
 *         schema:
 *           $ref: '#/definitions/WebsiteContact'
 *     responses:
 *       200:
 *         description: Website contact successfully updated.
 */
router.put("/", [
    authTokenMiddleware,
    WebsiteContactValidators.websiteContactBodyValidator,
    WebsiteContactController.updateWebsiteContact
]);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a website contact.
 *     description: Endpoint to delete a website contact.
 *     responses:
 *       200:
 *         description: Website contact successfully deleted.
 */
router.delete("/", [
    authTokenMiddleware,
    WebsiteContactController.deleteWebsiteContact
]);

export default router;
