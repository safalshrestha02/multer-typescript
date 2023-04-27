import { Router } from "express";
import { getAllForms } from "../controller/fileUpload";
import { uploadFile } from "../controller/fileUpload";
import upload from "../middleware/upload";

const router = Router();

router.get("/getAllForms", getAllForms);
router.post("/upload", upload, uploadFile);

export default router;
