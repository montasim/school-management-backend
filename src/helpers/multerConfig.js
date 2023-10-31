import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Determines and sets the storage destination for uploaded files by mapping specific keywords
 * in the requested URL to corresponding directories.
 *
 * @function destination
 * @param {Express.Request} req - The Express request object containing the incoming request.
 * @param {Express.Multer.File} file - The file object representing the file being uploaded.
 * @param {function(Error, string):void} cb - Callback function to be invoked once the destination is determined.
 */
const destination = (req, file, cb) => {
    // Define a mapping between URL keywords and their corresponding directories
    const urlToDestinationMap = {
        'download': 'download',
        'notice': 'notice',
        'result': 'result',
        'routine': 'routine'
    };

    const requestedURL = req?.originalUrl;
    const matchedDestination = Object.keys(urlToDestinationMap)
        .find(keyword => requestedURL?.includes(keyword));

    const finalDestination = matchedDestination
        ? path.join('./uploads', urlToDestinationMap[matchedDestination])
        : './uploads';

    // Ensure the destination directory exists, or create it if it doesn't
    if (!fs.existsSync(finalDestination)) {
        fs.mkdirSync(finalDestination, { recursive: true });
    }

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
const storage = multer.diskStorage({
    destination,
    filename
});

/**
 * A Multer instance configured with the disk storage settings.
 * It can be used as middleware in Express routes for handling file uploads.
 *
 * @type {multer.Multer}
 */
const upload = multer({ storage });

export default upload;
