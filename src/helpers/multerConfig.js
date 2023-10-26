import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Determines the appropriate storage destination for uploaded files.
 * It maps specific keywords in the requested URL to corresponding directories.
 *
 * @function
 * @param {Express.Request} req - The express request object.
 * @param {Express.Multer.File} file - The multer file object.
 * @param {Function} cb - Callback to be invoked with the final storage destination.
 */
const destination = (req, file, cb) => {
    // Map of keywords in URL to corresponding directories
    const urlToDestinationMap = {
        'download': 'download',
        'notice': 'notice',
        'result': 'result',
        'routine': 'routine'
    };

    const requestedURL = req?.originalUrl;
    let matchedDestination = Object.keys(urlToDestinationMap)
        .find(keyword => requestedURL?.includes(keyword));

    let finalDestination = matchedDestination
        ? path.join('./uploads', urlToDestinationMap[matchedDestination])
        : './uploads';

    // Ensure directory exists or create one if it doesn't
    if (!fs.existsSync(finalDestination)) {
        fs.mkdirSync(finalDestination, { recursive: true });
    }

    cb(null, finalDestination);
}

/**
 * Determines the filename for uploaded files.
 * It uses the current timestamp for uniqueness and appends the file's original extension.
 *
 * @function
 * @param {Express.Request} req - The express request object.
 * @param {Express.Multer.File} file - The multer file object.
 * @param {Function} cb - Callback to be invoked with the final filename.
 */
const filename = (req, file, cb) => {
    cb(null, Date.now() + path.extname(file?.originalname));
}

/**
 * Configuration object for multer's disk storage.
 * Specifies the destination directory and filename for uploaded files.
 *
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({
    destination,
    filename
});

/**
 * Multer instance initialized with the disk storage configuration.
 * This can be used as middleware in Express routes to handle file uploads.
 *
 * @type {multer.Multer}
 */
const upload = multer({ storage });

export default upload;
