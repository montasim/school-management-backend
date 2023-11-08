import { WebsiteImportantInformationLinkService } from "./websiteImportantInformationLink.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteController
 * @description Controller for creating a new website.
 *
 * @param {express.Request} req - Express request object containing website details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsite = async (req, res) => {
    const { name, slogan, websiteLogo, websiteFavIcon, contact, socialMediaLinks, officialLinks, importantInformationLinks, adminId, db } = extractFromRequest(req, ['name', 'slogan', 'websiteLogo', 'websiteFavIcon', 'contact', 'socialMediaLinks', 'officialLinks', 'importantInformationLinks']);
    const websiteDetails = { name, slogan, websiteLogo, websiteFavIcon, contact, socialMediaLinks, officialLinks, importantInformationLinks, adminId };

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.createWebsite, db, websiteDetails);
};

/**
 * @async
 * @function getWebsiteListController
 * @description Controller for fetching all website.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsite = async (req, res) => {
    await handleServiceResponse(res, WebsiteImportantInformationLinkService.getWebsite, req?.db);
};

/**
 * @async
 * @function updateAWebsiteController
 * @description Controller for updating a specific website by ID.
 *
 * @param {express.Request} req - Express request object containing website ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAWebsite = async (req, res) => {
    const { name, slogan, websiteLogo, websiteFavIcon, contact, socialMediaLinks, officialLinks, importantInformationLinks, adminId, db } = extractFromRequest(req, ['name', 'slogan', 'websiteLogo', 'websiteFavIcon', 'contact', 'socialMediaLinks', 'officialLinks', 'importantInformationLinks'], []);
    const websiteDetails = { name, slogan, websiteLogo, websiteFavIcon, contact, socialMediaLinks, officialLinks, importantInformationLinks, adminId };

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.updateAWebsite, db, websiteDetails);
};

/**
 * @async
 * @function deleteAWebsiteController
 * @description Controller for deleting a website by ID.
 *
 * @param {express.Request} req - Express request object containing website ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAWebsite = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteImportantInformationLinkService.deleteAWebsite, db, adminId, websiteId);
};

/**
 * @namespace WebsiteController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteImportantInformationLinkController = {
    createWebsite,
    getWebsite,
    updateAWebsite,
    deleteAWebsite
};
