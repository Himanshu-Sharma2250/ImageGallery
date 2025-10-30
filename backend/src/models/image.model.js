import mongoose, {Schema} from "mongoose";

const imageSchema = new Schema({
    name: {
        type: String
    }
}, {timestamps: true});

export const Image = mongoose.model("Image", imageSchema);