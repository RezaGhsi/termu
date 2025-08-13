const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/musics");
  },

  filename: (req, file, cb) => {
    const fileName = Date.now() + Math.floor(Math.random() * 10);
    const ext = path.extname(file.originalname);
    cb(null, `${fileName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const validFormats = [".mp3", ".wav"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (validFormats.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("File Format is Not Valid!"));
  }
};

const maxSize = 20 * 1024 * 1024;

const uploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = uploader;
