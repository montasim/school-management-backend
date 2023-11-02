// Third-party modules
import multer from 'multer';
import path from 'path';

// Constants
import { UPLOAD_DIRECTORY_MAP } from '../../constants/constants.js';

// Shared utilities
import createFolderIfNotExists from '../../shared/createFolderIfNotExists.js';


/**
 * Determines and sets the storage destination for uploaded files by mapping specific keywords
 * in the requested URL to corresponding directories.
 *
 * @function destination
 * @param {Express.Request} req - The Express request object containing the incoming request.
 * @param {Express.Multer.File} file - The file object representing the file being uploaded.
 * @param {function(Error, string):void} cb - Callback function to be invoked once the destination is determined.
 */
const destination = async (req, file, cb) => {
    const requestedURL = req?.originalUrl;
    const matchedDestination = Object.keys(UPLOAD_DIRECTORY_MAP)
        .find(keyword => requestedURL?.includes(keyword));

    const finalDestination = matchedDestination
        ? path.join('/tmp', UPLOAD_DIRECTORY_MAP[matchedDestination])
        : '/tmp';

    // Ensure the destination directory exists, or create it if it doesn't
    await createFolderIfNotExists(finalDestination);

    cb(null, finalDestination);
};

/**
 * Determines and sets the filename for uploaded files by appending a unique timestamp before the file extension.
 *
 * @function filename
 * @param {Express.Request} req - The Express request object containing the incoming request.
 * @param {Express.Multer.File} file - The file object representing the file being uploaded.
 * @param {function(Error, string):void} cb - Callback function to be invoked once the filename is determined.
 */
const filename = (req, file, cb) => {
    const fileExtension = path.extname(file?.originalname);
    const uniqueFilename = path.basename(file?.originalname, fileExtension) + '-' + Date.now() + fileExtension;

    cb(null, uniqueFilename);
};

/**
 * Configuration for multer's disk storage that specifies both the destination directory and filename for uploaded files.
 *
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({ destination, filename });

/**
 * A Multer instance configured with the disk storage settings.
 * It can be used as middleware in Express routes for handling file uploads.
 *
 * @type {multer.Multer}
 */
const upload = multer({ storage });

export default upload;
