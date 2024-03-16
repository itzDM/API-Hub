import express from "express";
import { createTask, deleteTask, getAllTask, getTaskById, getUserTask, updateTask } from "../controller/todoController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/tasks", verifyToken, getAllTask);
router.get("/task/:id", verifyToken, getTaskById);
router.put("/task/:id", verifyToken, updateTask);
router.delete("/task/:id", verifyToken, deleteTask);
router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getUserTask);

export default router;