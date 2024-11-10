import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { RESULT_CONSTANTS } from "./result.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";
import fileManager from "../../../helpers/fileManager.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createResultService = async (req, newResultDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newResultDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingFile = await prisma?.result.findUnique({
            where: { fileName: file?.originalname }
        });

        if (existingFile) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const resultDetails = {
            id: generateUniqueID(RESULT_CONSTANTS?.RESULT_ID_PREFIX),
            title,
            fileName: file?.originalname,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            resultLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newResult = await prisma?.result.create({
            data: resultDetails
        });

        return generateResponseData(newResult, true, STATUS_OK, `${file?.originalname} uploaded successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    }
};

const getResultListService = async (db) => {
    try {
        const results = await prisma?.result.findMany();

        return results.length
            ? generateResponseData(results, true, STATUS_OK, `${results.length} results found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No results found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAResultService = async (db, fileName) => {
    try {
        const result = await prisma?.result.findUnique({
            where: { fileName }
        });

        return result
            ? generateResponseData(result, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAResultService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const resultDetails = await prisma?.result.findUnique({
            where: { fileName }
        });

        if (!resultDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }

        await fileManager.deleteFile(resultDetails.fileId);

        await prisma?.result.delete({
            where: { fileName }
        });

        return generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const ResultService = {
    createResultService,
    getResultListService,
    getAResultService,
    deleteAResultService
};
