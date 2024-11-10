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
    ADMINISTRATION_COLLECTION_NAME,
    ADMISSION_FORM_COLLECTION_NAME,
    ADMISSION_INFORMATION_COLLECTION_NAME,
    ANNOUNCEMENT_COLLECTION_NAME,
    BLOG_COLLECTION_NAME,
    CATEGORY_COLLECTION_NAME,
    DESIGNATION_COLLECTION_NAME,
    DOWNLOAD_COLLECTION_NAME,
    HOME_PAGE_CAROUSEL_COLLECTION_NAME,
    HOME_PAGE_POST_COLLECTION_NAME,
    LEVEL_COLLECTION_NAME,
    NOTICE_COLLECTION_NAME,
    OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME,
    OTHERS_INFORMATION_COLLECTION_NAME,
    PHOTO_GALLERY_COLLECTION_NAME,
    RESULT_COLLECTION_NAME,
    ROUTINE_COLLECTION_NAME,
    STUDENT_COLLECTION_NAME,
    VIDEO_GALLERY_COLLECTION_NAME,
    WEBSITE_BANNER_COLLECTION_NAME,
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

/**
 * Retrieves and aggregates summary data from specified collections in the database.
 *
 * @async
 * @function getDashboardSummaryService
 * @description Aggregates summary data from various collections in the database based on the request parameters.
 * It supports aggregation from a single specified collection or multiple collections.
 * @param {Object} db - Database connection object.
 * @param {string} adminId - Admin ID for validating the request.
 * @param {string} filterBy - Optional filter to specify a particular collection for aggregation.
 * @returns {Promise<Object>} A promise that resolves to the aggregated summary data or an error message.
 * @throws {Error} If an error occurs during database operation or if invalid parameters are provided.
 */
const getDashboardSummaryService = async (db, adminId, filterBy) => {
    try {
        if (!(await isValidRequest(adminId))) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        let counts = {};

        // Handling dynamic filterBy value
        if (filterBy) {
            if (filterBy === 'student') {
                // Count students only
                counts[filterBy] = await db.collection(STUDENT_COLLECTION_NAME).find().count();
            } else {
                // Count for a specific category in the administration collection
                counts[filterBy] = await db.collection(ADMINISTRATION_COLLECTION_NAME)
                    .find({ category: filterBy })
                    .count();
            }
        } else {
            // If no filterBy is provided, return counts for all categories and students
            const allCategories = await db.collection(ADMINISTRATION_COLLECTION_NAME)
                .distinct('category');

            for (const category of allCategories) {
                counts[category] = await db.collection(ADMINISTRATION_COLLECTION_NAME)
                    .find({ category })
                    .count();
            }

            counts['student'] = await db.collection(STUDENT_COLLECTION_NAME).find().count();
        }

        return generateResponseData(counts, true, STATUS_OK, 'Dashboard summary retrieved successfully');
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