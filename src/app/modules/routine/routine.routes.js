import express from "express";
import {RoutineValidators} from "./routine.validator.js";
import multerConfig from "../../../helpers/multerConfig.js";
import { RoutineController } from "./routine.controller.js";

const router = express.Router();

/**
 * @route POST /routine
 * @group routine - Operations about noticing
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
    RoutineValidators.routineBodyValidator,
    RoutineController.createRoutineController
);

/**
 * @route GET /routine
 * @group routine - Operations about noticing
 * @returns {Array.<object>} 200 - An array of available routines
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a list of available files for routine.
 */
router.get(
    "/",
    RoutineController.getRoutineListController
);

/**
 * @route GET /routine/{fileName}
 * @group routine - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be retrieved
 * @returns {object} 200 - An object containing details of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for retrieving a specific file based on the provided file name.
 */
router.get(
    "/:fileName",
    RoutineValidators.routineParamsValidator,
    RoutineController.getARoutineController
);

/**
 * @route DELETE /routine/{fileName}
 * @group routine - Operations about noticing
 * @param {string} fileName.path.required - Name of the file to be deleted
 * @returns {object} 200 - An object confirming the deletion of the specified file
 * @returns {Error}  default - Unexpected error
 *
 * @description Route for deleting a specific file based on the provided file name.
 */
router.delete(
    "/:fileName",
    RoutineValidators.routineParamsValidator,
    RoutineValidators.deleteRoutineQueryValidator,
    RoutineController.deleteARoutineController
);

export default router;
