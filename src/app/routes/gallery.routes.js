import express from "express";
import photoGalleryRoutes from "../modules/gallery/videoGallery/videoGallery.routes.js";
import videoGalleryRoutes from "../modules/gallery/videoGallery/videoGallery.routes.js";

const router = express.Router();

router.use("/photo", photoGalleryRoutes);
router.use("/video", videoGalleryRoutes);

export default router;