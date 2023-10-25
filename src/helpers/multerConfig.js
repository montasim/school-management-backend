import multer from 'multer';
import path from 'path';
/**
 * Determines the destination of uploaded files.
 * The callback 'cb' is used to pass information back.
 * @function
 * @param {Express.Request} req - The express request object.
 * @param {Express.Multer.File} file - The multer file object.
 * @param {Function} cb - The callback to determine the destination.
 */
const destination = (req, file, cb) => {
    // Save the files in the './uploads' directory.
    // Ensure the 'uploads/' directory exists beforehand.
    cb(null, './uploads');
}

/**
 * Determines the filename of uploaded files.
 * The callback 'cb' is used to pass information back.
 * @function
 * @param {Express.Request} req - The express request object.
 * @param {Express.Multer.File} file - The multer file object.
 * @param {Function} cb - The callback to determine the filename.
 */
const filename = (req, file, cb) => {
    // Use Date.now() for uniqueness and retain the file's original extension.
    cb(null, Date.now() + path.extname(file?.originalname));
}

// Configuration for multer disk storage.
const storage = multer.diskStorage({
    destination,
    filename
});

/**
 * Initializes multer with the defined storage configuration.
 * This 'upload' can be used as middleware in routes to handle file uploads.
 */
const upload = multer({ storage });

export default upload;
