import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./websiteSocialMediaLink.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma?.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createWebsiteSocialMediaLinkService = async (db, newWebsiteSocialMediaLinkDetails) => {
    try {
        const { socialMediaLinkTitle, socialMediaLink, adminId } = newWebsiteSocialMediaLinkDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const websiteSocialMediaLinkDetails = {
            id: generateUniqueID(ID_CONSTANTS?.WEBSITE_PREFIX),
            socialMediaLinkTitle,
            socialMediaLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newLink = await prisma?.websiteSocialMediaLink.create({
            data: websiteSocialMediaLinkDetails,
        });

        return generateResponseData(newLink, true, STATUS_OK, `${newLink.socialMediaLinkTitle} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getWebsiteSocialMediaLinkListService = async (db) => {
    try {
        const websiteSocialMediaLinks = await prisma?.websiteSocialMediaLink.findMany();

        return websiteSocialMediaLinks.length
            ? generateResponseData(websiteSocialMediaLinks, true, STATUS_OK, `${websiteSocialMediaLinks.length} social media links found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No social media link found');
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const getAWebsiteSocialMediaLinkService = async (db, websiteSocialMediaLinkId) => {
    try {
        const websiteSocialMediaLink = await prisma?.websiteSocialMediaLink.findUnique({
            where: { id: websiteSocialMediaLinkId },
        });

        return websiteSocialMediaLink
            ? generateResponseData(websiteSocialMediaLink, true, STATUS_OK, `${websiteSocialMediaLinkId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${websiteSocialMediaLinkId} not found`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to retrieve data. Please try again');
    }
};

const updateAWebsiteSocialMediaLinkService = async (db, websiteSocialMediaLinkId, updateWebsiteSocialMediaLinkDetails) => {
    try {
        const { socialMediaLinkTitle, socialMediaLink, adminId } = updateWebsiteSocialMediaLinkDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const updatedData = {
            ...(socialMediaLinkTitle && { socialMediaLinkTitle }),
            ...(socialMediaLink && { socialMediaLink }),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const updatedLink = await prisma?.websiteSocialMediaLink.update({
            where: { id: websiteSocialMediaLinkId },
            data: updatedData,
        });

        return generateResponseData(updatedLink, true, STATUS_OK, `${websiteSocialMediaLinkId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to update data. Please try again');
    }
};

const deleteAWebsiteSocialMediaLinkService = async (db, adminId, websiteSocialMediaLinkId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        await prisma?.websiteSocialMediaLink.delete({
            where: { id: websiteSocialMediaLinkId },
        });

        return generateResponseData({}, true, STATUS_OK, `${websiteSocialMediaLinkId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to delete data. Please try again');
    }
};

export const WebsiteSocialMediaLinkService = {
    createWebsiteSocialMediaLinkService,
    getWebsiteSocialMediaLinkListService,
    getAWebsiteSocialMediaLinkService,
    updateAWebsiteSocialMediaLinkService,
    deleteAWebsiteSocialMediaLinkService
};
