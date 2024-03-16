import express from "express";
import { createExercise, deleteById } from "../controller/exerciseController.js";

const router = express.Router();


router.post("/", createExercise);
router.delete("/:id", deleteById);





export default router;