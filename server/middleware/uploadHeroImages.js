const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/heros",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `hero-${Date.now()}-${Math.random()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

module.exports = upload;
