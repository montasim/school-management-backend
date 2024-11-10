import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";
import { DOWNLOAD_CONSTANTS } from "./download.constants.js";
import fileManager from "../../../helpers/fileManager.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createDownloadService = async (req, newDownloadDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newDownloadDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDownload = await prisma.download.findUnique({
            where: { fileName: file?.originalname }
        });

        if (existingDownload) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const downloadDetails = {
            id: generateUniqueID(DOWNLOAD_CONSTANTS?.DOWNLOAD_ID_PREFIX),
            title,
            fileName: file?.originalname,
            fileId: uploadFileResponse.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newDownload = await prisma.download.create({
            data: downloadDetails
        });

        return generateResponseData({
            id: newDownload.id,
            title: newDownload.title,
            fileName: newDownload.fileName,
            shareableLink: newDownload.shareableLink,
            downloadLink: newDownload.downloadLink
        }, true, STATUS_OK, `${file?.originalname} uploaded successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    }
};

const getDownloadListService = async (db) => {
    try {
        const downloads = await prisma.download.findMany();

        return downloads.length
            ? generateResponseData(downloads, true, STATUS_OK, `${downloads.length} downloads found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No downloads found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getADownloadService = async (db, fileName) => {
    try {
        const download = await prisma.download.findUnique({
            where: { fileName }
        });

        if (download) {
            delete download.fileId;
        }

        return download
            ? generateResponseData(download, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteADownloadService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDownload = await prisma.download.findUnique({
            where: { fileName }
        });

        if (!existingDownload) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }

        await fileManager.deleteFile(existingDownload.fileId);

        await prisma.download.delete({
            where: { fileName }
        });

        return generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const DownloadService = {
    createDownloadService,
    getDownloadListService,
    getADownloadService,
    deleteADownloadService
};
