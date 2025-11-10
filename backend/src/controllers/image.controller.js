import { Image } from "../models/image.model.js";
import { Album } from "../models/album.model.js";
import { deleteImageFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

// 1. upload the image 
export const uploadImage = async (req, res) => {
    // the image is stored in req.file
    console.log("The file in req is : ", req.file);
    if (!req.file) {
        return res.status(404).json({
            message: "image not found"
        })
    }

    try {
        const imageDetail = await uploadOnCloudinary(req.file.path);

        if (!imageDetail) {
            return res.status(400).json({
                success: false,
                message: "Error in uploading the image in cloudinary"
            })
        }

        const image = await Image.findOne({
            cloudinary_public_id: imageDetail.public_id
        })

        if (image) {
            return res.status(400).json({
                success: false,
                message: "The image is already uploaded"
            })
        }

        const new_image = await Image.create({
            name: req.file.originalname,
            cloudinary_public_id: imageDetail.public_id,
            image_url: imageDetail.secure_url,
            width: imageDetail.width,
            height: imageDetail.height,
            format: imageDetail.format
        });

        await new_image.save();

        const existingImage = await Image.findOne({
            cloudinary_public_id: imageDetail.public_id
        });

        if (!existingImage) {
            return res.status(400).json({
                success: false,
                message: "Image not uploaded"
            })
        }

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            imageData: {
                imageId: new_image._id,
                name: req.file.originalname,
                url: imageDetail.secure_url,
                width: imageDetail.width,
                height: imageDetail.height,
                format: imageDetail.format,
                createdAt: new_image.createdAt
            }
        })
    } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).json({
            success: false,
            message: "Error uploading image"
        })
    }
};

// 2. get the image to show the user
export const getImage = async (req, res) => {
    try {
        const {imageId} = req.params;

        if (!imageId) {
            return res.status(400).json({
                message: "image id not found"
            })
        }

        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Image found",
            imageData: {
                imageId: image._id,
                name: image.name,
                url: image.image_url,
                width: image.width,
                height: image.height,
                format: image.format,
                album_id: image.album_id,
                createdAt: image.createdAt
            }
        });
    } catch (error) {
        console.error("Error getting image: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting image"
        })
    }
};

export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find({
            userId: 1
        });

        if (images.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Images not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "All Images: ",
            images
        })
    } catch (error) {
        console.error("Error getting all images: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting all images"
        })
    }
};

export const deleteImage = async (req, res) => {
    const {imageId} = req.params;

    console.log("image id in delete image : ", imageId)

    if (!imageId) {
        return res.status(400).json({
            message: "Image id not found"
        })
    }

    try {
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }

        if (image.album_id !== 0) {
            await Album.updateOne(
                {_id: image.album_id},
                {$pull: {
                    images: imageId
                }}
            )
        }

        const deleteFromCloudinary = await deleteImageFromCloudinary(image.cloudinary_public_id);

        if (!deleteFromCloudinary) {
            console.error("Image not deleted from cloudinary");
            return;
        }

        const deletedImage = await Image.findByIdAndDelete(imageId);

        if (!deletedImage) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting image: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting image"
        })
    }
};