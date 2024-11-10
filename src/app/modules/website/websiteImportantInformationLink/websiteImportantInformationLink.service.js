import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteImportantInformationLink.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createWebsiteImportantInformationLinkService = async (db, newWebsiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinkTitle, importantInformationLink, adminId } = newWebsiteImportantInformationLinkDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const websiteImportantInformationLinkDetails = {
            id: generateUniqueID(ID_CONSTANTS?.WEBSITE_PREFIX),
            importantInformationLinkTitle,
            importantInformationLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newLink = await prisma?.websiteImportantInformationLink.create({
            data: websiteImportantInformationLinkDetails,
        });

        return generateResponseData(newLink, true, STATUS_OK, `${newLink.importantInformationLinkTitle} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getWebsiteImportantInformationLinkListService = async (db) => {
    try {
        const websiteImportantInformationLinks = await prisma?.websiteImportantInformationLink.findMany();

        return websiteImportantInformationLinks.length
            ? generateResponseData(websiteImportantInformationLinks, true, STATUS_OK, `${websiteImportantInformationLinks.length} websiteImportantInformationLink found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No websiteImportantInformationLink found');
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const getAWebsiteImportantInformationLinkService = async (db, websiteImportantInformationLinkId) => {
    try {
        const websiteImportantInformationLink = await prisma?.websiteImportantInformationLink.findUnique({
            where: { id: websiteImportantInformationLinkId },
        });

        return websiteImportantInformationLink
            ? generateResponseData(websiteImportantInformationLink, true, STATUS_OK, `${websiteImportantInformationLinkId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteImportantInformationLinkId} not found`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const updateAWebsiteImportantInformationLinkService = async (db, websiteImportantInformationLinkId, updateWebsiteImportantInformationLinkDetails) => {
    try {
        const { importantInformationLinkTitle, importantInformationLink, adminId } = updateWebsiteImportantInformationLinkDetails;

        if (!await isValidRequest(db)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const updatedWebsiteImportantInformationLink = {
            ...(importantInformationLinkTitle && { importantInformationLinkTitle }),
            ...(importantInformationLink && { importantInformationLink }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const updatedLink = await prisma?.websiteImportantInformationLink.update({
            where: { id: websiteImportantInformationLinkId },
            data: updatedWebsiteImportantInformationLink,
        });

        return generateResponseData(updatedLink, true, STATUS_OK, `${websiteImportantInformationLinkId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to update data. Please try again');
    }
};

const deleteAWebsiteImportantInformationLinkService = async (db, adminId, websiteImportantInformationLinkId) => {
    try {
        if (!await isValidRequest(db)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        await prisma?.websiteImportantInformationLink.delete({
            where: { id: websiteImportantInformationLinkId },
        });

        return generateResponseData({}, true, STATUS_OK, `${websiteImportantInformationLinkId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to delete data. Please try again');
    }
};

export const WebsiteImportantInformationLinkService = {
    createWebsiteImportantInformationLinkService,
    getWebsiteImportantInformationLinkListService,
    getAWebsiteImportantInformationLinkService,
    updateAWebsiteImportantInformationLinkService,
    deleteAWebsiteImportantInformationLinkService
};
