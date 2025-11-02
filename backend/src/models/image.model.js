import mongoose, {Schema} from "mongoose";

const imageSchema = new Schema({
    userId: {
        type: Number,
        default: 1,
        unique: true
    },
    name: {
        type: String
    },
    cloudinary_public_id: {
        type: String,
        required: true,
        unique: true
    },
    image_url: {
        type: String,
        required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    format: {
        type: String,
        required: true
    },
    album_id: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        unique: true
    }
}, {timestamps: true});

export const Image = mongoose.model("Image", imageSchema);