import express from "express";
import { DownloadController } from "./download.controller.js";
import multerConfig from "../../../helpers/multerConfig.js";
import {DownloadValidators} from "./download.validator.js";

const router = express.Router();

/**
 * @route POST /download
 * @group download - Operations about downloading
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
    DownloadValidators.downloadBodyValidator,
    DownloadController.createDownloadController
);

/**
 * @route GET /download
 * @group download - Operations about downloading
 * @returns {Array.<object>} 200 - An array of available downloads
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a list of available files for download.
 */
router.get(
    "/",
    DownloadController.getDownloadListController
);

/**
 * @route GET /download/{fileName}
 * @group download - Operations about downloading
 * @param {string} fileName.path.required - Name of the file to be retrieved
 * @returns {object} 200 - An object containing details of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a specific file based on the provided file name.
 */
router.get(
    "/:fileName",
    DownloadValidators.downloadParamsValidator,
    DownloadController.getADownloadController
);

/**
 * @route DELETE /download/{fileName}
 * @group download - Operations about downloading
 * @param {string} fileName.path.required - Name of the file to be deleted
 * @returns {object} 200 - An object confirming the deletion of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for deleting a specific file based on the provided file name.
 */
router.delete(
    "/:fileName",
    DownloadValidators.downloadParamsValidator,
    DownloadValidators.deleteDownloadQueryValidator,
    DownloadController.deleteADownloadController
);

export default router;
