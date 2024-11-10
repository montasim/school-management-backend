import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { WEBSITE_BANNER_CONSTANTS } from "./websiteBanner.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma?.js";
import fileManager from "../../../../helpers/fileManager.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";

const createWebsiteBannerService = async (req, adminId) => {
    try {
        const { db, file, protocol } = req;

        const existingDetails = await prisma?.websiteBanner.findMany();
        if (existingDetails?.length > 0) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website banner already exists. Please delete the current banner before adding a new one.");
        }

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again.');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const websiteBannerDetails = {
            id: generateUniqueID(WEBSITE_BANNER_CONSTANTS?.WEBSITE_BANNER_ID_PREFIX),
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newBanner = await prisma?.websiteBanner.create({
            data: websiteBannerDetails
        });

        return generateResponseData(newBanner, true, STATUS_OK, "Website banner created successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again.');
    }
};

const getAWebsiteBannerService = async (db) => {
    try {
        const websiteBanner = await prisma?.websiteBanner.findFirst();

        if (websiteBanner) {
            return generateResponseData(websiteBanner, true, STATUS_OK, "Website banner found successfully");
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, "Website banner not found");
        }
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateWebsiteBannerService = async (req, adminId) => {
    try {
        const { db, file, protocol } = req;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma?.websiteBanner.findFirst();
        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website banner not found. Please add a new banner.");
        }

        await fileManager.deleteFile(oldDetails.fileId);

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const updatedDetails = {
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const result = await prisma?.websiteBanner.update({
            where: { id: oldDetails.id },
            data: updatedDetails,
        });

        return generateResponseData(result, true, STATUS_OK, "Website banner updated successfully");
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAWebsiteBannerService = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma?.websiteBanner.findFirst();
        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, "Website banner not found");
        }

        await fileManager.deleteFile(oldDetails.fileId);

        await prisma?.websiteBanner.delete({
            where: { id: oldDetails.id },
        });

        return generateResponseData({}, true, STATUS_OK, "Website banner deleted successfully");
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const WebsiteBannerService = {
    createWebsiteBannerService,
    getAWebsiteBannerService,
    updateWebsiteBannerService,
    deleteAWebsiteBannerService
};
