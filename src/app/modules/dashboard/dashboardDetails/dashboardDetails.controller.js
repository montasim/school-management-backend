/**
 * @fileoverview Controller for Dashboard Module.
 *
 * This file includes controller functions for handling various dashboard-related operations in the application.
 * The `getSummaryController` function, for instance, is responsible for fetching and returning a summary
 * of relevant data to the client. These functions typically extract necessary information from the request,
 * call the appropriate service functions, handle the response, and catch any errors that might occur during the process.
 *
 * @requires DashboardDetailsService - Service module that contains the business logic for dashboard operations.
 * @requires extractFromRequest - Helper function to extract data from the request object.
 * @requires handleServiceResponse - Helper function to handle the response from service functions.
 * @requires logger - Shared logger utility for logging errors.
 * @module DashboardController - Exported dashboard controller functions.
 */

import { DashboardDetailsService } from "./dashboardDetails.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * Controller function for fetching dashboard summary.
 * This function extracts necessary parameters from the request, calls the getSummaryService from the DashboardDetailsService,
 * handles the service response, and catches any errors during the process.
 *
 * @async
 * @function getSummaryController
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getSummaryController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req, [], []);
        const collectionQuery = req?.query?.for; // Extract 'for' query parameter

        await handleServiceResponse(res, DashboardDetailsService.getSummaryService, db, adminId, collectionQuery);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace DashboardController
 * @description Group of controllers for handling Summary operations.
 */
export const DashboardDetailsController = {
    getSummaryController,
};