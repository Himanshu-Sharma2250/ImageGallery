import express from "express";
import { addImagesInAlbum, createAlbum, deleteAlbum, getAlbum, getAllAlbums, removeImageFromAlbum } from "../controllers/album.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const albumRouter = express.Router();

albumRouter.post("/create-album", auth, createAlbum);
albumRouter.get("/get-album/:album_id", auth, getAlbum);
albumRouter.get("/all-albums", auth, getAllAlbums);
albumRouter.patch("/:album_id/add-images", auth, addImagesInAlbum);
albumRouter.patch("/:album_id/remove-image/:imageId", auth, removeImageFromAlbum);
albumRouter.delete("/:album_id", auth, deleteAlbum);

export default albumRouter;