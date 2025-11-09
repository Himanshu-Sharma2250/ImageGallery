import express from "express";
import { deleteImage, getAllImages, getImage, uploadImage } from "../controllers/image.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const imageRouter = express.Router();

imageRouter.post("/upload", upload.single('image'), uploadImage);
imageRouter.get("/:imageId", getImage);
imageRouter.get("/get-image/all-images", getAllImages);
imageRouter.delete("/:imageId", deleteImage);

export default imageRouter;