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

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createAdministrationService = async (req, newAdministrationDetails) => {
    try {
        const { db, file, protocol } = req;
        const { name, category, designation, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        // Process and prepare categories from the provided string or array
        const processedCategories = typeof category === 'string'
            ? category.split(',').map(cat => cat.trim())
            : Array.isArray(category) ? category : [category];

        // Map each category name to its corresponding ID for connecting
        const categoryConnections = await Promise.all(
            processedCategories.map(async (catName) => {
                const categoryRecord = await prisma.category.findUnique({
                    where: { name: catName },
                });

                if (!categoryRecord) {
                    throw new Error(`Category '${catName}' does not exist`);
                }

                // Directly use categoryRecord.id without adding a prefix
                return { id: categoryRecord.id };
            })
        );

        // Upload the file
        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload file');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);

        // Create new administration entry with associated categories
        const newAdministration = await prisma.administration.create({
            data: {
                id: generateUniqueID('administrator'),
                name,
                designation,
                fileId: uploadFileResponse.fileId,
                downloadLink: fileLink,
                shareableLink: fileLink,
                createdBy: adminId,
                createdAt: new Date(),
                category: {
                    connect: categoryConnections, // Connects each existing category to the new administration entry
                },
            }
        });

        return generateResponseData(newAdministration, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getAdministrationListService = async (categoryFilter) => {
    try {
        const administrations = await prisma.administration.findMany({
            where: categoryFilter?.length ? { category: { hasSome: categoryFilter } } : {},
            orderBy: { createdAt: 'desc' }
        });

        return administrations.length
            ? generateResponseData(administrations, true, STATUS_OK, `${administrations.length} administrations found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No administrations found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAAdministrationService = async (administrationId) => {
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
        const { db, file } = req;
        const { name, category, designation, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma.administration.findUnique({
            where: { id: administrationId }
        });

        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);
        }

        let updatedData = { modifiedBy: adminId, modifiedAt: new Date() };

        if (file) {
            await fileManager.deleteFile(oldDetails.fileId);

            const uploadFileResponse = await fileManager.uploadFile(file);
            if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
            }
            const fileLink = generateFileLink(req, uploadFileResponse);

            updatedData = {
                ...updatedData,
                fileId: uploadFileResponse.fileId,
                downloadLink: fileLink,
                shareableLink: fileLink
            };
        }

        if (name) updatedData.name = name;
        if (designation) updatedData.designation = designation;

        if (category) {
            const processedCategories = Array.isArray(category)
                ? category
                : category.split(',').map(cat => cat.trim());

            for (const cat of processedCategories) {
                const categoryExists = await prisma.category.findUnique({
                    where: { name: cat }
                });
                if (!categoryExists) {
                    return generateResponseData({}, false, STATUS_BAD_REQUEST, `Category '${cat}' does not exist`);
                }
            }
            updatedData.category = processedCategories;
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

const deleteAAdministrationService = async (adminId, administrationId) => {
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
