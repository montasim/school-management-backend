import { HomePageCarouselService } from "./homePageCarousel.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createHomePageCarouselController
 * @description Controller for creating a new homePageCarousel.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createHomePageCarouselController = async (req, res) => {
    const { carouselImageDescription, carouselImage, adminId, db } = extractFromRequest(req, ['carouselImageDescription', 'carouselImage']);
    const newHomePageCarousel = { carouselImageDescription, carouselImage, adminId };

    await handleServiceResponse(res, HomePageCarouselService.createHomePageCarouselService, db, newHomePageCarousel);
};

/**
 * @async
 * @function getHomePageCarouselListController
 * @description Controller for fetching all homePageCarousel.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getHomePageCarouselListController = async (req, res) => {
    await handleServiceResponse(res, HomePageCarouselService.getHomePageCarouselListService, req?.db);
};

/**
 * @async
 * @function getAHomePageCarouselController
 * @description Controller for fetching a specific homePageCarousel by ID.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAHomePageCarouselController = async (req, res) => {
    const { homePageCarouselId, db } = extractFromRequest(req, [], ['homePageCarouselId']);

    await handleServiceResponse(res, HomePageCarouselService.getAHomePageCarouselService, db, homePageCarouselId);
};

/**
 * @async
 * @function updateAHomePageCarouselController
 * @description Controller for updating a specific homePageCarousel by ID.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAHomePageCarouselController = async (req, res) => {
    const { homePageCarouselId, carouselImageDescription, carouselImage, adminId, db } = extractFromRequest(req, ['carouselImageDescription', 'carouselImage'], ['homePageCarouselId']);
    const updatedHomePageCarouselDetails = { carouselImageDescription, carouselImage, adminId };

    await handleServiceResponse(res, HomePageCarouselService.updateAHomePageCarouselService, db, homePageCarouselId, updatedHomePageCarouselDetails);
};

/**
 * @async
 * @function deleteAHomePageCarouselController
 * @description Controller for deleting a homePageCarousel by ID.
 *
 * @param {express.Request} req - Express request object containing homePageCarousel ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAHomePageCarouselController = async (req, res) => {
    const { homePageCarouselId, adminId, db } = extractFromRequest(req, [], ['homePageCarouselId']);

    await handleServiceResponse(res, HomePageCarouselService.deleteAHomePageCarouselService, db, adminId, homePageCarouselId);
};

/**
 * @namespace HomePageCarouselController
 * @description Group of controllers for handling homePageCarousel operations.
 */
export const HomePageCarouselController = {
    createHomePageCarouselController,
    getHomePageCarouselListController,
    getAHomePageCarouselController,
    updateAHomePageCarouselController,
    deleteAHomePageCarouselController
};
