import express from "express";
import { allMovie, createMovie, deleteMovie, findMovie, randomMovie, updateMovie } from "../Controller/movieController.js";
import verifyToken from "../Middleware/verifyToken.js";


const router = express.Router();

router.route("/create").post(verifyToken, createMovie);
router.route("/:id").put(verifyToken, updateMovie);
router.route("/:id").delete(verifyToken, deleteMovie);
router.route("/find/:id").get(verifyToken, findMovie);
router.route("/").get(verifyToken, allMovie);
router.route("/random").get(verifyToken, randomMovie);



export default router;