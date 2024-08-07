import fs from 'fs';
import multer from 'multer';
import path from 'path';

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.body.user_id ? req.body.user_id : 'unknown_user';
    const userUploadsDirectory = path.join('uploads', userId);

    ensureDirectoryExists(userUploadsDirectory);

    cb(null, userUploadsDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });
