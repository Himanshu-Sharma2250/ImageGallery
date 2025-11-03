import express from "express";
import { deleteImage, getAllImages, getImage, uploadImage } from "../controllers/image.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const imageRouter = express.Router();

imageRouter.post("/upload", upload.single('image'), uploadImage);
imageRouter.get("/:id", getImage);
imageRouter.get("/all-images", getAllImages);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;