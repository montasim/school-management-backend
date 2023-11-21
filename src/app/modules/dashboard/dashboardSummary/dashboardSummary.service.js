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

/**
 * Retrieves and aggregates summary data from specified collections in the database.
 *
 * @async
 * @function getDashboardSummaryService
 * @description Aggregates summary data from various collections in the database based on the request parameters.
 * It supports aggregation from a single specified collection or multiple collections.
 * @param {Object} db - Database connection object.
 * @param {string} adminId - Admin ID for validating the request.
 * @returns {Promise<Object>} A promise that resolves to the aggregated summary data or an error message.
 * @throws {Error} If an error occurs during database operation or if invalid parameters are provided.
 */
const getDashboardSummaryService = async (db, adminId) => {
    try {
        if (!(await isValidRequest(db, adminId))) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const collectionNames = [
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
        ];

        const getCounts = async (collectionName) => {
            const pipeline = [
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        count: 1,
                    },
                },
            ];

            const result = await db.collection(collectionName).aggregate(pipeline).toArray();

            return result.length > 0 ? result[0].count : 0;
        };

        const administrationCategoryCounts = await db
            .collection(ADMINISTRATION_COLLECTION_NAME)
            .aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        category: "$_id",
                        count: 1,
                        _id: 0,
                    },
                },
            ])
            .toArray();

        const studentLevelCounts = await db
            .collection(STUDENT_COLLECTION_NAME)
            .aggregate([
                {
                    $group: {
                        _id: "$level",
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        level: "$_id",
                        count: 1,
                        _id: 0,
                    },
                },
            ])
            .toArray();

        const returnData = {};
        for (const collectionName of collectionNames) {
            returnData[collectionName] = {
                total: await getCounts(collectionName),
            };
        }

        // Separate administration counts by category
        returnData[ADMINISTRATION_COLLECTION_NAME] = {
            total: administrationCategoryCounts.reduce((acc, item) => acc + item.count, 0),
            details: administrationCategoryCounts,
        };

        // Separate student counts by level
        returnData[STUDENT_COLLECTION_NAME] = {
            total: studentLevelCounts.reduce((acc, item) => acc + item.count, 0),
            details: studentLevelCounts,
        };

        return generateResponseData(returnData, true, STATUS_OK, "Summary fetched successfully");
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