import {
    FORBIDDEN_MESSAGE, STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./homePagePost.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma?.js";
import fileManager from "../../../../helpers/fileManager.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateFileLink from "../../../../helpers/generateFileLink.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createHomePagePostService = async (req, newHomePagePostDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, category, description, adminId } = newHomePagePostDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingPosts = await prisma?.homePagePost.findMany();
        if (existingPosts.length >= 3) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Cannot add more than 3 posts');
        }

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const homePagePostDetails = {
            id: generateUniqueID(ID_CONSTANTS?.HOME_PAGE_POST_PREFIX),
            title,
            category,
            fileId: uploadFileResponse.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            description,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newPost = await prisma?.homePagePost.create({
            data: homePagePostDetails
        });

        return generateResponseData(newPost, true, STATUS_OK, `${title} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getHomePagePostListService = async (db) => {
    try {
        const homePagePosts = await prisma?.homePagePost.findMany();

        return homePagePosts.length
            ? generateResponseData(homePagePosts, true, STATUS_OK, `${homePagePosts.length} posts found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No posts found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAHomePagePostService = async (db, homePagePostId) => {
    try {
        const homePagePost = await prisma?.homePagePost.findUnique({
            where: { id: homePagePostId }
        });

        return homePagePost
            ? generateResponseData(homePagePost, true, STATUS_OK, `${homePagePostId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAHomePagePostService = async (req, newHomePagePostDetails) => {
    try {
        const { db, file: postImage, protocol } = req;
        const { homePagePostId, title, category, description, adminId } = newHomePagePostDetails;

        if (!title && !category && !description && !postImage) {
            return generateResponseData({}, false, STATUS_BAD_REQUEST, "All fields cannot be empty");
        }

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma?.homePagePost.findUnique({
            where: { id: homePagePostId }
        });

        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);
        }

        const updatedData = { modifiedBy: adminId, modifiedAt: new Date() };
        if (title) updatedData.title = title;
        if (category) updatedData.category = category;
        if (description) updatedData.description = description;

        if (postImage) {
            await fileManager.deleteFile(oldDetails.fileId);

            const uploadFileResponse = await fileManager.uploadFile(postImage);
            if (!uploadFileResponse?.shareableLink) {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload image. Please try again');
            }

            updatedData.fileId = uploadFileResponse.fileId;
            updatedData.shareableLink = generateFileLink(req, uploadFileResponse);
            updatedData.downloadLink = updatedData.shareableLink;
        }

        const updatedPost = await prisma?.homePagePost.update({
            where: { id: homePagePostId },
            data: updatedData
        });

        return generateResponseData(updatedPost, true, STATUS_OK, `${homePagePostId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to update. Please try again');
    }
};

const deleteAHomePagePostService = async (db, adminId, homePagePostId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const oldDetails = await prisma?.homePagePost.findUnique({
            where: { id: homePagePostId }
        });

        if (!oldDetails) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${homePagePostId} not found`);
        }

        await fileManager.deleteFile(oldDetails.fileId);

        await prisma?.homePagePost.delete({
            where: { id: homePagePostId }
        });

        return generateResponseData({}, true, STATUS_OK, `${homePagePostId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const HomePagePostService = {
    createHomePagePostService,
    getHomePagePostListService,
    getAHomePagePostService,
    updateAHomePagePostService,
    deleteAHomePagePostService
};
