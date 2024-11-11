import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { NOTICE_CONSTANTS } from "./notice.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";
import fileManager from "../../../helpers/fileManager.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateFileLink from "../../../helpers/generateFileLink.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createNoticeService = async (req, newNoticeDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newNoticeDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingFile = await prisma.notice.findUnique({
            where: { fileName: file?.originalname }
        });
        if (existingFile) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const noticeDetails = {
            id: generateUniqueID(NOTICE_CONSTANTS?.NOTICE_ID_PREFIX),
            title,
            fileName: file?.originalname,
            fileId: uploadFileResponse.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newNotice = await prisma.notice.create({
            data: noticeDetails
        });

        return generateResponseData(newNotice, true, STATUS_OK, `${file?.originalname} uploaded successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    }
};

const getNoticeListService = async (db) => {
    try {
        const notices = await prisma.notice.findMany();

        return notices.length
            ? generateResponseData(notices, true, STATUS_OK, `${notices.length} notice(s) found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No notices found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getANoticeService = async (db, fileName) => {
    try {
        const notice = await prisma.notice.findUnique({
            where: { fileName }
        });

        if (notice) {
            delete notice.fileId;
        }

        return notice
            ? generateResponseData(notice, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteANoticeService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const fileDetails = await prisma.notice.findUnique({
            where: { fileName }
        });

        if (fileDetails) {
            await fileManager.deleteFile(fileDetails.fileId);

            await prisma.notice.delete({
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

export const NoticeService = {
    createNoticeService,
    getNoticeListService,
    getANoticeService,
    deleteANoticeService
};
