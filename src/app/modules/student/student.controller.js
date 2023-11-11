/**
 * @fileoverview Student Controller for Express Application.
 *
 * This module provides controller functions for handling student-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to students,
 * interacting with the StudentService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the student-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires StudentService - Service layer handling business logic related to students.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module StudentController - Exported student controller functions.
 */

import { StudentService } from "./student.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createStudentController
 * @description Controller for creating a new student.
 * @param {express.Request} req - Express request object containing student details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createStudentController = async (req, res) => {
    try {
        const { name, level, adminId, db } = extractFromRequest(req, ['name', 'level']);
        const newStudentDetails = { name, level, adminId };

        await handleServiceResponse(res, StudentService.createStudentService, db, newStudentDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getStudentList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getStudentListController = async (req, res) => {
    try {
        await handleServiceResponse(res, StudentService.getStudentListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAStudent
 * @description Controller for fetching a specific student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAStudentController = async (req, res) => {
    try {
        const { studentId, db } = extractFromRequest(req, [], ['studentId']);

        await handleServiceResponse(res, StudentService.getAStudentService, db, studentId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAStudent
 * @description Controller for updating a specific student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAStudentController = async (req, res) => {
    try {
        const { studentId, name, level, adminId, db } = extractFromRequest(req, ['name', 'level'], ['studentId']);
        const updatedStudentDetails = { name, level, adminId };

        await handleServiceResponse(res, StudentService.updateAStudentService, db, studentId, updatedStudentDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAStudentController
 * @description Controller for deleting a student by ID.
 *
 * @param {express.Request} req - Express request object containing student ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAStudentController = async (req, res) => {
    try {
        const { studentId, adminId, db } = extractFromRequest(req, [], ['studentId']);

        await handleServiceResponse(res, StudentService.deleteAStudentService, db, adminId, studentId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace StudentController
 * @description Group of controllers for handling student operations.
 */
export const StudentController = {
    createStudentController,
    getStudentListController,
    getAStudentController,
    updateAStudentController,
    deleteAStudentController
};