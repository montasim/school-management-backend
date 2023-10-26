import express from "express";
import {ResultValidators} from "./result.validator.js";
import multerConfig from "../../../helpers/multerConfig.js";
import { ResultController } from "./result.controller.js";

const router = express.Router();

/**
 * @route POST /result
 * @group result - Operations about noticing
 * @param {file.formData} file.required - The file to upload
 * @returns {object} 200 - An object containing details of the uploaded file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for uploading a file to the server.
 * This route uses `multer` middleware to handle file uploads,
 * and then passes the request to the controller.
 */
router.post(
    "/",
    multerConfig.single('file'),
    ResultValidators.resultBodyValidator,
    ResultController.createResultController
);

/**
 * @route GET /result
 * @group result - Operations about noticing
 * @returns {Array.<object>} 200 - An array of available results
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a list of available files for result.
 */
router.get(
    "/",
    ResultController.getResultListController
);

/**
 * @route GET /result/{fileName}
 * @group result - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be retrieved
 * @returns {object} 200 - An object containing details of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a specific file based on the provided file name.
 */
router.get(
    "/:fileName",
    ResultValidators.resultParamsValidator,
    ResultController.getAResultController
);

/**
 * @route DELETE /result/{fileName}
 * @group result - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be deleted
 * @returns {object} 200 - An object confirming the deletion of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for deleting a specific file based on the provided file name.
 */
router.delete(
    "/:fileName",
    ResultValidators.resultParamsValidator,
    ResultValidators.deleteResultQueryValidator,
    ResultController.deleteAResultController
);

export default router;
