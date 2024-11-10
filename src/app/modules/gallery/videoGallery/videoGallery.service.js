import {
    FORBIDDEN_MESSAGE,
    STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { VIDEO_GALLERY_CONSTANTS } from "./videoGallery.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import extractYoutubeVideoID from "../../../../helpers/extractYoutubeVideoID.js";

const createVideoGalleryService = async (db, newVideoGalleryDetails) => {
    try {
        const { videoGalleryTitle, videoLink, adminId } = newVideoGalleryDetails;
        const videoID = extractYoutubeVideoID(videoLink);

        if (!videoID) {
            return generateResponseData({}, false, STATUS_BAD_REQUEST, 'Invalid YouTube URL');
        }

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const videoGalleryDetails = {
            id: generateUniqueID(VIDEO_GALLERY_CONSTANTS?.VIDEO_GALLERY_ID_PREFIX),
            videoGalleryTitle,
            videoLink,
            videoID,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newVideoGallery = await prisma.videoGallery.create({
            data: videoGalleryDetails
        });

        return generateResponseData(newVideoGallery, true, STATUS_OK, `${videoGalleryTitle} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getVideoGalleryListService = async (db) => {
    try {
        const videoGallery = await prisma.videoGallery.findMany();

        return videoGallery.length
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGallery.length} videos found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No videos found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAVideoGalleryService = async (db, videoGalleryId) => {
    try {
        const videoGallery = await prisma.videoGallery.findUnique({
            where: { id: videoGalleryId }
        });

        return videoGallery
            ? generateResponseData(videoGallery, true, STATUS_OK, `${videoGalleryId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAVideoGalleryService = async (db, videoGalleryId, updateVideoGalleryDetails) => {
    try {
        const { videoGalleryTitle, videoLink, adminId } = updateVideoGalleryDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingVideoGallery = await prisma.videoGallery.findUnique({
            where: { id: videoGalleryId }
        });

        if (!existingVideoGallery) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);
        }

        const videoID = videoLink ? extractYoutubeVideoID(videoLink) : existingVideoGallery.videoID;

        const updatedVideoGallery = await prisma.videoGallery.update({
            where: { id: videoGalleryId },
            data: {
                ...(videoGalleryTitle && { videoGalleryTitle }),
                ...(videoLink && { videoLink }),
                videoID,
                modifiedBy: adminId,
                modifiedAt: new Date(),
            }
        });

        return generateResponseData(updatedVideoGallery, true, STATUS_OK, `${videoGalleryId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAVideoGalleryService = async (db, adminId, videoGalleryId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingVideoGallery = await prisma.videoGallery.findUnique({
            where: { id: videoGalleryId }
        });

        if (!existingVideoGallery) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${videoGalleryId} not found`);
        }

        await prisma.videoGallery.delete({
            where: { id: videoGalleryId }
        });

        return generateResponseData({}, true, STATUS_OK, `${videoGalleryId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const VideoGalleryService = {
    createVideoGalleryService,
    getVideoGalleryListService,
    getAVideoGalleryService,
    updateAVideoGalleryService,
    deleteAVideoGalleryService
};
