import express from "express";
import { createAlbum, getAlbum, getAllAlbums } from "../controllers/album.controller";

const albumRouter = express.Router();

albumRouter.post("/create-album", createAlbum);
albumRouter.get("/:id", getAlbum);
albumRouter.get("/all-albums", getAllAlbums);
albumRouter.patch("/:id/add-images", getAlbum);

export default albumRouter;