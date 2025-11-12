import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connect_db from "./utils/db.js";
import imageRouter from "./routes/image.route.js";
import albumRouter from "./routes/album.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL,
    methods: [`GET`, `PUT`, `POST`, `PATCH`, `DELETE`],
    credentials: true
}));
app.use(express.urlencoded({ extended:true }));


const port = process.env.PORT | 4000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connect_db();

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/image/", imageRouter);
app.use("/api/v1/album", albumRouter);