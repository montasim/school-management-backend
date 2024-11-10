import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { WEBSITE_CONFIGURATION_CONSTANTS } from "./websiteConfiguration.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";
import fileManager from "../../../../helpers/fileManager.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";

const createWebsiteConfigurationService = async (req, websiteDetails) => {
    try {
        const { db, file, protocol } = req;
        const { name, slogan, adminId } = websiteDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingConfig = await prisma?.websiteConfiguration.findMany();
        if (existingConfig?.length > 0) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website configuration already exists. Please update the configuration.");
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again.');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const websiteConfig = {
            id: generateUniqueID(WEBSITE_CONFIGURATION_CONSTANTS?.WEBSITE_CONFIGURATION_ID_PREFIX),
            name,
            slogan,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newConfig = await prisma?.websiteConfiguration.create({
            data: websiteConfig,
        });

        return generateResponseData(newConfig, true, STATUS_OK, "Website configuration added successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again.');
    }
};

const getWebsiteConfigurationService = async (db) => {
    try {
        const websiteConfig = await prisma?.websiteConfiguration.findFirst();

        if (websiteConfig) {
            return generateResponseData(websiteConfig, true, STATUS_OK, "Website configuration found successfully");
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, 'Website configuration not found');
        }
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateWebsiteConfigurationService = async (req, websiteDetails) => {
    try {
        const { db, file, protocol } = req;
        const { adminId, name, slogan } = websiteDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldConfig = await prisma?.websiteConfiguration.findFirst();
        if (!oldConfig) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, 'Website configuration not found. Please add a configuration to update.');
        }

        const updatedConfig = { ...oldConfig };
        if (name) updatedConfig.name = name;
        if (slogan) updatedConfig.slogan = slogan;

        if (file) {
            await fileManager.deleteFile(oldConfig.fileId);

            const uploadFileResponse = await fileManager.uploadFile(file);
            if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
            }

            const fileLink = generateFileLink(req, uploadFileResponse);
            updatedConfig.fileId = uploadFileResponse.fileId;
            updatedConfig.shareableLink = fileLink;
            updatedConfig.downloadLink = fileLink;
        }

        updatedConfig.modifiedBy = adminId;
        updatedConfig.modifiedAt = new Date();

        const result = await prisma?.websiteConfiguration.update({
            where: { id: oldConfig.id },
            data: updatedConfig,
        });

        return generateResponseData(result, true, STATUS_OK, "Website configuration updated successfully");
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteWebsiteConfigurationService = async (db, adminId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldConfig = await prisma?.websiteConfiguration.findFirst();
        if (!oldConfig) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, "Website configuration not found");
        }

        await fileManager.deleteFile(oldConfig.fileId);
        await prisma?.websiteConfiguration.delete({
            where: { id: oldConfig.id },
        });

        return generateResponseData({}, true, STATUS_OK, "Website configuration deleted successfully");
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const WebsiteConfigurationService = {
    createWebsiteConfigurationService,
    getWebsiteConfigurationService,
    updateWebsiteConfigurationService,
    deleteWebsiteConfigurationService
};
