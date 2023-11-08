import { WebsiteImportantInformationLinkService } from "./websiteImportantInformationLink.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteImportantInformationLink
 * @description Controller for creating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsiteImportantInformationLink = async (req, res) => {
    const { importantInformationLinks, adminId, db } = extractFromRequest(req, ['importantInformationLinks']);
    const websiteImportantInformationLinkDetails = { importantInformationLinks, adminId };

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.createWebsiteImportantInformationLink, db, websiteImportantInformationLinkDetails);
};

/**
 * @async
 * @function getWebsiteImportantInformationLink
 * @description Controller for fetching website important information link.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsiteImportantInformationLink = async (req, res) => {
    await handleServiceResponse(res, WebsiteImportantInformationLinkService.getWebsiteImportantInformationLink, req?.db);
};

/**
 * @async
 * @function updateWebsiteImportantInformationLink
 * @description Controller for updating website important information link.
 *
 * @param {express.Request} req - Express request object containing website important information link details in the body.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateWebsiteImportantInformationLink = async (req, res) => {
    const { importantInformationLinks, adminId, db } = extractFromRequest(req, ['importantInformationLinks'], []);
    const websiteImportantInformationLinkDetails = { importantInformationLinks, adminId };

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.updateWebsiteImportantInformationLink, db, websiteImportantInformationLinkDetails);
};

/**
 * @async
 * @function deleteWebsiteImportantInformationLink
 * @description Controller for deleting website important information link.
 *
 * @param {express.Request} req - Express request.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteWebsiteImportantInformationLink = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.deleteWebsiteImportantInformationLink, db, adminId, websiteId);
};

/**
 * @namespace WebsiteImportantInformationLinkController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteImportantInformationLinkController = {
    createWebsiteImportantInformationLink,
    getWebsiteImportantInformationLink,
    updateWebsiteImportantInformationLink,
    deleteWebsiteImportantInformationLink
};