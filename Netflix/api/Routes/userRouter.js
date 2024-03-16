import express from "express";
import { deleteUser, findAllUser, findUser, totalUser, updateUser } from "../Controller/userController.js";
import verifyToken from "../Middleware/verifyToken.js";

const router = express.Router();


router.route("/:id").put(verifyToken, updateUser);
router.route("/:id").delete(verifyToken, deleteUser);
router.route("/find/:id").get(findUser);
router.route("/stats").get(verifyToken, totalUser);
router.route("/find").get(verifyToken, findAllUser);


export default router;