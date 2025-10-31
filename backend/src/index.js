import express from "express";
import dotenv from "dotenv";

import connect_db from "./utils/db.js";
import imageRouter from "./routes/image.route.js";
import albumRouter from "./routes/album.route.js";

dotenv.config();

const app = express()
const port = process.env.PORT | 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connect_db();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

app.use("/api/v1/image/", imageRouter);
app.use("/api/v1/album", albumRouter);