import express from "express";
import { deleteImage, getAllImages, getImage, uploadImage } from "../controllers/image.controller";
import { upload } from "../middlewares/multer.middleware";

const imageRouter = express.Router();

imageRouter.post("/upload", upload, uploadImage);
imageRouter.get("/:id", getImage);
imageRouter.get("/all-images", getAllImages);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;