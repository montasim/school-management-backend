// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configurations
import { HOME_PAGE_CAROUSEL_COLLECTION_NAME } from "../../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePageCarousel.constants.js";

// Shared utilities
import isValidRequest from "../../../../shared/isValidRequest.js";
import setMimeTypeFromExtension from "../../../../helpers/setMimeTypeFromExtension.js";
import { HandleGoogleDrive } from "../../../../helpers/handleGoogleDriveApi.js"
import logger from "../../../../shared/logger.js";
import deleteById from "../../../../shared/deleteById.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findById from "../../../../shared/findById.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../../shared/updateById.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new homePageCarousel entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newHomePageCarouselDetails - New homePageCarousel's details.
 * @returns {Object} - The response after attempting homePageCarousel creation.
 * @throws {Error} Throws an error if any.
 */
const createHomePageCarouselService = async (db, newHomePageCarouselDetails) => {
    try {
        const { carouselImageDescription, carouselImage, adminId } = newHomePageCarouselDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const carouselImageMimeType = setMimeTypeFromExtension(carouselImage?.fileName);
        const uploadCarouselImageResponse = await HandleGoogleDrive.uploadFile(carouselImage?.fileName, carouselImage?.fileBuffer, carouselImageMimeType);

        if (!uploadCarouselImageResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
            
        const homePageCarouselDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_CAROUSEL_PREFIX}-${uuidv4().substr(0, 6)}`,
            carouselImageDescription,
            googleDriveImageId: uploadCarouselImageResponse?.fileId,
            carouselImage: uploadCarouselImageResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselDetails);
        const latestData = await findById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveImageId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Carousel added successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};


/**
 * Retrieves a list of all homePageCarousel from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageCarousel or an error message.
 * @throws {Error} Throws an error if any.
 */
const getHomePageCarouselListService = async (db) => {
    try {
        const homePageCarousel = await getAllData(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME);

        return homePageCarousel?.length
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarousel?.length} homePageCarousel found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageCarousel found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageCarousel by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePageCarouselId - The ID of the homePageCarousel to retrieve.
 * @returns {Object} - The homePageCarousel details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAHomePageCarouselService = async (db, homePageCarouselId) => {
    try {
        const homePageCarousel = await findById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        delete homePageCarousel?.createdBy;
        delete homePageCarousel?.modifiedBy;
        delete homePageCarousel?.googleDriveImageId;

        return homePageCarousel
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarouselId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageCarousel by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePageCarouselId - The ID of the homePageCarousel to retrieve.
 * @param newHomePageCarouselDetails
 * @returns {Object} - The homePageCarousel details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAHomePageCarouselService = async (db, homePageCarouselId, newHomePageCarouselDetails) => {
    try {
        const { carouselImageDescription, carouselImage, adminId } = newHomePageCarouselDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);

        await HandleGoogleDrive.deleteFile(oldDetails?.googleDriveImageId);

        const carouselImageMimeType = setMimeTypeFromExtension(carouselImage?.fileName);
        const uploadCarouselImageResponse = await HandleGoogleDrive.uploadFile(carouselImage?.fileName, carouselImage?.fileBuffer, carouselImageMimeType);

        if (!uploadCarouselImageResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
           
        const updatedHomePageCarouselDetails = {
            ...(carouselImageDescription && { carouselImageDescription }),
            googleDriveImageId: uploadCarouselImageResponse?.fileId,
            carouselImage: uploadCarouselImageResponse?.shareableLink,
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId, updatedHomePageCarouselDetails);
        const latestData = await findById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${homePageCarouselId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePageCarouselId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageCarousel by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} homePageCarouselId - The ID of the homePageCarousel to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAHomePageCarouselService = async (db, adminId, homePageCarouselId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);

        await HandleGoogleDrive.deleteFile(oldDetails?.googleDriveImageId);
        
        const result = await deleteById(db, HOME_PAGE_CAROUSEL_COLLECTION_NAME, homePageCarouselId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${homePageCarouselId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePageCarouselId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageCarouselService
 * @description Group of services related to homePageCarousel operations.
 */
export const HomePageCarouselService = {
    createHomePageCarouselService,
    getHomePageCarouselListService,
    getAHomePageCarouselService,
    updateAHomePageCarouselService,
    deleteAHomePageCarouselService
};
