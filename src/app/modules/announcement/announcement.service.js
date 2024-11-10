import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ANNOUNCEMENT_CONSTANTS } from "./announcement.constants.js";
import logger from "../../../shared/logger.js";
import prisma from "../../../shared/prisma?.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

const createAnnouncementService = async (db, newAnnouncementDetails) => {
    try {
        const { name, adminId } = newAnnouncementDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const announcementDetails = {
            id: generateUniqueID(ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_ID_PREFIX),
            name,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newAnnouncement = await prisma?.announcement.create({
            data: announcementDetails
        });

        return generateResponseData(
            { id: newAnnouncement.id, name: newAnnouncement.name },
            true,
            STATUS_OK,
            `${newAnnouncement.id} created successfully`
        );
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getAnnouncementListService = async (db) => {
    try {
        const announcements = await prisma?.announcement.findMany();

        return announcements.length > 0
            ? generateResponseData(announcements, true, STATUS_OK, `${announcements.length} announcements found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No announcements found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAAnnouncementService = async (db, announcementId) => {
    try {
        const announcement = await prisma?.announcement.findUnique({
            where: { id: announcementId }
        });

        if (announcement) {
            delete announcement.createdBy;
            delete announcement.modifiedBy;
        }

        return announcement
            ? generateResponseData(announcement, true, STATUS_OK, `${announcementId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAAnnouncementService = async (db, announcementId, newAnnouncementDetails) => {
    try {
        const { name, adminId } = newAnnouncementDetails;

        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingAnnouncement = await prisma?.announcement.findUnique({
            where: { id: announcementId }
        });

        if (!existingAnnouncement) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);
        }

        const updatedAnnouncement = await prisma?.announcement.update({
            where: { id: announcementId },
            data: {
                ...(name && { name }),
                modifiedBy: adminId,
                modifiedAt: new Date(),
            }
        });

        return updatedAnnouncement
            ? generateResponseData(updatedAnnouncement, true, STATUS_OK, `${announcementId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${announcementId} not updated`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const deleteAAnnouncementService = async (db, adminId, announcementId) => {
    try {
        if (!await isValidRequest(db, adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingAnnouncement = await prisma?.announcement.findUnique({
            where: { id: announcementId }
        });

        if (!existingAnnouncement) {
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${announcementId} not found`);
        }

        await prisma?.announcement.delete({
            where: { id: announcementId }
        });

        return generateResponseData({}, true, STATUS_OK, `${announcementId} deleted successfully`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const AnnouncementService = {
    createAnnouncementService,
    getAnnouncementListService,
    getAAnnouncementService,
    updateAAnnouncementService,
    deleteAAnnouncementService
};
