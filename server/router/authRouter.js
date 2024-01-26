import { Router } from "express";
import { auth, getUser } from "../controller/authController.js";

const router = Router();
router.post("/auth", auth);
router.get("/getuser/:userId", getUser);

export default router;
