import express from "express";

import { loginUser, logoutUser, profile, registerUser } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", auth, profile);
authRouter.get("/logout", auth, logoutUser);

export default authRouter;