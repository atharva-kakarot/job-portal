import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage if you want to save files
export const singleUpload = multer({ storage }).single("file");
