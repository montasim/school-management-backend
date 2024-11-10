import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteOfficialLink.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createWebsiteOfficialLinkService = async (db, newWebsiteOfficialLinkDetails) => {
    try {
        const { officialLinkTitle, officialLink, adminId } = newWebsiteOfficialLinkDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const websiteOfficialLinkDetails = {
            id: generateUniqueID(ID_CONSTANTS?.WEBSITE_PREFIX),
            officialLinkTitle,
            officialLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newLink = await prisma.websiteOfficialLink.create({
            data: websiteOfficialLinkDetails,
        });

        return generateResponseData(newLink, true, STATUS_OK, `${newLink.officialLinkTitle} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getWebsiteOfficialLinkListService = async (db) => {
    try {
        const websiteOfficialLinks = await prisma.websiteOfficialLink.findMany();

        return websiteOfficialLinks.length
            ? generateResponseData(websiteOfficialLinks, true, STATUS_OK, `${websiteOfficialLinks.length} websiteOfficialLink found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No websiteOfficialLink found');
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const getAWebsiteOfficialLinkService = async (db, websiteOfficialLinkId) => {
    try {
        const websiteOfficialLink = await prisma.websiteOfficialLink.findUnique({
            where: { id: websiteOfficialLinkId },
        });

        return websiteOfficialLink
            ? generateResponseData(websiteOfficialLink, true, STATUS_OK, `${websiteOfficialLinkId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteOfficialLinkId} not found`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const updateAWebsiteOfficialLinkService = async (db, websiteOfficialLinkId, updateWebsiteOfficialLinkDetails) => {
    try {
        const { officialLinkTitle, officialLink, adminId } = updateWebsiteOfficialLinkDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const updatedWebsiteOfficialLink = {
            ...(officialLinkTitle && { officialLinkTitle }),
            ...(officialLink && { officialLink }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const updatedLink = await prisma.websiteOfficialLink.update({
            where: { id: websiteOfficialLinkId },
            data: updatedWebsiteOfficialLink,
        });

        return generateResponseData(updatedLink, true, STATUS_OK, `${websiteOfficialLinkId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to update data. Please try again');
    }
};

const deleteAWebsiteOfficialLinkService = async (db, adminId, websiteOfficialLinkId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        await prisma.websiteOfficialLink.delete({
            where: { id: websiteOfficialLinkId },
        });

        return generateResponseData({}, true, STATUS_OK, `${websiteOfficialLinkId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to delete data. Please try again');
    }
};

export const WebsiteOfficialLinkService = {
    createWebsiteOfficialLinkService,
    getWebsiteOfficialLinkListService,
    getAWebsiteOfficialLinkService,
    updateAWebsiteOfficialLinkService,
    deleteAWebsiteOfficialLinkService
};
