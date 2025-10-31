import mongoose from "mongoose";
import { Album } from "../models/album.model";
import { Image } from "../models/image.model";

// 1. create the album
export const createAlbum = async (req, res) => {
    const {name, description} = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        })
    }

    try {
        const isAlbumExists = await Album.findOne({
            name:name
        });

        if (isAlbumExists) {
            return res.status(400).json({
                success: false,
                message: "Album exists"
            })
        }

        const album = await Album.create({
            name:name,
            description:description,
        })

        await album.save();

        const existingAlbum = await Album.findOne({
            name:name
        });

        if (!existingAlbum) {
            return res.status(400).json({
                success: false,
                message: "Album doesnot exists"
            })
        }

        res.status(201).json({
            success: true,
            message: "Album created successfully",
            album_data: existingAlbum
        })
    } catch (error) {
        console.error("Error creating album: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating album"
        })
    }
};

// 2. get the album
export const getAlbum = async (req, res) => {
    const {album_id} = req.params;

    if (!album_id) {
        return res.status(400).json({
            message: "Id not found"
        })
    }

    try {
        const album = await Album.findById(album_id).populate("images");

        if (!album) {
            return res.status(400).json({
                success: false,
                message: "Album not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Album get",
            album_data: album
        })
    } catch (error) {
        console.error("Error getting album: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting album"
        })
    }
};

// 3. store the images in the album
export const addImagesInAlbum = async (req, res) => {
    const {albumId} = req.params;
    const {imageIds} = req.body;

    if (!imageIds | !albumId) {
        return res.status(400).json({
            message: "ImageId or AlbumId not found"
        })
    }

    try {
        const ids = imageIds.map(id => mongoose.Types.ObjectId(id)); // convert string in object
        console.log("The ids in body: ", ids);

        const isImagesExist = await Image.find({
            _id: {$in: ids}
        }).select('_id');

        if (isImagesExist.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Images doesnot exist"
            })
        }

        const isAlbumExists = await Album.findById(albumId);

        if (!isAlbumExists) {
            return res.status(400).json({
                success: false,
                message: "Album doesnot exist"
            })
        }

        const addingImages = await Album.findByIdAndUpdate(albumId, {
            $addToSet: {
                images: {
                    $each: ids
                }
            }
        }, {new: true})

        if (addingImages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Insertion of Images failed"
            })
        }

        res.status(200).json({
            success: true,
            message: "Addition of Images in Album completed",
            album_data: addingImages
        })
    } catch (error) {
        console.error("Error adding images album: ", error);
        res.status(500).json({
            success: false,
            message: "Error adding images in album"
        })
    }
}; 