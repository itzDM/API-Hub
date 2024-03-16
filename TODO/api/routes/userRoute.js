import express from "express";
import { createUser, getAllUser, loginUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", verifyToken, getAllUser);

export default router;