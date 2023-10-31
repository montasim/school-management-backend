import { DashboardService } from "./dashboard.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function getSummaryListController
 * @description Controller for fetching all Summary.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getSummaryController = async (req, res) => {
    const { requestedBy, db } = extractFromRequest(req, [], []);

    await handleServiceResponse(res, DashboardService.getSummaryService, db, requestedBy);
};

/**
 * @namespace DashboardController
 * @description Group of controllers for handling Summary operations.
 */
export const DashboardController = {
    getSummaryController,
};
