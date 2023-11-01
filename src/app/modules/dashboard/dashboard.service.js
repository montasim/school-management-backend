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
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js"
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Retrieves summary from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param requestedBy
 * @returns {Object} - The summary or an error message.
 * @throws {Error} Throws an error if any.
 */
const getSummaryService = async (db, requestedBy) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const adminDetails = await getAllData(db, ADMIN_COLLECTION_NAME);
        const administrationDetails = await getAllData(db, ADMINISTRATION_COLLECTION_NAME);
        const categoryDetails = await getAllData(db, CATEGORY_COLLECTION_NAME);
        const levelDetails = await getAllData(db, LEVEL_COLLECTION_NAME);
        const downloadDetails = await getAllData(db, DOWNLOAD_COLLECTION_NAME);
        const noticeDetails = await getAllData(db, NOTICE_COLLECTION_NAME);
        const resultDetails = await getAllData(db, RESULT_COLLECTION_NAME);
        const routineDetails = await getAllData(db, ROUTINE_COLLECTION_NAME);
        const studentDetails = await getAllData(db, STUDENT_COLLECTION_NAME);
        const announcementDetails = await getAllData(db, ANNOUNCEMENT_COLLECTION_NAME);
        const returnData = {
            admin: {
                total: adminDetails?.length,
            },
            administration: {
                total: administrationDetails?.length,
            },
            category: {
                total: categoryDetails?.length,
            },
            level: {
                total: levelDetails?.length,
            },
            download: {
                total: downloadDetails?.length,
            },
            notice: {
                total: noticeDetails?.length,
            },
            result: {
                total: resultDetails?.length,
            },
            routine: {
                total: routineDetails?.length,
            },
            student: {
                total: studentDetails?.length,
            },
            announcement: {
                total: announcementDetails?.length,
            }
        }

        return generateResponseData(returnData, true, 200, "Summary fetched successfully");
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
