import express from "express";
import { getImage, uploadImage } from "../controllers/image.controller";
import { upload } from "../middlewares/multer.middleware";

const imageRouter = express.Router();

imageRouter.post("/upload", upload, uploadImage);
imageRouter.get("/:id", getImage);

export default imageRouter;