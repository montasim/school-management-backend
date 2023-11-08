import { WebsiteContactService } from "./websiteContact.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createWebsiteContact
 * @description Controller for creating website contact.
 *
 * @param {express.Request} req - Express request object containing website contact details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createWebsiteContact = async (req, res) => {
    const { address, googleMapLocation, mobile, phone, email, website, adminId, db } = extractFromRequest(req, ['address', 'googleMapLocation', 'mobile', 'phone', 'email', 'website']);
    const websiteContactDetails = { address, googleMapLocation, mobile, phone, email, website, adminId };

    await handleServiceResponse(res, WebsiteContactService.createWebsiteContact, db, websiteContactDetails);
};

/**
 * @async
 * @function getWebsiteContact
 * @description Controller for fetching website contact.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getWebsiteContact = async (req, res) => {
    await handleServiceResponse(res, WebsiteContactService.getWebsiteContact, req?.db);
};

/**
 * @async
 * @function updateWebsiteContact
 * @description Controller for updating website contact.
 *
 * @param {express.Request} req - Express request object containing website contact details in the body.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateWebsiteContact = async (req, res) => {
    const { address, googleMapLocation, mobile, phone, email, website, adminId, db } = extractFromRequest(req, ['address', 'googleMapLocation', 'mobile', 'phone', 'email', 'website'], []);
    const websiteContactDetails = { address, googleMapLocation, mobile, phone, email, website, adminId };

    await handleServiceResponse(res, WebsiteContactService.updateWebsiteContact, db, websiteContactDetails);
};

/**
 * @async
 * @function deleteWebsiteContact
 * @description Controller for deleting website contact.
 *
 * @param {express.Request} req - Express request.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteWebsiteContact = async (req, res) => {
    const { websiteId, adminId, db } = extractFromRequest(req, [], ['websiteId']);

    await handleServiceResponse(res, WebsiteContactService.deleteWebsiteContact, db, adminId, websiteId);
};

/**
 * @namespace WebsiteContactController
 * @description Group of controllers for handling website operations.
 */
export const WebsiteContactController = {
    createWebsiteContact,
    getWebsiteContact,
    updateWebsiteContact,
    deleteWebsiteContact
};
