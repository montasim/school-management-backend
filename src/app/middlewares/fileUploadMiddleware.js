/**
 * @fileoverview Middleware for handling file uploads in memory.
 *
 * This module sets up multer, a Node.js middleware for handling `multipart/form-data`,
 * which is primarily used for uploading files. It is configured to use memory storage,
 * meaning files are stored in memory as Buffer objects. This setup is ideal for handling
 * small file uploads where immediate processing is required and files do not need to be
 * stored on the server's disk. The multer instance is exported and can be readily used
 * in Express routes to handle file uploads.
 *
 * Note: Since this configuration does not persist files and does not include a file size
 * limit, it should be used cautiously, especially for handling large file uploads.
 *
 * @requires multer - Middleware for handling `multipart/form-data`.
 * @module fileUploadMiddleware - Configured multer instance for handling file uploads in memory.
 */

import multer from 'multer';

/**
 * Configures multer's memory storage.
 * This setup stores files in memory as Buffer objects instead of saving them to disk.
 * It is suitable for situations where files are temporarily held in memory for immediate processing.
 * Note: Files are not persisted on the server, making this configuration ideal for small file uploads.
 *
 * @type {multer.StorageEngine} - The multer memory storage configuration.
 */
const storage = multer.memoryStorage();

/**
 * Creates a multer instance configured to use memory storage.
 * This middleware can be integrated into Express routes to handle file uploads.
 * The current setup does not include a file size limit, so it should be used cautiously for large file uploads.
 *
 * @type {multer.Multer} - The multer instance for handling file uploads.
 */
const fileUploadMiddleware = multer({
    storage: storage,
});

export default fileUploadMiddleware;