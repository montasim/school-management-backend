import { AnnouncementService } from "./announcement.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createAnnouncementController
 * @description Controller for creating a new announcement.
 *
 * @param {express.Request} req - Express request object containing announcement details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createAnnouncementController = async (req, res) => {
    const { name, requestedBy, db } = extractFromRequest(req, ['name']);
    const newAnnouncement = { name, requestedBy };

    await handleServiceResponse(res, AnnouncementService.createAnnouncementService, db, newAnnouncement);
};

/**
 * @async
 * @function getAnnouncementListController
 * @description Controller for fetching all announcement.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAnnouncementListController = async (req, res) => {
    await handleServiceResponse(res, AnnouncementService.getAnnouncementListService, req?.db);
};

/**
 * @async
 * @function getAAnnouncementController
 * @description Controller for fetching a specific announcement by ID.
 *
 * @param {express.Request} req - Express request object containing announcement ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAAnnouncementController = async (req, res) => {
    const { announcementId, db } = extractFromRequest(req, [], ['announcementId']);

    await handleServiceResponse(res, AnnouncementService.getAAnnouncementService, db, announcementId);
};

/**
 * @async
 * @function updateAAnnouncementController
 * @description Controller for updating a specific announcement by ID.
 *
 * @param {express.Request} req - Express request object containing announcement ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAAnnouncementController = async (req, res) => {
    const { announcementId, name, requestedBy, db } = extractFromRequest(req, ['name'], ['announcementId']);
    const updatedAnnouncementDetails = { name, requestedBy };

    await handleServiceResponse(res, AnnouncementService.updateAAnnouncementService, db, announcementId, updatedAnnouncementDetails);
};

/**
 * @async
 * @function deleteAAnnouncementController
 * @description Controller for deleting a announcement by ID.
 *
 * @param {express.Request} req - Express request object containing announcement ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAAnnouncementController = async (req, res) => {
    const { announcementId, requestedBy, db } = extractFromRequest(req, [], ['announcementId']);

    await handleServiceResponse(res, AnnouncementService.deleteAAnnouncementService, db, requestedBy, announcementId);
};

/**
 * @namespace AnnouncementController
 * @description Group of controllers for handling announcement operations.
 */
export const AnnouncementController = {
    createAnnouncementController,
    getAnnouncementListController,
    getAAnnouncementController,
    updateAAnnouncementController,
    deleteAAnnouncementController
};
