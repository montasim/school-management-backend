import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import logger from "../../../../shared/logger.js";
import { ADMISSION_FORM_CONSTANTS } from "./admissionForm.constants.js";
import fileManager from "../../../../helpers/fileManager.js";
import prisma from "../../../../shared/prisma?.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";

const createAdmissionFormService = async (req, newAdmissionFormDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newAdmissionFormDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const existingForm = await prisma?.admissionForm.findUnique({
            where: { fileName: file?.originalname }
        });

        if (existingForm) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);

        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const admissionFormDetails = {
            id: generateUniqueID(ADMISSION_FORM_CONSTANTS?.ADMISSION_FORM_ID_PREFIX),
            title,
            fileName: file?.originalname,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newAdmissionForm = await prisma?.admissionForm.create({
            data: admissionFormDetails
        });

        return generateResponseData({
            id: newAdmissionForm.id,
            title: newAdmissionForm.title,
            fileName: newAdmissionForm.fileName,
            shareableLink: newAdmissionForm.shareableLink,
            downloadLink: newAdmissionForm.downloadLink
        }, true, STATUS_OK, `${file?.originalname} uploaded successfully`);

    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    }
};

const getAdmissionFormListService = async () => {
    try {
        const admissionForms = await prisma?.admissionForm.findMany();

        return admissionForms.length
            ? generateResponseData(admissionForms, true, STATUS_OK, `${admissionForms.length} admission forms found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No admission forms found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAAdmissionFormService = async (db, fileName) => {
    try {
        const admissionForm = await prisma?.admissionForm.findUnique({
            where: { fileName }
        });

        if (admissionForm) {
            delete admissionForm.fileId;
        }

        return admissionForm
            ? generateResponseData(admissionForm, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAAdmissionFormService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const fileDetails = await prisma?.admissionForm.findUnique({
            where: { fileName }
        });

        if (fileDetails) {
            await fileManager.deleteFile(fileDetails.fileId);

            await prisma?.admissionForm.delete({
                where: { fileName }
            });

            return generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`);
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const AdmissionFormService = {
    createAdmissionFormService,
    getAdmissionFormListService,
    getAAdmissionFormService,
    deleteAAdmissionFormService
};
