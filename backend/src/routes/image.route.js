import express from "express";
import { deleteImage, getAllImages, getImage, uploadImage } from "../controllers/image.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

const imageRouter = express.Router();

imageRouter.post("/upload", auth, upload.single('image'), uploadImage);
imageRouter.get("/:imageId", auth, getImage);
imageRouter.get("/get-image/all-images", auth, getAllImages);
imageRouter.delete("/:imageId", auth, deleteImage);

export default imageRouter;