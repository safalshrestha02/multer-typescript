import multer from "multer";
import path from "path";

const allowedExt = [".png", ".jpeg"];

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    return cb(null, "./UploadedFiles");
  },

  filename: (req, file, cb): void => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: (req, file, cb) =>
    cb(null, allowedExt.includes(path.extname(file.originalname))),
});
