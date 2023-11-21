/**
 * @fileoverview Service for Aggregating Dashboard Summary Data.
 *
 * This module provides services for aggregating and fetching summary data from various collections
 * in the database for the dashboard. It includes a primary service function, `getSummaryService`,
 * which dynamically aggregates data from specified collections. This function is designed to be flexible,
 * allowing for aggregation from a single specified collection or multiple collections, based on request parameters.
 * The module ensures that only valid collection names are used for aggregation and handles any errors during
 * the database operation.
 *
 * @requires logger - Shared logging utility for error handling.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires generateResponseData - Utility function to generate standardized response data.
 * @module DashboardService - Exported services for dashboard summary data aggregation.
 */

import {
    ANNOUNCEMENT_COLLECTION_NAME,
    ADMINISTRATION_COLLECTION_NAME,
    CATEGORY_COLLECTION_NAME,
    LEVEL_COLLECTION_NAME,
    DOWNLOAD_COLLECTION_NAME,
    NOTICE_COLLECTION_NAME,
    RESULT_COLLECTION_NAME,
    ROUTINE_COLLECTION_NAME,
    STUDENT_COLLECTION_NAME,
    ADMISSION_FORM_COLLECTION_NAME,
    ADMISSION_INFORMATION_COLLECTION_NAME,
    BLOG_COLLECTION_NAME,
    DESIGNATION_COLLECTION_NAME,
    HOME_PAGE_CAROUSEL_COLLECTION_NAME,
    HOME_PAGE_POST_COLLECTION_NAME,
    OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME,
    OTHERS_INFORMATION_COLLECTION_NAME,
    PHOTO_GALLERY_COLLECTION_NAME,
    VIDEO_GALLERY_COLLECTION_NAME,
    WEBSITE_CONFIGURATION_COLLECTION_NAME,
    WEBSITE_CONTACT_COLLECTION_NAME,
    WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME,
    WEBSITE_OFFICIAL_LINK_COLLECTION_NAME,
    WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME,
} from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_OK
} from "../../../../constants/constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Retrieves and aggregates summary data from specified collections in the database.
 *
 * @async
 * @function getDashboardSummaryService
 * @description Aggregates summary data from various collections in the database based on the request parameters.
 * It supports aggregation from a single specified collection or multiple collections.
 * @param {Object} db - Database connection object.
 * @param {string} adminId - Admin ID for validating the request.
 * @param {string} [collectionQuery] - Optional query parameter to specify a particular collection for aggregation.
 * @returns {Promise<Object>} A promise that resolves to the aggregated summary data or an error message.
 * @throws {Error} If an error occurs during database operation or if invalid parameters are provided.
 */
const getDashboardSummaryService = async (db, adminId, collectionQuery) => {
    try {
        if (!(await isValidRequest(db, adminId))) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        // Define an array of all possible collection names
        const allCollections = {
            'administration': ADMINISTRATION_COLLECTION_NAME,
            'admissionForm': ADMISSION_FORM_COLLECTION_NAME,
            'admissionInfo': ADMISSION_INFORMATION_COLLECTION_NAME,
            'announcement': ANNOUNCEMENT_COLLECTION_NAME,
            'blog': BLOG_COLLECTION_NAME,
            'category': CATEGORY_COLLECTION_NAME,
            'designation': DESIGNATION_COLLECTION_NAME,
            'download': DOWNLOAD_COLLECTION_NAME,
            'homePageCarousel': HOME_PAGE_CAROUSEL_COLLECTION_NAME,
            'homePagePost': HOME_PAGE_POST_COLLECTION_NAME,
            'level': LEVEL_COLLECTION_NAME,
            'notice': NOTICE_COLLECTION_NAME,
            'othersInfoCategory': OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME,
            'othersInfo': OTHERS_INFORMATION_COLLECTION_NAME,
            'photoGallery': PHOTO_GALLERY_COLLECTION_NAME,
            'result': RESULT_COLLECTION_NAME,
            'routine': ROUTINE_COLLECTION_NAME,
            'student': STUDENT_COLLECTION_NAME,
            'videoGallery': VIDEO_GALLERY_COLLECTION_NAME,
            'websiteConfig': WEBSITE_CONFIGURATION_COLLECTION_NAME,
            'websiteContact': WEBSITE_CONTACT_COLLECTION_NAME,
            'websiteInfoLink': WEBSITE_IMPORTANT_INFORMATION_LINK_COLLECTION_NAME,
            'websiteOfficialLink': WEBSITE_OFFICIAL_LINK_COLLECTION_NAME,
            'websiteSocialMedia': WEBSITE_SOCIAL_MEDIA_LINK_COLLECTION_NAME,
        };

        // Check if a specific collection name was provided in the query
        if (collectionQuery && allCollections[collectionQuery]) {
            const collectionName = allCollections[collectionQuery];
            const collectionDetails = await getAllData(db, collectionName);

            const returnData = {
                [collectionQuery]: {
                    total: collectionDetails?.length,
                },
            };

            return generateResponseData(returnData, true, STATUS_OK, `Summary fetched successfully for ${collectionQuery}`);
        } else {
            // If no valid collectionQuery was provided, fetch data for all collections
            const collectionDataPromises = Object.keys(allCollections).map(async (key) => {
                const collectionName = allCollections[key];
                const collectionDetails = await getAllData(db, collectionName);

                return {
                    [key]: {
                        total: collectionDetails?.length,
                    },
                };
            });

            // Wait for all promises to resolve
            const collectionData = await Promise.all(collectionDataPromises);

            // Combine the results into a single object
            const returnData = Object.assign({}, ...collectionData);

            return generateResponseData(returnData, true, 200, "Summary fetched successfully for all collections");
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace DashboardService
 * @description Group of services related to category operations.
 */
export const DashboardSummaryService = {
    getDashboardSummaryService,
};