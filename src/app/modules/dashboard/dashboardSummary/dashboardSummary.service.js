import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_OK
} from "../../../../constants/constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";

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
                counts[filterBy] = await prisma?.student.count();
            } else {
                // Count for a specific category in the administration model
                counts[filterBy] = await prisma?.administration.count({
                    where: {
                        category: filterBy
                    }
                });
            }
        } else {
            // If no filterBy is provided, return counts for all categories and students
            const allCategories = await prisma?.administration.findMany({
                select: {
                    category: true
                },
                distinct: ['category']
            });

            for (const { category } of allCategories) {
                counts[category] = await prisma?.administration.count({
                    where: { category }
                });
            }

            counts['student'] = await prisma?.student.count();
        }

        return generateResponseData(counts, true, STATUS_OK, 'Dashboard summary retrieved successfully');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export const DashboardSummaryService = {
    getDashboardSummaryService,
};
