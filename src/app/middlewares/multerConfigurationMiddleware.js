import multer from 'multer';

/**
 * A configuration for multer's memory storage, which stores files in memory as Buffer objects.
 * This configuration does not use diskStorage, hence files are not saved to disk but held temporarily in memory.
 *
 * @type {multer.memoryStorage}
 */
const storage = multer.memoryStorage();

/**
 * A Multer instance configured to use memory storage.
 * This can be used as middleware in Express routes to handle file uploads,
 * storing files in memory. It's ideal for small file uploads where files
 * are immediately processed and not stored on the server.
 *
 * @type {multer.Multer}
 */
const upload = multer({ storage });

export default upload;
