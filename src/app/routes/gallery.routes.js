/**
 * @fileoverview Gallery Routes Module.
 *
 * This module configures the routing for gallery-related features within an Express application. It incorporates routing for both photo and video
 * galleries, organizing these under distinct base paths for clarity and ease of access. The module imports route handlers from separate modules
 * for photo and video galleries and maps them to their respective paths. This setup facilitates a clear and manageable structure for handling
 * gallery-related requests in the application.
 *
 * @module galleryRoutes
 */

import express from "express";
import photoGalleryRoutes from "../modules/gallery/videoGallery/videoGallery.routes.js";
import videoGalleryRoutes from "../modules/gallery/videoGallery/videoGallery.routes.js";

const router = express.Router();

/**
 * Routes for the Photo Gallery.
 * All requests on the '/photo' path are forwarded to the photoGalleryRoutes module,
 * which contains specific endpoints and logic for handling photo gallery related operations.
 */
router.use("/photo", photoGalleryRoutes);

/**
 * Routes for the Video Gallery.
 * All requests on the '/video' path are forwarded to the videoGalleryRoutes module,
 * which contains specific endpoints and logic for handling video gallery related operations.
 */
router.use("/video", videoGalleryRoutes);
export default router;