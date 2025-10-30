import { Album } from "../models/album.model";

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
// 3. store the images in the album