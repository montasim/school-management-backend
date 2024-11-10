import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ADMISSION_INFORMATION_CONSTANTS } from "./admissionInformation.constants.js";
import prisma from "../../../../shared/prisma?.js";
import logger from "../../../../shared/logger.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createAdmissionInformationService = async (db, newAdmissionInformationDetails) => {
    try {
        const { title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId } = newAdmissionInformationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const admissionInformationDetails = {
            id: generateUniqueID(ADMISSION_INFORMATION_CONSTANTS?.ADMISSION_INFORMATION_ID_PREFIX),
            title,
            description,
            formPrice,
            admissionFee,
            lastFormSubmissionData: new Date(lastFormSubmissionData),
            contact,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newAdmissionInformation = await prisma?.admissionInformation.create({
            data: admissionInformationDetails
        });

        return generateResponseData(newAdmissionInformation, true, STATUS_OK, "Admission information created successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getAdmissionInformationListService = async () => {
    try {
        const admissionInformationList = await prisma?.admissionInformation.findMany();

        return admissionInformationList.length
            ? generateResponseData(admissionInformationList, true, STATUS_OK, `${admissionInformationList.length} admission information found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No admission information found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAAdmissionInformationService = async (db, admissionInformationId) => {
    try {
        const admissionInformation = await prisma?.admissionInformation.findUnique({
            where: { id: admissionInformationId }
        });

        if (admissionInformation) {
            delete admissionInformation.createdBy;
            delete admissionInformation.modifiedBy;
        }

        return admissionInformation
            ? generateResponseData(admissionInformation, true, STATUS_OK, `${admissionInformationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAAdmissionInformationService = async (db, admissionInformationId, newAdmissionInformationDetails) => {
    try {
        const { title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId } = newAdmissionInformationDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingInformation = await prisma?.admissionInformation.findUnique({
            where: { id: admissionInformationId }
        });

        if (!existingInformation) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);
        }

        const updatedAdmissionInformation = await prisma?.admissionInformation.update({
            where: { id: admissionInformationId },
            data: {
                title,
                description,
                formPrice,
                admissionFee,
                lastFormSubmissionData: new Date(lastFormSubmissionData),
                contact,
                modifiedBy: adminId,
                modifiedAt: new Date()
            }
        });

        return updatedAdmissionInformation
            ? generateResponseData(updatedAdmissionInformation, true, STATUS_OK, `${admissionInformationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${admissionInformationId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAAdmissionInformationService = async (db, adminId, admissionInformationId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingInformation = await prisma?.admissionInformation.findUnique({
            where: { id: admissionInformationId }
        });

        if (!existingInformation) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);
        }

        await prisma?.admissionInformation.delete({
            where: { id: admissionInformationId }
        });

        return generateResponseData({}, true, STATUS_OK, `${admissionInformationId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const AdmissionInformationService = {
    createAdmissionInformationService,
    getAdmissionInformationListService,
    getAAdmissionInformationService,
    updateAAdmissionInformationService,
    deleteAAdmissionInformationService
};
