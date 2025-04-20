import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    // Custom file validation logic
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("Only JPEG and PNG files are allowed"));
    }
    cb(null, true);
  },
}).array("files", 5); // Adjust the array method here

export default upload;
