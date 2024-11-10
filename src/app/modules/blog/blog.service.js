import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./blog.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma.js";
import fileManager from "../../../helpers/fileManager.js";

import generateResponseData from "../../../shared/generateResponseData.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createBlogService = async (req, newBlogDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, category, description, adminId } = newBlogDetails;

        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadFileResponse = await fileManager.uploadFile(file);

        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload to Google Drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const blogDetails = {
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

        const newBlog = await prisma?.blog.create({
            data: blogDetails
        });

        return generateResponseData({
            id: newBlog.id,
            title: newBlog.title,
            category: newBlog.category,
            shareableLink: newBlog.shareableLink,
            downloadLink: newBlog.downloadLink,
            description: newBlog.description
        }, true, STATUS_OK, `${title} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getBlogListService = async (db) => {
    try {
        const blogs = await prisma?.blog.findMany();

        return blogs.length
            ? generateResponseData(blogs, true, STATUS_OK, `${blogs.length} blogs found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No blogs found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getABlogService = async (db, blogId) => {
    try {
        const blog = await prisma?.blog.findUnique({
            where: { id: blogId }
        });

        if (blog) {
            delete blog.createdBy;
            delete blog.modifiedBy;
            delete blog.fileId;
        }

        return blog
            ? generateResponseData(blog, true, STATUS_OK, `${blogId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateABlogService = async (req, blogId, newBlogDetails) => {
    try {
        const { db, file, protocol } = req;
        const { title, category, description, adminId } = newBlogDetails;

        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const existingBlog = await prisma?.blog.findUnique({
            where: { id: blogId }
        });

        if (!existingBlog)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);

        const updatedBlogDetails = {
            ...existingBlog,
            ...(title && { title }),
            ...(category && { category }),
            ...(description && { description }),
            modifiedBy: adminId,
            modifiedAt: new Date()
        };

        if (file) {
            await fileManager.deleteFile(existingBlog.fileId);
            const uploadFileResponse = await fileManager.uploadFile(file);

            if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath)
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');

            const fileLink = generateFileLink(req, uploadFileResponse);

            updatedBlogDetails.fileId = uploadFileResponse.fileId;
            updatedBlogDetails.shareableLink = fileLink;
            updatedBlogDetails.downloadLink = fileLink;
        }

        const updatedBlog = await prisma?.blog.update({
            where: { id: blogId },
            data: updatedBlogDetails
        });

        return generateResponseData(updatedBlog, true, STATUS_OK, `${blogId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteABlogService = async (db, adminId, blogId) => {
    try {
        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const existingBlog = await prisma?.blog.findUnique({
            where: { id: blogId }
        });

        if (!existingBlog)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${blogId} not found`);

        await fileManager.deleteFile(existingBlog.fileId);

        await prisma?.blog.delete({
            where: { id: blogId }
        });

        return generateResponseData({}, true, STATUS_OK, `${blogId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const BlogService = {
    createBlogService,
    getBlogListService,
    getABlogService,
    updateABlogService,
    deleteABlogService
};
