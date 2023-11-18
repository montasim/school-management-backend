import express from "express";
import admissionFormRoutes from "../modules/admission/admissionForm/admissionForm.routes.js";

const router = express.Router();

// router.use("/information", admissionInformationRoutes);
router.use("/form", admissionFormRoutes);

export default router;