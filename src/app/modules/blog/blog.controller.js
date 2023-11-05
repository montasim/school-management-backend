import { BlogPostService } from "./blog.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createBlogPost
 * @description Controller for creating a new homePageBlogPost.
 *
 * @param {express.Request} req - Express request object containing homePageBlogPost details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createBlogPost = async (req, res) => {
    const { title, category, postImage, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'postImage', 'description']);
    const newBlogPost = { title, category, postImage, description, adminId };

    await handleServiceResponse(res, BlogPostService.createBlogPost, db, newBlogPost);
};

/**
 * @async
 * @function getBlogPostList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getBlogPostList = async (req, res) => {
    await handleServiceResponse(res, BlogPostService.getBlogPostList, req?.db);
};

/**
 * @async
 * @function getABlogPost
 * @description Controller for fetching a specific homePageBlogPost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageBlogPost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getABlogPost = async (req, res) => {
    const { blogPostId, db } = extractFromRequest(req, [], ['blogPostId']);

    await handleServiceResponse(res, BlogPostService.getABlogPost, db, blogPostId);
};

/**
 * @async
 * @function updateABlogPost
 * @description Controller for updating a specific homePageBlogPost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageBlogPost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateABlogPost = async (req, res) => {
    const { blogPostId, title, category, postImage, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'postImage', 'description'], ['blogPostId']);
    const updatedBlogPostDetails = { title, category, postImage, description, adminId };

    await handleServiceResponse(res, BlogPostService.updateABlogPost, db, blogPostId, updatedBlogPostDetails);
};

/**
 * @async
 * @function deleteABlogPostController
 * @description Controller for deleting a homePageBlogPost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageBlogPost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteABlogPost = async (req, res) => {
    const { blogPostId, adminId, db } = extractFromRequest(req, [], ['blogPostId']);

    await handleServiceResponse(res, BlogPostService.deleteABlogPost, db, adminId, blogPostId);
};

/**
 * @namespace HomePageBlogPostController
 * @description Group of controllers for handling homePageBlogPost operations.
 */
export const HomePageBlogPostController = {
    createBlogPost,
    getBlogPostList,
    getABlogPost,
    updateABlogPost,
    deleteABlogPost
};
