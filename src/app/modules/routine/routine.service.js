import prisma from "../../../shared/prisma.js";
import logger from "../../../shared/logger.js";
import fileManager from "../../../helpers/fileManager.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import {ROUTINE_CONSTANTS} from "./routine.constants.js";

import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";
import isValidRequest from "../../../shared/isValidRequest.js";

const createRoutineService = async (req, newRoutineDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newRoutineDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingRoutine = await prisma?.routine.findUnique({
            where: { fileName: file?.originalname }
        });
        if (existingRoutine) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the Google Drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const routineData = {
            id: generateUniqueID(ROUTINE_CONSTANTS?.ROUTINE_ID_PREFIX),
            title,
            fileName: file?.originalname,
            fileId: uploadFileResponse.fileId,
            shareableLink: fileLink,
            routineLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newRoutine = await prisma?.routine.create({ data: routineData });
        return generateResponseData(newRoutine, true, STATUS_OK, `${file?.originalname} uploaded successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    }
};

const getRoutineListService = async (db) => {
    try {
        const routines = await prisma?.routine.findMany();
        return routines.length
            ? generateResponseData(routines, true, STATUS_OK, `${routines.length} routines found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No routine found');
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error retrieving routines');
    }
};

const getARoutineService = async (db, fileName) => {
    try {
        const routine = await prisma?.routine.findUnique({
            where: { fileName }
        });

        return routine
            ? generateResponseData(routine, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error retrieving routine');
    }
};

const deleteARoutineService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const routine = await prisma?.routine.findUnique({
            where: { fileName }
        });

        if (!routine) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }

        await fileManager.deleteFile(routine.fileId);

        await prisma?.routine.delete({
            where: { fileName }
        });

        return generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error deleting routine');
    }
};

export const RoutineService = {
    createRoutineService,
    getRoutineListService,
    getARoutineService,
    deleteARoutineService
};
