import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_db = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Database connection established");
        })
        .catch(() => {
            console.error("Database connection establishment failed");
            process.exit(1);
        })
}

export default connect_db;