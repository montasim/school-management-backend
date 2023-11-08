import { WebsiteOfficialLinkService } from "./websiteOfficialLink.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteOfficialLink
 * @description Controller for creating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsiteOfficialLink = async (req, res) => {
    const { officialLinks, adminId, db } = extractFromRequest(req, ['officialLinks']);
    const websiteOfficialLinkDetails = { officialLinks, adminId };

    await handleServiceResponse(res, WebsiteOfficialLinkService.createWebsiteOfficialLink, db, websiteOfficialLinkDetails);
};

/**
 * @async
 * @function getWebsiteOfficialLink
 * @description Controller for fetching website important information link.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsiteOfficialLink = async (req, res) => {
    await handleServiceResponse(res, WebsiteOfficialLinkService.getWebsiteOfficialLink, req?.db);
};

/**
 * @async
 * @function updateWebsiteOfficialLink
 * @description Controller for updating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details in the body.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateWebsiteOfficialLink = async (req, res) => {
    const { officialLinks, adminId, db } = extractFromRequest(req, ['officialLinks'], []);
    const websiteOfficialLinkDetails = { officialLinks, adminId };

    await handleServiceResponse(res, WebsiteOfficialLinkService.updateWebsiteOfficialLink, db, websiteOfficialLinkDetails);
};

/**
 * @async
 * @function deleteWebsiteOfficialLink
 * @description Controller for deleting website important information link.
 *
 * @param {express.Request} req - Express request.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteWebsiteOfficialLink = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteOfficialLinkService.deleteWebsiteOfficialLink, db, adminId, websiteId);
};

/**
 * @namespace WebsiteOfficialLinkController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteOfficialLinkController = {
    createWebsiteOfficialLink,
    getWebsiteOfficialLink,
    updateWebsiteOfficialLink,
    deleteWebsiteOfficialLink
};