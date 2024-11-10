import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { PHOTO_GALLERY_CONSTANTS } from "./photoGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import fileManager from "../../../../helpers/fileManager.js";
import logger from "../../../../shared/logger.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import prisma from "../../../../shared/prisma?.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";

const createPhotoGalleryService = async (req, newPhotoGalleryDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newPhotoGalleryDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);

        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const photoGalleryDetails = {
            id: generateUniqueID(PHOTO_GALLERY_CONSTANTS?.PHOTO_GALLERY_ID_PREFIX),
            title,
            fileId: uploadFileResponse.fileId,
            downloadLink: fileLink,
            shareableLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newPhotoGallery = await prisma?.photoGallery.create({
            data: photoGalleryDetails
        });

        return generateResponseData({
            id: newPhotoGallery.id,
            title: newPhotoGallery.title,
            shareableLink: newPhotoGallery.shareableLink,
            downloadLink: newPhotoGallery.downloadLink
        }, true, STATUS_OK, `${title} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getPhotoGalleryListService = async (db) => {
    try {
        const photoGalleries = await prisma?.photoGallery.findMany();

        return photoGalleries.length
            ? generateResponseData(photoGalleries, true, STATUS_OK, `${photoGalleries.length} photo galleries found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No photo galleries found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAPhotoGalleryService = async (db, photoGalleryId) => {
    try {
        const photoGallery = await prisma?.photoGallery.findUnique({
            where: { id: photoGalleryId }
        });

        if (photoGallery) {
            delete photoGallery.createdBy;
            delete photoGallery.modifiedBy;
            delete photoGallery.fileId;
        }

        return photoGallery
            ? generateResponseData(photoGallery, true, STATUS_OK, `${photoGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${photoGalleryId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAPhotoGalleryService = async (db, adminId, photoGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingPhotoGallery = await prisma?.photoGallery.findUnique({
            where: { id: photoGalleryId }
        });

        if (!existingPhotoGallery) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${photoGalleryId} not found`);
        }

        await fileManager.deleteFile(existingPhotoGallery.fileId);

        await prisma?.photoGallery.delete({
            where: { id: photoGalleryId }
        });

        return generateResponseData({}, true, STATUS_OK, `${photoGalleryId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const PhotoGalleryService = {
    createPhotoGalleryService,
    getPhotoGalleryListService,
    getAPhotoGalleryService,
    deleteAPhotoGalleryService
};
