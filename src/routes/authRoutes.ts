import express from "express";
import { login, register } from "../controllers/authController";


const router = express.Router();

// register new user
router.post("/register", register);

// login user
router.post("/login", login);

export default router;
