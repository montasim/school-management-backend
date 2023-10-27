import express from "express";
import { ContactValidators } from "./contact.validator.js";
import { ContactController } from "./contact.controller.js";

const router = express.Router();

router.post(
    "/",
    ContactValidators.contactBodyValidator,
    ContactController.contactController
);

/**
 * Exports the router that contains contact-related routes.
 * @exports contactRoutes
 */
export default router;
