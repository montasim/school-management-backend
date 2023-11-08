import { WebsiteSocialMediaService } from "./websiteSocialMedia.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteSocialMedia
 * @description Controller for creating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsiteSocialMedia = async (req, res) => {
    const { socialMediaLinks, adminId, db } = extractFromRequest(req, ['socialMediaLinks']);
    const websiteSocialMediaDetails = { socialMediaLinks, adminId };

    await handleServiceResponse(res, WebsiteSocialMediaService.createWebsiteSocialMedia, db, websiteSocialMediaDetails);
};

/**
 * @async
 * @function getWebsiteSocialMedia
 * @description Controller for fetching website important information link.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsiteSocialMedia = async (req, res) => {
    await handleServiceResponse(res, WebsiteSocialMediaService.getWebsiteSocialMedia, req?.db);
};

/**
 * @async
 * @function updateWebsiteSocialMedia
 * @description Controller for updating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details in the body.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateWebsiteSocialMedia = async (req, res) => {
    const { socialMediaLinks, adminId, db } = extractFromRequest(req, ['socialMediaLinks'], []);
    const websiteSocialMediaDetails = { socialMediaLinks, adminId };

    await handleServiceResponse(res, WebsiteSocialMediaService.updateWebsiteSocialMedia, db, websiteSocialMediaDetails);
};

/**
 * @async
 * @function deleteWebsiteSocialMedia
 * @description Controller for deleting website important information link.
 *
 * @param {express.Request} req - Express request.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteWebsiteSocialMedia = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteSocialMediaService.deleteWebsiteSocialMedia, db, adminId, websiteId);
};

/**
 * @namespace WebsiteSocialMediaController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteSocialMediaController = {
    createWebsiteSocialMedia,
    getWebsiteSocialMedia,
    updateWebsiteSocialMedia,
    deleteWebsiteSocialMedia
};