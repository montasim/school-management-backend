import { WebsiteConfigurationService } from "./websiteConfiguration.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteConfiguration
 * @description Controller for creating a new website configuration.
 *
 * @param {express.Request} req - Express request object containing website details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsiteConfiguration = async (req, res) => {
    const { name, slogan, websiteLogo, websiteFavIcon, adminId, db } = extractFromRequest(req, ['name', 'slogan', 'websiteLogo', 'websiteFavIcon']);
    const websiteDetails = { name, slogan, websiteLogo, websiteFavIcon, adminId };

    await handleServiceResponse(res, WebsiteConfigurationService.createWebsiteConfiguration, db, websiteDetails);
};

/**
 * @async
 * @function getWebsiteConfiguration
 * @description Controller for fetching website configuration.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsiteConfiguration = async (req, res) => {
    await handleServiceResponse(res, WebsiteConfigurationService.getWebsiteConfiguration, req?.db);
};

/**
 * @async
 * @function updateWebsiteConfiguration
 * @description Controller for updating website configuration.
 *
 * @param {express.Request} req - Express request.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateWebsiteConfiguration = async (req, res) => {
    const { name, slogan, websiteLogo, websiteFavIcon, adminId, db } = extractFromRequest(req, ['name', 'slogan', 'websiteLogo', 'websiteFavIcon'], []);
    const websiteDetails = { name, slogan, websiteLogo, websiteFavIcon, adminId };

    await handleServiceResponse(res, WebsiteConfigurationService.updateWebsiteConfiguration, db, websiteDetails);
};

/**
 * @async
 * @function deleteWebsiteConfiguration
 * @description Controller for deleting a website by ID.
 *
 * @param {express.Request} req - Express request object containing website ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteWebsiteConfiguration = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteConfigurationService.deleteWebsiteConfiguration, db, adminId, websiteId);
};

/**
 * @namespace WebsiteController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteConfigurationController = {
    createWebsiteConfiguration,
    getWebsiteConfiguration,
    updateWebsiteConfiguration,
    deleteWebsiteConfiguration
};
