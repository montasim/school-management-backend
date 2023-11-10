import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import { BlogPostValidators } from "./blog.validator.js";
import { HomePageBlogPostController } from "./blog.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   blogPost:
 *     summary: Create an blogPost.
 *     description: Endpoint to add a new blogPost to the system.
 *     parameters:
 *       - in: body
 *         name: blogPost
 *         description: The blogPost to create.
 *         schema:
 *           $ref: '#/definitions/BlogPost'
 *     responses:
 *       200:
 *         description: BlogPost successfully created.
 */
router.post("/", [
    authTokenMiddleware,
    BlogPostValidators.blogPostBody,
    HomePageBlogPostController.createBlogPost
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all blogPost.
 *     description: Endpoint to retrieve a list of all blogPost.
 *     responses:
 *       200:
 *         description: A list of blogPost.
 */
router.get("/", [
    HomePageBlogPostController.getBlogPostList
]);

/**
 * @swagger
 * /{blogPostId}:
 *   get:
 *     summary: Retrieve a specific blogPost by ID.
 *     description: Endpoint to get details of a blogPost by their ID.
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         description: ID of the blogPost to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BlogPost details.
 */
router.get("/:blogPostId", [
    BlogPostValidators.blogPostParams,
    HomePageBlogPostController.getABlogPost
]);

/**
 * @swagger
 * /{blogPostId}:
 *   put:
 *     summary: Update a blogPost by ID.
 *     description: Endpoint to update the details of a blogPost by their ID.
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         description: ID of the blogPost to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: blogPost
 *         description: Updated details of the blogPost.
 *         schema:
 *           $ref: '#/definitions/BlogPost'
 *     responses:
 *       200:
 *         description: BlogPost successfully updated.
 */
router.put("/:blogPostId", [
    authTokenMiddleware,
    BlogPostValidators.blogPostParams,
    BlogPostValidators.blogPostBody,
    HomePageBlogPostController.updateABlogPost
]);

/**
 * @swagger
 * /{blogPostId}:
 *   delete:
 *     summary: Delete a blogPost by ID.
 *     description: Endpoint to delete a blogPost by their ID.
 *     parameters:
 *       - in: path
 *         name: blogPostId
 *         required: true
 *         description: ID of the blogPost to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BlogPost successfully deleted.
 */
router.delete("/:blogPostId", [
    authTokenMiddleware,
    BlogPostValidators.blogPostParams,
    HomePageBlogPostController.deleteABlogPost
]);

export default router;