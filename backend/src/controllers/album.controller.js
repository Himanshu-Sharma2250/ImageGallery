import mongoose from "mongoose";
import { Album } from "../models/album.model.js";
import { Image } from "../models/image.model.js";

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
            userId: req.user.id,
            name: name
        });

        if (isAlbumExists) {
            return res.status(400).json({
                success: false,
                message: "Album exists"
            })
        }

        const album = await Album.create({
            userId: req.user.id,
            name: name,
            description: description,
        })

        await album.save();

        const existingAlbum = await Album.findOne({
            userId: req.user.id,
            name: name
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

    if (!album_id || !mongoose.Types.ObjectId.isValid(album_id)) {
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

export const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find({
            userId: req.user.id,
        });

        if (albums.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Albums not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "All Albums: ",
            albums
        })
    } catch (error) {
        console.error("Error getting albums: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting Albums"
        })
    }
};

// 4. store the images in the album
export const addImagesInAlbum = async (req, res) => {
    const {album_id} = req.params;
    const {imageIds} = req.body;

    console.log("image id in controller body : ", imageIds)

    if (!Array.isArray(imageIds)) {
        return res.status(400).json({ error: "imageIds must be an array" });
    }

    if (imageIds.length === 0 | !album_id) {
        return res.status(400).json({
            message: "ImageId or AlbumId not found"
        })
    }

    try {
        const ids = imageIds.map(id => new mongoose.Types.ObjectId(id)); // convert string in object
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

        const isAlbumExists = await Album.findById(album_id);

        if (!isAlbumExists) {
            return res.status(400).json({
                success: false,
                message: "Album doesnot exist"
            })
        }

        const addingImages = await Album.findByIdAndUpdate(album_id, {
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

        await Image.updateMany(
            {_id: {
                $in: ids
            }},
            {$set: {
                album_id: album_id
            }}
        )

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

export const removeImageFromAlbum = async (req, res) => {
    const {album_id, imageId} = req.params;

    if (!album_id || !imageId) {
        return res.status(400).json({
            message: "album_id or imageId is not present"
        })
    }

    try {
        const album = await Album.findById(album_id);

        if (!album) {
            return res.status(404).json({
                success: false,
                message: "Album not found"
            })
        }

        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }

        await Album.findByIdAndUpdate(album_id, {
            $pull: {
                images: imageId
            }
        })

        res.status(200).json({
            success: true,
            message: "Image removed successfully",
            album_data: album
        })
    } catch (error) {
        console.error("Error removing image from album: ", error);
        res.status(500).json({
            success: false,
            message: "Error removing image from album"
        })
    }
}

export const deleteAlbum = async (req, res) => {
    const {album_id} = req.params;

    if (!album_id) {
        return res.status(400).json({
            message: "Album Id not present"
        })
    }

    try {
        const deletedAlbum = await Album.findByIdAndDelete(album_id);

        if (!deleteAlbum) {
            return res.status(404).json({
                success: false,
                message: "album not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Album deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting album: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting album"
        })
    }
};