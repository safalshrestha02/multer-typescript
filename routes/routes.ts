import { Router } from "express";
import uploadFiles from "../controller/fileUpload";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/upload", upload.array("files"), uploadFiles());

export default router;
