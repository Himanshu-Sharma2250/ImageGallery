import express from "express";
import { createAlbum, deleteAlbum, getAlbum, getAllAlbums } from "../controllers/album.controller.js";

const albumRouter = express.Router();

albumRouter.post("/create-album", createAlbum);
albumRouter.get("/get-album/:id", getAlbum);
albumRouter.get("/all-albums", getAllAlbums);
albumRouter.patch("/:id/add-images", getAlbum);
albumRouter.delete("/:id", deleteAlbum);

export default albumRouter;