import {
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
import logger from "../../middlewares/logger.js";
import generateResponse from "../../../helpers/generateResponse.js";
import getAllData from "../../../shared/getAllData.js";

/**
 * Retrieves summary from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param requestedBy
 * @returns {Object} - The summary or an error message.
 * @throws {Error} Throws an error if any.
 */
const getSummaryService = async (db, requestedBy) => {
    try {
        if (!await isValidRequest(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        const totalAdmin = await getAllData(db, ADMIN_COLLECTION_NAME);
        const totalAdministration = await getAllData(db, ADMINISTRATION_COLLECTION_NAME);
        const totalCategory = await getAllData(db, CATEGORY_COLLECTION_NAME);
        const totalLevel = await getAllData(db, LEVEL_COLLECTION_NAME);
        const totalDownload = await getAllData(db, DOWNLOAD_COLLECTION_NAME);
        const totalNotice = await getAllData(db, NOTICE_COLLECTION_NAME);
        const totalResult = await getAllData(db, RESULT_COLLECTION_NAME);
        const totalRoutine = await getAllData(db, ROUTINE_COLLECTION_NAME);
        const totalStudent = await getAllData(db, STUDENT_COLLECTION_NAME);
        const returnData = {
            admin: {
                total: totalAdmin?.length,
            },
            administration: {
                total: totalAdministration?.length,
            },
            category: {
                total: totalCategory?.length,
            },
            level: {
                total: totalLevel?.length,
            },
            download: {
                total: totalDownload?.length,
            },
            notice: {
                total: totalNotice?.length,
            },
            result: {
                total: totalResult?.length,
            },
            routine: {
                total: totalRoutine?.length,
            },
            student: {
                total: totalStudent?.length,
            }
        }

        return generateResponse(returnData, true, 200, "Summary fetched successfully");
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
