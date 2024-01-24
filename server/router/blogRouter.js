import { Router } from "express";
import { publishBlog } from "../controller/blogController.js";

const router = Router();
router.post("/publish", publishBlog);

export default router;
