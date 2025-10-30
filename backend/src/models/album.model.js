import mongoose, {Schema} from "mongoose";

const albumSchema = new Schema({
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