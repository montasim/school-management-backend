import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { DESIGNATION_CONSTANTS } from "./designation.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import logger from "../../../shared/logger.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import prisma from "../../../shared/prisma?.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createDesignationService = async (db, newDesignationDetails) => {
    try {
        const { name, adminId } = newDesignationDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDesignation = await prisma?.designation.findUnique({
            where: { name }
        });

        if (existingDesignation) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${name} already exists`);
        }

        const designationDetails = {
            id: generateUniqueID(DESIGNATION_CONSTANTS?.DESIGNATION_ID_PREFIX),
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newDesignation = await prisma?.designation.create({
            data: designationDetails
        });

        return generateResponseData(newDesignation, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getDesignationListService = async (db) => {
    try {
        const designations = await prisma?.designation.findMany();

        return designations.length
            ? generateResponseData(designations, true, STATUS_OK, `${designations.length} designations found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No designations found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getADesignationService = async (db, designationId) => {
    try {
        const designation = await prisma?.designation.findUnique({
            where: { id: designationId }
        });

        if (designation) {
            delete designation.createdBy;
            delete designation.modifiedBy;
        }

        return designation
            ? generateResponseData(designation, true, STATUS_OK, `${designationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${designationId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateADesignationService = async (db, designationId, newDesignationDetails) => {
    try {
        const { name, adminId } = newDesignationDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDesignation = await prisma?.designation.findUnique({
            where: { id: designationId }
        });

        if (!existingDesignation) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${designationId} not found`);
        }

        const updatedDesignation = await prisma?.designation.update({
            where: { id: designationId },
            data: {
                ...(name && { name }),
                modifiedBy: adminId,
                modifiedAt: new Date()
            }
        });

        return updatedDesignation
            ? generateResponseData(updatedDesignation, true, STATUS_OK, `${designationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${designationId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteADesignationService = async (db, adminId, designationId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDesignation = await prisma?.designation.findUnique({
            where: { id: designationId }
        });

        if (!existingDesignation) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${designationId} not found`);
        }

        await prisma?.designation.delete({
            where: { id: designationId }
        });

        return generateResponseData({}, true, STATUS_OK, `${designationId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const DesignationService = {
    createDesignationService,
    getDesignationListService,
    getADesignationService,
    updateADesignationService,
    deleteADesignationService
};
