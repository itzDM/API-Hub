import express from "express";
import { createNewBook, deleteBookById, getAllBook, getBookById, updateBookById } from "../controller/bookController.js";

const router = express.Router();

router.post("/", createNewBook);
router.get("/", getAllBook);
router.get("/:id", getBookById);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);


export default router;