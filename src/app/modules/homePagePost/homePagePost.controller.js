import { HomePagePostService } from "./homePagePost.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createHomePagePost
 * @description Controller for creating a new homePageHomePagePost.
 *
 * @param {express.Request} req - Express request object containing homePageHomePagePost details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createHomePagePost = async (req, res) => {
    const { title, category, postImage, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'postImage', 'description']);
    const newHomePagePost = { title, category, postImage, description, adminId };

    await handleServiceResponse(res, HomePagePostService.createHomePagePost, db, newHomePagePost);
};

/**
 * @async
 * @function getHomePagePostList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getHomePagePostList = async (req, res) => {
    await handleServiceResponse(res, HomePagePostService.getHomePagePostList, req?.db);
};

/**
 * @async
 * @function getAHomePagePost
 * @description Controller for fetching a specific homePageHomePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageHomePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAHomePagePost = async (req, res) => {
    const { homePagePostId, db } = extractFromRequest(req, [], ['homePagePostId']);

    await handleServiceResponse(res, HomePagePostService.getAHomePagePost, db, homePagePostId);
};

/**
 * @async
 * @function updateAHomePagePost
 * @description Controller for updating a specific homePageHomePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageHomePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAHomePagePost = async (req, res) => {
    const { homePagePostId, title, category, postImage, description, adminId, db } = extractFromRequest(req, ['title', 'category', 'postImage', 'description'], ['homePagePostId']);
    const updatedHomePagePostDetails = { title, category, postImage, description, adminId };

    await handleServiceResponse(res, HomePagePostService.updateAHomePagePost, db, homePagePostId, updatedHomePagePostDetails);
};

/**
 * @async
 * @function deleteAHomePagePostController
 * @description Controller for deleting a homePageHomePagePost by ID.
 *
 * @param {express.Request} req - Express request object containing homePageHomePagePost ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAHomePagePost = async (req, res) => {
    const { homePagePostId, adminId, db } = extractFromRequest(req, [], ['homePagePostId']);

    await handleServiceResponse(res, HomePagePostService.deleteAHomePagePost, db, adminId, homePagePostId);
};

/**
 * @namespace HomePageHomePagePostController
 * @description Group of controllers for handling homePageHomePagePost operations.
 */
export const HomePageHomePagePostController = {
    createHomePagePost,
    getHomePagePostList,
    getAHomePagePost,
    updateAHomePagePost,
    deleteAHomePagePost
};
