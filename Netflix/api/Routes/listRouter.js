import express from "express";
import { allList, createList, deleteList, findByQuery } from "../Controller/listController.js";
import verifyToken from "../Middleware/verifyToken.js";

const router = express.Router();

router.route("/create").post(verifyToken, createList);
router.route("/:id").delete(verifyToken, deleteList);
router.route("/find").get(verifyToken, allList);
router.route("/").get(verifyToken, findByQuery);





export default router;