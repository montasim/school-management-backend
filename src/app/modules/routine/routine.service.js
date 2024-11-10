import { ROUTINE_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ROUTINE_CONSTANTS } from "./routine.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import createByDetails from "../../../shared/createByDetails.js";
import findByField from "../../../shared/findByField.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByField from "../../../shared/deleteByField.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import fileManager from "../../../helpers/fileManager.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createRoutineService = async (req, newRoutineDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newRoutineDetails;

        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', file?.originalname))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${file?.originalname} already exists. Please select a different file name`)

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const routineDetails = {
            id: generateUniqueID(ROUTINE_CONSTANTS?.ROUTINE_ID_PREFIX),
            title: title,
            fileName: file?.originalname,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            routineLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, ROUTINE_COLLECTION_NAME, routineDetails);
        const latestData = await findByField(db, ROUTINE_COLLECTION_NAME, 'id', routineDetails?.id);

        delete latestData?.createdBy;
        delete latestData?.fileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${file?.originalname} uploaded successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

const getRoutineListService = async (db) => {
    try {
        const routines = await getAllData(db, ROUTINE_COLLECTION_NAME);

        return routines?.length
            ? generateResponseData(routines, true, STATUS_OK, `${routines?.length} routine found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No routine found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

const getARoutineService = async (db, fileName) => {
    try {
        const routine = await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

        delete routine?.fileId;

        return routine
            ? generateResponseData(routine, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

const deleteARoutineService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

        if (fileDetails) {
            await fileManager.deleteFile(fileDetails.fileId);

            const result = await deleteByField(db, ROUTINE_COLLECTION_NAME, 'fileName', fileName);

            return result
                ? generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`)
                : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${fileName} could not be deleted`);
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export const RoutineService = {
    createRoutineService,
    getRoutineListService,
    getARoutineService,
    deleteARoutineService
};
