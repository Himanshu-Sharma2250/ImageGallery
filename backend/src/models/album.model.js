import mongoose, {Schema} from "mongoose";

const albumSchema = new Schema({
    imageId: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
}, {timestamps: true});

export const Album = mongoose.model("Album", albumSchema);