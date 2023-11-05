// Third-party modules
import { v4 as uuidv4 } from 'uuid';

// Absolute imports
import { NOTICE_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";

// Relative imports
import { ID_CONSTANTS } from "./notice.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import logger from "../../../shared/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import deleteByFileName from "../../../shared/deleteByFileName.js";
import findByFileName from "../../../shared/findByFileName.js";
import { HandleGoogleDrive } from "../../../helpers/handleGoogleDriveApi.js";

/**
 * Creates a new notice entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {Object} newNoticeDetails - New notice's details.
 * @returns {Object} - The response after attempting notice creation.
 * @throws {Error} Throws an error if any.
 */
const createNoticeService = async (db, newNoticeDetails) => {
    try {
        const { title, fileName, fileBuffer, mimeType, adminId } = newNoticeDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        if (await findByFileName(db, NOTICE_COLLECTION_NAME, fileName))
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `File name ${fileName} already exists. Please select a different file name`)

        const uploadGoogleDriveFileResponse = await HandleGoogleDrive.uploadFile(fileName, fileBuffer, mimeType);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const noticeDetails = {
            id: `${ID_CONSTANTS?.DOWNLOAD_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            fileName: fileName,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, NOTICE_COLLECTION_NAME, noticeDetails);
        const latestData = await findById(db, NOTICE_COLLECTION_NAME, noticeDetails?.id);

        delete latestData?.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${title} uploaded successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to upload. Please try again');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a list of all notices from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of notices or an error message.
 * @throws {Error} Throws an error if any.
 */
const getNoticeListService = async (db) => {
    try {
        const notices = await getAllData(db, NOTICE_COLLECTION_NAME);

        return notices?.length
            ? generateResponseData(notices, true, STATUS_OK, `${notices?.length} notice found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No notice found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific notice by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} fileName - The fileName of the notice to retrieve.
 * @returns {Object} - The notice details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getANoticeService = async (db, fileName) => {
    try {
        const notice = await findByFileName(db, NOTICE_COLLECTION_NAME, fileName);

        delete notice?.googleDriveFileId;

        return notice
            ? generateResponseData(notice, true, STATUS_OK, `${fileName} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific notice by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @param {string} fileName - The fileName of the notice to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteANoticeService = async (db, adminId, fileName) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const fileDetails = await findByFileName(db, NOTICE_COLLECTION_NAME, fileName);

        if (fileDetails) {
            const response = await HandleGoogleDrive.deleteFile(fileDetails?.googleDriveFileId);
            const result = await deleteByFileName(db, NOTICE_COLLECTION_NAME, fileName);

            return result
                ? generateResponseData({}, true, STATUS_OK, `${fileName} deleted successfully`)
                : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${fileName} could not be deleted`);
        } else {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${fileName} not found`);
        }
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace NoticeService
 * @description Group of services related to notice operations.
 */
export const NoticeService = {
    createNoticeService,
    getNoticeListService,
    getANoticeService,
    deleteANoticeService
};
