import { LEVEL_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE, STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { STUDENT_CONSTANTS } from "./student.constants.js";
import logger from "../../../shared/logger.js";
import fileManager from "../../../helpers/fileManager.js";
import prisma from "../../../shared/prisma.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import generateFileLink from "../../../helpers/generateFileLink.js";

const createStudentService = async (req, newStudentDetails) => {
    try {
        const { file, protocol } = req;
        const { name, level, adminId } = newStudentDetails;

        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Generate custom ID
        const studentId = generateUniqueID(STUDENT_CONSTANTS.STUDENT_ID_PREFIX);

        const uploadFileResponse = await fileManager.uploadFile(file);
        if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');
        }

        const fileLink = generateFileLink(req, uploadFileResponse);
        const studentDetails = {
            id: studentId, // Use the custom-generated ID
            name,
            level,
            fileId: uploadFileResponse?.fileId,
            shareableLink: fileLink,
            downloadLink: fileLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await prisma.student.create({
            data: studentDetails
        });

        return generateResponseData(result, true, STATUS_OK, `${name} created successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');
    }
};

const getStudentListService = async (db, categoryFilter) => {
    try {
        let whereCondition = {};
        if (categoryFilter?.length > 0) {
            whereCondition.level = { in: categoryFilter };
        }

        const students = await prisma.student.findMany({
            where: whereCondition
        });

        return students.length
            ? generateResponseData(students, true, STATUS_OK, `${students.length} students found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No students found');
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getAStudentService = async (db, studentId) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        return student
            ? generateResponseData(student, true, STATUS_OK, `${studentId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const updateAStudentService = async (req, studentId, newStudentDetails) => {
    try {
        const { file, protocol } = req; // Assuming these are used for file operations and logging.
        const { name, level, adminId } = newStudentDetails;

        // Validate admin ID request
        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Check if the student exists
        const oldDetails = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);

        // Prepare the update object
        let updateData = {};

        // Update name if provided
        if (name) updateData.name = name;

        // Update level if provided and validate the level name
        if (level && level !== oldDetails.level) {
            // Check if the level name exists or is changed to a valid level
            const levelExists = await prisma.level.findUnique({ where: { name: level } });
            if (!levelExists) {
                return generateResponseData({}, false, STATUS_BAD_REQUEST, `Level '${level}' does not exist`);
            }
            updateData.level = level;
        }

        // Update file if provided
        if (file) {
            // Delete old file if it exists
            if (oldDetails.fileId) {
                await fileManager.deleteFile(oldDetails.fileId);
            }

            // Upload new file and update file details
            const uploadFileResponse = await fileManager.uploadFile(file);
            if (!uploadFileResponse?.shareableLink && !uploadFileResponse?.filePath) {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'File upload failed. Please try again.');
            }

            // Generate new file links and update in database
            const fileLink = generateFileLink(req, uploadFileResponse);
            updateData.fileId = uploadFileResponse.fileId;
            updateData.shareableLink = fileLink;
            updateData.downloadLink = fileLink;
        }

        // Update metadata for modification
        updateData.modifiedBy = adminId;
        updateData.modifiedAt = new Date();

        // Perform the update operation
        const result = await prisma.student.update({
            where: { id: studentId },
            data: updateData
        });

        // Retrieve the updated data to return updated response
        const updatedStudent = await prisma.student.findUnique({
            where: { id: studentId },
            select: {
                name: true,
                level: true,
                shareableLink: true,
                downloadLink: true,
                modifiedBy: true,
                modifiedAt: true
                // Add other fields as necessary
            }
        });

        return generateResponseData(updatedStudent, true, STATUS_OK, `${studentId} updated successfully`);
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to update. Please try again');
    }
};

const deleteAStudentService = async (db, adminId, studentId) => {
    try {
        if (!await isValidRequest(adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);

        await fileManager.deleteFile(oldDetails.fileId);

        const result = await prisma.student.delete({
            where: {
                id: studentId,
            },
        });

        return result
            ? generateResponseData({}, true, STATUS_OK, `${studentId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${studentId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export const StudentService = {
    createStudentService,
    getStudentListService,
    getAStudentService,
    updateAStudentService,
    deleteAStudentService
};