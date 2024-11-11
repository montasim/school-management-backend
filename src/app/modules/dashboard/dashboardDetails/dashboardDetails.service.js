import {
    ANNOUNCEMENT_COLLECTION_NAME,
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
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma?.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";

const getDashboardDetailsService = async (db, adminId, collectionQuery) => {
    try {
        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Mapping of requested collections to Prisma model names and category-like fields
        const allCollections = {
            'student': { model: prisma?.student, categoryField: null },
            'admissionForm': { model: prisma?.admissionForm, categoryField: 'category' },
            'admissionInfo': { model: prisma?.admissionInformation, categoryField: 'category' },
            'announcement': { model: prisma?.announcement, categoryField: 'category' },
            'blog': { model: prisma?.blog, categoryField: 'category' },
            'category': { model: prisma?.category, categoryField: 'name' }, // Example alternative field
            'designation': { model: prisma?.designation, categoryField: null },
            'download': { model: prisma?.download, categoryField: 'category' },
            'homePageCarousel': { model: prisma?.homePageCarousel, categoryField: null },
            'homePagePost': { model: prisma?.homePagePost, categoryField: 'category' },
            'level': { model: prisma?.level, categoryField: null },
            // Add mappings for other collections as needed
        };

        let collectionsToAggregate = [];

        // Determine which collections to query
        if (collectionQuery && allCollections[collectionQuery]) {
            collectionsToAggregate.push(collectionQuery);
        } else {
            collectionsToAggregate = Object.keys(allCollections);
        }

        const returnData = {};

        for (const collection of collectionsToAggregate) {
            const { model, categoryField } = allCollections[collection];

            // Skip models without a category field
            if (!categoryField) {
                const count = await model.count();
                returnData[collection] = {
                    total: count,
                    details: []  // No category breakdown available
                };
                continue;
            }

            // Perform groupBy on models that have a category field
            const categories = await model.groupBy({
                by: [categoryField],
                _count: {
                    [categoryField]: true
                }
            });

            const total = categories.reduce((sum, item) => sum + item._count[categoryField], 0);

            returnData[collection] = {
                total,
                details: categories.map(item => ({
                    category: item[categoryField],
                    count: item._count[categoryField]
                }))
            };
        }

        return generateResponseData(returnData, true, STATUS_OK, "Details fetched successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_FORBIDDEN, "An error occurred while fetching details.");
    }
};

export const DashboardDetailsService = {
    getDashboardDetailsService,
};