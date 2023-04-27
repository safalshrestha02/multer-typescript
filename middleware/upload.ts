import multer from "multer";
import path from "path";
import fs from "fs";

const allowedExt = [".png", ".jpeg"];

let dir = path.join(__dirname + "/../../", "UploadedFiles");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb): void => {
    return cb(null, __dirname + "/../../UploadedFiles");
  },

  filename: (req, file, cb): void => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: (req, file, cb): void =>
    cb(null, allowedExt.includes(path.extname(file.originalname))),
}).single("file");

export = upload;
