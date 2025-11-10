import express from "express";
import { addImagesInAlbum, createAlbum, deleteAlbum, getAlbum, getAllAlbums, removeImageFromAlbum } from "../controllers/album.controller.js";

const albumRouter = express.Router();

albumRouter.post("/create-album", createAlbum);
albumRouter.get("/get-album/:album_id", getAlbum);
albumRouter.get("/all-albums", getAllAlbums);
albumRouter.patch("/:album_id/add-images", addImagesInAlbum);
albumRouter.patch("/:album_id/remove-image/:imageId", removeImageFromAlbum);
albumRouter.delete("/:album_id", deleteAlbum);

export default albumRouter;