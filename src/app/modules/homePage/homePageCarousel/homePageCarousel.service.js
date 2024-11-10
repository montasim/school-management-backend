import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { HOME_PAGE_CAROUSEL_CONSTANTS } from "./homePageCarousel.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";
import fileManager from "../../../../helpers/fileManager.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";

const createHomePageCarouselService = async (req, newHomePageCarouselDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, adminId } = newHomePageCarouselDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload the file. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const homePageCarouselDetails = {
            id: generateUniqueID(HOME_PAGE_CAROUSEL_CONSTANTS?.HOME_PAGE_CAROUSEL_ID_PREFIX),
            title,
            fileId: uploadFileResponse.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newHomePageCarousel = await prisma.homePageCarousel.create({
            data: homePageCarouselDetails
        });

        return generateResponseData({
            id: newHomePageCarousel.id,
            title: newHomePageCarousel.title,
            shareableLink: newHomePageCarousel.shareableLink,
            downloadLink: newHomePageCarousel.downloadLink
        }, true, STATUS_OK, `${title} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getHomePageCarouselListService = async (db) => {
    try {
        const homePageCarousel = await prisma.homePageCarousel.findMany();

        return homePageCarousel.length
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarousel.length} carousel items found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No carousel items found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAHomePageCarouselService = async (db, homePageCarouselId) => {
    try {
        const homePageCarousel = await prisma.homePageCarousel.findUnique({
            where: { id: homePageCarouselId }
        });

        if (homePageCarousel) {
            delete homePageCarousel.createdBy;
            delete homePageCarousel.modifiedBy;
            delete homePageCarousel.fileId;
        }

        return homePageCarousel
            ? generateResponseData(homePageCarousel, true, STATUS_OK, `${homePageCarouselId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAHomePageCarouselService = async (db, adminId, homePageCarouselId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingCarousel = await prisma.homePageCarousel.findUnique({
            where: { id: homePageCarouselId }
        });

        if (!existingCarousel) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePageCarouselId} not found`);
        }

        await fileManager.deleteFile(existingCarousel.fileId);

        await prisma.homePageCarousel.delete({
            where: { id: homePageCarouselId }
        });

        return generateResponseData({}, true, STATUS_OK, `${homePageCarouselId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const HomePageCarouselService = {
    createHomePageCarouselService,
    getHomePageCarouselListService,
    getAHomePageCarouselService,
    deleteAHomePageCarouselService
};
