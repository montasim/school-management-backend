import express from "express";
import verifyAuthenticationTokenMiddleware from "../../../middlewares/verifyAuthenticationTokenMiddleware.js";
import { HomePagePostValidators } from "./homePagePost.validator.js";
import { HomePageHomePagePostController } from "./homePagePost.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Create an homePagePost.
 *     description: Endpoint to add a new homePagePost to the system.
 *     parameters:
 *       - in: body
 *         name: homePagePost
 *         description: The homePagePost to create.
 *         schema:
 *           $ref: '#/definitions/HomePagePost'
 *     responses:
 *       200:
 *         description: HomePagePost successfully created.
 */
router.post("/", [
    verifyAuthenticationTokenMiddleware,
    HomePagePostValidators.homePagePostBody,
    HomePageHomePagePostController.createHomePagePost
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all homePagePost.
 *     description: Endpoint to retrieve a list of all homePagePost.
 *     responses:
 *       200:
 *         description: A list of homePagePost.
 */
router.get("/", [
    HomePageHomePagePostController.getHomePagePostList
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   get:
 *     summary: Retrieve a specific homePagePost by ID.
 *     description: Endpoint to get details of a homePagePost by their ID.
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: HomePagePost details.
 */
router.get("/:homePagePostId", [
    HomePagePostValidators.homePagePostParams,
    HomePageHomePagePostController.getAHomePagePost
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   put:
 *     summary: Update a homePagePost by ID.
 *     description: Endpoint to update the details of a homePagePost by their ID.
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: homePagePost
 *         description: Updated details of the homePagePost.
 *         schema:
 *           $ref: '#/definitions/HomePagePost'
 *     responses:
 *       200:
 *         description: HomePagePost successfully updated.
 */
router.put("/:homePagePostId", [
    verifyAuthenticationTokenMiddleware,
    HomePagePostValidators.homePagePostParams,
    HomePagePostValidators.homePagePostBody,
    HomePageHomePagePostController.updateAHomePagePost
]);

/**
 * @swagger
 * /{homePagePostId}:
 *   delete:
 *     summary: Delete a homePagePost by ID.
 *     description: Endpoint to delete a homePagePost by their ID.
 *     parameters:
 *       - in: path
 *         name: homePagePostId
 *         required: true
 *         description: ID of the homePagePost to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: HomePagePost successfully deleted.
 */
router.delete("/:homePagePostId", [
    verifyAuthenticationTokenMiddleware,
    HomePagePostValidators.homePagePostParams,
    HomePageHomePagePostController.deleteAHomePagePost
]);

export default router;
