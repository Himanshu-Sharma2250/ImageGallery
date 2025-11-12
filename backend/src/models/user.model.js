import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, {timestamps:true});

userSchema.pre("save", async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

export const User = mongoose.model("User", userSchema);