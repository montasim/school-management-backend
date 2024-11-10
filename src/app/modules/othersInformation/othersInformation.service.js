import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { OTHERS_INFORMATION_CONSTANTS } from "./othersInformation.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma?.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createOthersInformationService = async (db, newOthersInformationDetails) => {
    try {
        const { title, category, description, adminId } = newOthersInformationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const othersInformationDetails = {
            id: generateUniqueID(OTHERS_INFORMATION_CONSTANTS?.OTHERS_INFORMATION_ID_PREFIX),
            title,
            category,
            description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newOthersInformation = await prisma?.othersInformation.create({
            data: othersInformationDetails
        });

        return generateResponseData(newOthersInformation, true, STATUS_OK, `${title} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getOthersInformationListService = async (db) => {
    try {
        const othersInformationList = await prisma?.othersInformation.findMany();

        return othersInformationList.length
            ? generateResponseData(othersInformationList, true, STATUS_OK, `${othersInformationList.length} entries found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No entries found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAOthersInformationService = async (db, othersInformationId) => {
    try {
        const othersInformation = await prisma?.othersInformation.findUnique({
            where: { id: othersInformationId }
        });

        return othersInformation
            ? generateResponseData(othersInformation, true, STATUS_OK, `${othersInformationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${othersInformationId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAOthersInformationService = async (db, othersInformationId, newOthersInformationDetails) => {
    try {
        const { title, category, description, adminId } = newOthersInformationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const updatedOthersInformation = await prisma?.othersInformation.update({
            where: { id: othersInformationId },
            data: {
                ...(title && { title }),
                ...(category && { category }),
                ...(description && { description }),
                modifiedBy: adminId,
                modifiedAt: new Date(),
            }
        });

        return updatedOthersInformation
            ? generateResponseData(updatedOthersInformation, true, STATUS_OK, `${othersInformationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAOthersInformationService = async (db, adminId, othersInformationId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const deletedOthersInformation = await prisma?.othersInformation.delete({
            where: { id: othersInformationId }
        });

        return deletedOthersInformation
            ? generateResponseData({}, true, STATUS_OK, `${othersInformationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${othersInformationId} could not be deleted`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const OthersInformationService = {
    createOthersInformationService,
    getOthersInformationListService,
    getAOthersInformationService,
    updateAOthersInformationService,
    deleteAOthersInformationService
};
