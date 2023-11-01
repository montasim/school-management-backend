// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Configurations
import { HOME_PAGE_DETAILS_COLLECTION_NAME } from "../../../config/config.js";

// Constants
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePagePost.constants.js";

// Shared utilities
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidById from "../../../shared/isValidById.js";
import logger from "../../../shared/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Creates a new homePageHomePagePost-entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newHomePagePostDetails - New homePageHomePagePost details.
 * @returns {Object} - The response after attempting homePageHomePagePost creation.
 * @throws {Error} Throws an error if any.
 */
const createHomePagePost = async (db, newHomePagePostDetails) => {
    try {
        const { title, category, imageLink, description, adminId } = newHomePagePostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const homePagePostDetails = {
            id: `${ID_CONSTANTS?.HOME_PAGE_POST_PREFIX}-${uuidv4().substr(0, 6)}`,
            title,
            category,
            imageLink,
            description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostDetails);
        const latestData = await findById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${homePagePostDetails?.name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all homePageHomePagePost from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageHomePagePost or an error message.
 * @throws {Error} Throws an error if any.
 */
const getHomePagePostList = async (db) => {
    try {
        const homePagePost = await getAllData(db, HOME_PAGE_DETAILS_COLLECTION_NAME);

        return homePagePost?.length
            ? generateResponseData(homePagePost, true, STATUS_OK, `${homePagePost?.length} homePagePost found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageHomePagePost found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to retrieve.
 * @returns {Object} - The homePageHomePagePost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAHomePagePost = async (db, homePagePostId) => {
    try {
        const homePagePost = await findById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostId);

        return homePagePost
            ? generateResponseData(homePagePost, true, STATUS_OK, `${homePagePostId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to retrieve.
 * @param newHomePagePostDetails
 * @returns {Object} - The homePageHomePagePost details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAHomePagePost = async (db, homePagePostId, newHomePagePostDetails) => {
    try {
        const { title, category, imageLink, description, adminId } = newHomePagePostDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const updatedHomePagePostDetails = {
            ...(title && { title }),
            ...(category && { category }),
            ...(imageLink && { imageLink }),
            ...(description && { description }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostId, updatedHomePagePostDetails);
        const latestData = await findById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${homePagePostId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePagePostId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific homePageHomePagePost by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} homePagePostId - The ID of the homePageHomePagePost to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAHomePagePost = async (db, adminId, homePagePostId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostId))
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);

        const result = await deleteById(db, HOME_PAGE_DETAILS_COLLECTION_NAME, homePagePostId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${homePagePostId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${homePagePostId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace HomePageHomePagePostService
 * @description Group of services related to homePageHomePagePost operations.
 */
export const HomePagePostService = {
    createHomePagePost,
    getHomePagePostList,
    getAHomePagePost,
    updateAHomePagePost,
    deleteAHomePagePost
};
