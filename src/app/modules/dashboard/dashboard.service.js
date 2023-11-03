// Config Imports
import {
    ANNOUNCEMENT_COLLECTION_NAME,
    ADMIN_COLLECTION_NAME,
    ADMINISTRATION_COLLECTION_NAME,
    CATEGORY_COLLECTION_NAME,
    LEVEL_COLLECTION_NAME,
    DOWNLOAD_COLLECTION_NAME,
    NOTICE_COLLECTION_NAME,
    RESULT_COLLECTION_NAME,
    ROUTINE_COLLECTION_NAME,
    STUDENT_COLLECTION_NAME,
} from "../../../config/config.js";

// Constants Imports
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_OK
} from "../../../constants/constants.js";

// Shared Utilities Imports
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Retrieves summary from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param adminId
 * @returns {Object} - The summary or an error message.
 * @throws {Error} Throws an error if any.
 */
const getSummaryService = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const getCategoryCount = async (collectionName) => {
            return await db.collection(collectionName).aggregate([
                {
                    $group: {
                        _id: { category: `$category` },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        category: '$_id.category',
                        count: 1,
                        _id: 0
                    }
                }
            ]).toArray();
        };

        const adminCategoryCount = await getCategoryCount(ADMIN_COLLECTION_NAME);
        const administrationCategoryCount = await getCategoryCount(ADMINISTRATION_COLLECTION_NAME);
        const categoryCount = await getCategoryCount(CATEGORY_COLLECTION_NAME);
        const leveCount = await getCategoryCount(LEVEL_COLLECTION_NAME);
        const downloadCount = await getCategoryCount(DOWNLOAD_COLLECTION_NAME);
        const noticeCount = await getCategoryCount(NOTICE_COLLECTION_NAME);
        const resultCount = await getCategoryCount(RESULT_COLLECTION_NAME);
        const routineCount = await getCategoryCount(ROUTINE_COLLECTION_NAME);
        const studentCount = await getCategoryCount(STUDENT_COLLECTION_NAME);
        const announcementCount = await getCategoryCount(ANNOUNCEMENT_COLLECTION_NAME);


        const returnData = {
            admin: {
                total: adminCategoryCount.reduce((acc, item) => acc + item.count, 0),
            },
            administration: {
                total: administrationCategoryCount.reduce((acc, item) => acc + item.count, 0),
                details: administrationCategoryCount
            },
            category: {
                total: categoryCount.reduce((acc, item) => acc + item.count, 0),
            },
            level: {
                total: leveCount.reduce((acc, item) => acc + item.count, 0),
            },
            download: {
                total: downloadCount.reduce((acc, item) => acc + item.count, 0),
            },
            notice: {
                total: noticeCount.reduce((acc, item) => acc + item.count, 0),
            },
            result: {
                total: resultCount.reduce((acc, item) => acc + item.count, 0),
            },
            routine: {
                total: routineCount.reduce((acc, item) => acc + item.count, 0),
            },
            student: {
                total: studentCount.reduce((acc, item) => acc + item.count, 0),
            },
            announcement: {
                total: announcementCount.reduce((acc, item) => acc + item.count, 0),
            }
        }

        return generateResponseData(returnData, true, STATUS_OK, "Summary fetched successfully");
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

/**
 * @namespace DashboardService
 * @description Group of services related to category operations.
 */
export const DashboardService = {
    getSummaryService,
};
