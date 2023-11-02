import express from "express";
import verifyAuthenticationTokenMiddleware from "../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { HomePageCarouselValidators } from "./homePageCarousel.validator.js";
import { HomePageCarouselController } from "./homePageCarousel.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create a homePageCarousel.
 *     description: Endpoint to add a new homePageCarousel to the system.
 *     parameters:
 *       - in: body
 *         imageDescription: The description of the image
 *         description: The homePageCarousel to create.
 *         imageLink: image imageLink
 *         description: The link of the image.
 *         schema:
 *           $ref: '#/definitions/HomePageCarousel'
 *     responses:
 *       200:
 *         description: HomePageCarousel successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    HomePageCarouselValidators.homePageCarouselBodyValidator,
    HomePageCarouselController.createHomePageCarouselController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all homePageCarousel.
 *     description: Endpoint to retrieve a list of all homePageCarousel.
 *     responses:
 *       200:
 *         description: A list of homePageCarousel.
 */
router.get("/", [
    HomePageCarouselController.getHomePageCarouselListController
]);

/**
 * @swagger
 * /{homePageCarouselId}:
 *   get:
 *     summary: Retrieve a specific homePageCarousel by ID.
 *     description: Endpoint to get details of a homePageCarousel by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageCarouselId
 *         required: true
 *         description: ID of the homePageCarousel to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: HomePageCarousel details.
 */
router.get("/:homePageCarouselId", [
    HomePageCarouselValidators.homePageCarouselParamsValidator,
    HomePageCarouselController.getAHomePageCarouselController
]);

/**
 * @swagger
 * /{homePageCarouselId}:
 *   put:
 *     summary: Update a homePageCarousel by ID.
 *     description: Endpoint to update the details of a homePageCarousel by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageCarouselId
 *         required: true
 *         description: ID of the homePageCarousel to update.
 *         schema:
 *           type: string
 *       - in: body
 *         imageDescription: The description of the image
 *         description: The homePageCarousel to create.
 *         imageLink: image imageLink
 *         description: The link of the image.
 *         schema:
 *           $ref: '#/definitions/HomePageCarousel'
 *     responses:
 *       200:
 *         description: HomePageCarousel successfully updated.
 */
router.put("/:homePageCarouselId", [
    verifyAuthenticationTokenMiddleware,
    HomePageCarouselValidators.homePageCarouselParamsValidator,
    HomePageCarouselValidators.homePageCarouselBodyValidator,
    HomePageCarouselController.updateAHomePageCarouselController
]);

/**
 * @swagger
 * /{homePageCarouselId}:
 *   delete:
 *     summary: Delete a homePageCarousel by ID.
 *     description: Endpoint to delete a homePageCarousel by their ID.
 *     parameters:
 *       - in: path
 *         name: homePageCarouselId
 *         required: true
 *         description: ID of the homePageCarousel to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: HomePageCarousel successfully deleted.
 */
router.delete("/:homePageCarouselId", [
    verifyAuthenticationTokenMiddleware,
    HomePageCarouselValidators.homePageCarouselParamsValidator,
    HomePageCarouselController.deleteAHomePageCarouselController
]);

export default router;
