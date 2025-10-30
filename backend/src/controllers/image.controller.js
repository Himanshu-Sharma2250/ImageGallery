import { Image } from "../models/image.model";
import { uploadOnCloudinary } from "../utils/cloudinary";

// 1. upload the image 
export const uploadImage = async (req, res) => {
    // the image is stored in req.file
    if (!req.file) {
        return res.status(404).json({
            message: "image not found"
        })
    }
    console.log("The file in req is : ", req.file);

    try {
        const imageDetail = await uploadOnCloudinary(req.file.path);

        if (!imageDetail) {
            return res.status(400).json({
                success: false,
                message: "Error in uploading the image in cloudinary"
            })
        }

        const image = await Image.findById({
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

        const existingImage = await Image.findById({
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