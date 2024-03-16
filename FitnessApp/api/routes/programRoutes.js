import express from "express";
import { createProgram, deleteProgramById, getAllPrograms, getProgramById, updateProgramById } from "../controller/programController.js";

const router = express.Router();


router.post("/", createProgram);
router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.put("/:id", updateProgramById);
router.delete("/:id", deleteProgramById);



export default router;