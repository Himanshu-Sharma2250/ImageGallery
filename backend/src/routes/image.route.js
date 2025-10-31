import express from "express";
import { getImage, uploadImage } from "../controllers/image.controller";

const imageRouter = express.Router();

imageRouter.post("/upload", uploadImage);
imageRouter.get("/:id", getImage);

export default imageRouter;