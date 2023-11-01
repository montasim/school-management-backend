import express from "express";
import {NoticeValidators} from "./notice.validator.js";
import multerConfig from "../../middlewares/multerConfigurationMiddleware.js";
import { NoticeController } from "./notice.controller.js";

const router = express.Router();

/**
 * @route POST /notice
 * @group notice - Operations about noticing
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
    NoticeValidators.noticeBodyValidator,
    NoticeController.createNoticeController
);

/**
 * @route GET /notice
 * @group notice - Operations about noticing
 * @returns {Array.<object>} 200 - An array of available notices
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a list of available files for notice.
 */
router.get(
    "/",
    NoticeController.getNoticeListController
);

/**
 * @route GET /notice/{fileName}
 * @group notice - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be retrieved
 * @returns {object} 200 - An object containing details of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a specific file based on the provided file name.
 */
router.get(
    "/:fileName",
    NoticeValidators.noticeParamsValidator,
    NoticeController.getANoticeController
);

/**
 * @route DELETE /notice/{fileName}
 * @group notice - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be deleted
 * @returns {object} 200 - An object confirming the deletion of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for deleting a specific file based on the provided file name.
 */
router.delete(
    "/:fileName",
    NoticeValidators.noticeParamsValidator,
    NoticeValidators.deleteNoticeQueryValidator,
    NoticeController.deleteANoticeController
);

export default router;
