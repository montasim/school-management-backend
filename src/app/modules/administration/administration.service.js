import {
    FORBIDDEN_MESSAGE,
    STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";
import fileManager from "../../../helpers/fileManager.js";
import {ADMINISTRATION_CONSTANTS} from "./administration.constants.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createAdministrationService = async (req, newAdministrationDetails) => {
    try {
        const { file, protocol } = req;  // Assuming these are used for file uploads and other protocols
        const { name, category, designation, adminId } = newAdministrationDetails;

        // Validate the admin ID
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        // Ensure categoryNames is always an array
        const categoryNames = category.includes(',')
            ? category.split(',').map(cat => cat.trim())
            : [category.trim()]; // Wrap single category in an array

        // Validate each category by checking its existence in the database
        const categoriesExist = await Promise.all(categoryNames.map(async categoryName => {
            return await prisma.category.findUnique({
                where: { name: categoryName },
                select: { name: true }  // Only selecting the name to validate existence
            });
        }));

        // Check if any of the categories were not found
        const missingCategories = categoriesExist.some(cat => cat === null);
        if (missingCategories) {
            return generateResponseData({}, false, STATUS_BAD_REQUEST, "One or more categories do not exist");
        }

        // Upload the file if included
        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload file');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);

        // Create new administration entry with validated categories
        const newAdministration = await prisma.administration.create({
            data: {
                id: generateUniqueID(ADMINISTRATION_CONSTANTS.ADMINISTRATION_ID_PREFIX),
                name,
                designation,
                category,
                fileId: uploadFileResponse.fileId,
                downloadLink: fileLink,
                shareableLink: fileLink,
                createdBy: adminId,
                createdAt: new Date(),
            }
        });

        return generateResponseData(newAdministration, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getAdministrationListService = async (db, categoryFilter) => {
    try {
        let whereCondition = {};
        if (categoryFilter?.length > 0) {
            whereCondition.category = { in: categoryFilter };
        }

        const administrations = await prisma.administration.findMany({
            where: whereCondition
        });

        return administrations.length
            ? generateResponseData(administrations, true, STATUS_OK, `${administrations.length} administrations found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No administrations found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAAdministrationService = async (db, administrationId) => {
    try {
        const administration = await prisma.administration.findUnique({
            where: { id: administrationId }
        });

        if (!administration) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);
        }

        return generateResponseData(administration, true, STATUS_OK, `${administrationId} found successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAAdministrationService = async (req, administrationId, newAdministrationDetails) => {
    try {
        const { file, protocol } = req;
        const { name, category, designation, adminId } = newAdministrationDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma.administration.findUnique({
            where: { id: administrationId }
        });

        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);
        }

        // Validate and process categories
        let processedCategories = category;
        if (category) {
            processedCategories = category.includes(',')
                ? category.split(',').map(cat => cat.trim()).join(', ') // Normalize multiple categories
                : category.trim();
        }

        let updatedData = { name, designation, category: processedCategories, modifiedBy: adminId, modifiedAt: new Date() };

        if (file) {
            await fileManager.deleteFile(oldDetails.fileId);
            const uploadFileResponse = await fileManager.uploadFile(file);
            if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
            }

            const fileLink = generateFileLink(req, uploadFileResponse);
            updatedData.fileId = uploadFileResponse.fileId;
            updatedData.downloadLink = fileLink;
            updatedData.shareableLink = fileLink;
        }

        const updatedAdministration = await prisma.administration.update({
            where: { id: administrationId },
            data: updatedData
        });

        return generateResponseData(updatedAdministration, true, STATUS_OK, `${administrationId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAAdministrationService = async (db, adminId, administrationId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma.administration.findUnique({
            where: { id: administrationId }
        });

        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);
        }

        await fileManager.deleteFile(oldDetails.fileId);

        await prisma.administration.delete({
            where: { id: administrationId }
        });

        return generateResponseData({}, true, STATUS_OK, `${administrationId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const AdministrationService = {
    createAdministrationService,
    getAdministrationListService,
    getAAdministrationService,
    updateAAdministrationService,
    deleteAAdministrationService
};
