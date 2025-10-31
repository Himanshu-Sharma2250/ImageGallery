import mongoose, {Schema} from "mongoose";

const albumSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    images: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image' 
    }]
}, {timestamps: true});

export const Album = mongoose.model("Album", albumSchema);