import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { WEBSITE_CONTACT_CONSTANTS } from "./websiteContact.constants.js";
import logger from "../../../../shared/logger.js";
import prisma from "../../../../shared/prisma.js";

import isValidRequest from "../../../../shared/isValidRequest.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import generateUniqueID from "../../../../helpers/generateUniqueID.js";

const createWebsiteContactService = async (db, websiteContactDetails) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, adminId } = websiteContactDetails;

        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const existingDetails = await prisma.websiteContact.findMany();
        if (existingDetails?.length > 0) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Website contact already exists. Please update website contact");
        }

        // Convert googleMapLocation to JSON string
        const googleMapLocationStr = JSON.stringify(googleMapLocation);

        const contactData = {
            id: generateUniqueID(WEBSITE_CONTACT_CONSTANTS?.WEBSITE_CONTACT_ID_PREFIX),
            address,
            googleMapLocation: googleMapLocationStr,
            mobile,
            phone,
            email,
            website,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const newContact = await prisma.websiteContact.create({
            data: contactData,
        });

        return generateResponseData(newContact, true, STATUS_OK, "Website contact added successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getWebsiteContactService = async (db) => {
    try {
        const websiteContact = await prisma.websiteContact.findFirst();

        if (websiteContact) {
            return {
                data: websiteContact,
                success: true,
                status: STATUS_OK,
                message: "Website contact found successfully"
            };
        } else {
            return {
                data: {},
                success: false,
                status: STATUS_NOT_FOUND,
                message: 'No website contact found'
            };
        }
    } catch (error) {
        logger.error(error);
        throw error;  // Returns the error object instead of formatting
    }
};

const updateWebsiteContactService = async (db, websiteContactDetails) => {
    try {
        const { address, googleMapLocation, mobile, phone, email, website, latitude, longitude, adminId } = websiteContactDetails;

        if (!await isValidRequest(adminId)) {
            return {
                data: {},
                success: false,
                status: STATUS_FORBIDDEN,
                message: FORBIDDEN_MESSAGE
            };
        }

        const oldDetails = await prisma.websiteContact.findFirst();
        if (!oldDetails) {
            return {
                data: {},
                success: false,
                status: STATUS_NOT_FOUND,
                message: 'Website contact not found'
            };
        }

        const updatedData = {
            ...(address && { address }),
            ...(mobile && { mobile }),
            ...(phone && { phone }),
            ...(email && { email }),
            ...(website && { website }),
            ...(latitude && { latitude }),
            ...(longitude && { longitude }),
            // googleMapLocation: googleMapLocation || (latitude && longitude ? `${latitude},${longitude}` : oldDetails.googleMapLocation),
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };

        const updatedContact = await prisma.websiteContact.update({
            where: { id: oldDetails.id },
            data: updatedData,
        });

        return {
            data: updatedContact,
            success: true,
            status: STATUS_OK,
            message: "Website contact updated successfully"
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

const deleteWebsiteContactService = async (db, adminId) => {
    try {
        if (!await isValidRequest(adminId)) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);
        }

        const deleted = await prisma.websiteContact.deleteMany({});

        return deleted.count > 0
            ? generateResponseData({}, true, STATUS_OK, "Website contact deleted successfully")
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "No website contact found to delete");
    } catch (error) {
        logger.error(error);
        return error;
    }
};

export const WebsiteContactService = {
    createWebsiteContactService,
    getWebsiteContactService,
    updateWebsiteContactService,
    deleteWebsiteContactService
};
