import express from "express";
import { createAlbum, deleteAlbum, getAlbum, getAllAlbums } from "../controllers/album.controller.js";

const albumRouter = express.Router();

albumRouter.post("/create-album", createAlbum);
albumRouter.get("/get-album/:album_id", getAlbum);
albumRouter.get("/all-albums", getAllAlbums);
albumRouter.patch("/:album_id/add-images", getAlbum);
albumRouter.delete("/:album_id", deleteAlbum);

export default albumRouter;