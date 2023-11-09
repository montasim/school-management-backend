import multer from 'multer';

/**
 * A configuration for multer's memory storage, which stores files in memory as Buffer objects.
 * This configuration does not use diskStorage, hence files are not saved to disk but are held temporarily in memory.
 * A maximum file size limit is set to 25MB.
 *
 * @type {multer.memoryStorage}
 */
const storage = multer.memoryStorage();

/**
 * A Multer instance configured to use memory storage with a file size limit.
 * This can be used as middleware in Express routes to handle file uploads,
 * storing files in memory. It's ideal for small file uploads where files
 * are immediately processed and not stored on the server. The maximum file
 * size allowed is 25MB.
 *
 * @type {multer.Multer}
 */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB in bytes
    },
});

export default upload;